-- Additive migration: apply after the existing schema and secure-content migration.
begin;
create table if not exists public.app_user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','buyer','student','member','client')),
  created_at timestamptz not null default now()
);
alter table public.app_user_roles enable row level security;
revoke all on public.app_user_roles from anon, authenticated;
grant select on public.app_user_roles to authenticated;
grant all on public.app_user_roles to service_role;
drop policy if exists own_role on public.app_user_roles;
create policy own_role on public.app_user_roles for select to authenticated using (auth.uid() = user_id);

create table if not exists public.commerce_orders (
  id uuid primary key default gen_random_uuid(), order_number text not null unique,
  request_key uuid not null unique, payload_hash text not null, access_hash text not null,
  user_id uuid references auth.users(id) on delete set null,
  name text not null, email text not null, phone text not null,
  product_type text not null check (product_type in ('book','bundle')),
  product_slug text not null, product_title text not null,
  amount_minor bigint not null check (amount_minor > 0), currency text not null check (currency = 'NGN'),
  fulfilment_slugs text[] not null check (cardinality(fulfilment_slugs) between 1 and 10),
  status text not null default 'pending_payment' check (status in ('pending_payment','payment_submitted','payment_approved','rejected','cancelled')),
  delivery_status text not null default 'pending' check (delivery_status in ('pending','sent','failed')),
  created_at timestamptz not null default now(), reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id), review_note text, bank_reference text unique
);
create index if not exists commerce_orders_user_idx on public.commerce_orders(user_id,created_at desc);
create index if not exists commerce_orders_status_idx on public.commerce_orders(status,created_at desc);
alter table public.commerce_orders enable row level security;
revoke all on public.commerce_orders from anon, authenticated;
grant all on public.commerce_orders to service_role;
alter table public.manual_payment_proofs add column if not exists commerce_order_id uuid references public.commerce_orders(id);
create unique index if not exists manual_proof_commerce_order_idx on public.manual_payment_proofs(commerce_order_id) where commerce_order_id is not null;
alter table public.download_tokens add column if not exists commerce_order_id uuid references public.commerce_orders(id);

create table if not exists public.commerce_audit_events (
  id uuid primary key default gen_random_uuid(), order_id uuid references public.commerce_orders(id),
  actor_id uuid references auth.users(id), action text not null, created_at timestamptz not null default now()
);
create table if not exists public.commerce_delivery_attempts (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.commerce_orders(id),
  status text not null check (status in ('sent','failed')), created_at timestamptz not null default now()
);
create table if not exists public.commerce_rate_buckets (key text primary key, window_at timestamptz not null, count int not null);

-- The public website reads its public metadata from the publication registries.
-- Operational records and paid content are exposed only through guarded server handlers.
do $$ declare t text; begin
  foreach t in array array['users','products','courses','lessons','orders','memberships','articles','inquiries','bookings','certificates','course_enrollments','downloads','newsletter_subscribers','manual_payment_proofs','course_waitlist_submissions','lead_magnet_signups','conversion_events','download_tokens','commerce_audit_events','commerce_delivery_attempts','commerce_rate_buckets'] loop
    if to_regclass('public.'||t) is not null then
      execute format('alter table public.%I enable row level security',t);
      execute format('revoke all on public.%I from anon, authenticated',t);
      execute format('grant all on public.%I to service_role',t);
    end if;
  end loop;
end $$;

create or replace function public.commerce_rate_limit(p_key text,p_limit int) returns boolean language plpgsql set search_path=public,pg_temp as $$
declare n int; begin
  if p_limit < 1 or p_limit > 100 then raise exception 'ACCESS_DENIED'; end if;
  insert into commerce_rate_buckets(key,window_at,count) values(p_key,date_trunc('minute',now()),1)
  on conflict(key) do update set window_at=date_trunc('minute',now()),count=case when commerce_rate_buckets.window_at=date_trunc('minute',now()) then commerce_rate_buckets.count+1 else 1 end returning count into n;
  if n>p_limit then raise exception 'RATE_LIMITED'; end if;
  delete from commerce_rate_buckets where window_at < now()-interval '1 day';
  return true;
end $$;

create or replace function public.commerce_create_order(p_order jsonb) returns jsonb language plpgsql set search_path=public,pg_temp as $$
declare o commerce_orders; begin
  perform pg_advisory_xact_lock(hashtextextended(p_order->>'request_key',0));
  select * into o from commerce_orders where request_key=(p_order->>'request_key')::uuid for update;
  if found then
    if o.payload_hash <> p_order->>'payload_hash' then raise exception 'ORDER_CONFLICT'; end if;
    update commerce_orders set access_hash=p_order->>'access_hash' where id=o.id returning * into o;
    return to_jsonb(o);
  end if;
  insert into commerce_orders(order_number,request_key,payload_hash,access_hash,user_id,name,email,phone,product_type,product_slug,product_title,amount_minor,currency,fulfilment_slugs)
  values('MA-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,16)),(p_order->>'request_key')::uuid,p_order->>'payload_hash',p_order->>'access_hash',nullif(p_order->>'user_id','')::uuid,p_order->>'name',p_order->>'email',p_order->>'phone',p_order->>'product_type',p_order->>'product_slug',p_order->>'product_title',(p_order->>'amount_minor')::bigint,p_order->>'currency',array(select jsonb_array_elements_text(p_order->'fulfilment_slugs')))
  returning * into o;
  insert into commerce_audit_events(order_id,actor_id,action) values(o.id,o.user_id,'order_created');
  return to_jsonb(o);
end $$;

create or replace function public.commerce_submit_receipt(p_order_id uuid,p_receipt jsonb) returns jsonb language plpgsql set search_path=public,pg_temp as $$
declare o commerce_orders; begin
  select * into o from commerce_orders where id=p_order_id for update;
  if not found then raise exception 'ACCESS_DENIED'; end if;
  if o.status <> 'pending_payment' then raise exception 'ORDER_CLOSED'; end if;
  insert into manual_payment_proofs(commerce_order_id,order_number,name,email,phone,product_type,product_slug,product_title,amount_paid,transfer_reference,proof_url,receipt_file_name,receipt_file_type,notes,status)
  values(o.id,o.order_number,o.name,o.email,o.phone,o.product_type,o.product_slug,o.product_title,p_receipt->>'amount_paid',p_receipt->>'reference',p_receipt->>'path',p_receipt->>'filename',p_receipt->>'content_type',p_receipt->>'notes','payment_submitted');
  update commerce_orders set status='payment_submitted' where id=o.id returning * into o;
  insert into commerce_audit_events(order_id,actor_id,action) values(o.id,o.user_id,'receipt_submitted');
  return to_jsonb(o);
end $$;

create or replace function public.commerce_review_order(p_order_id uuid,p_actor_id uuid,p_decision text,p_note text,p_bank_reference text) returns jsonb language plpgsql set search_path=public,pg_temp as $$
declare o commerce_orders; begin
  if not exists(select 1 from app_user_roles where user_id=p_actor_id and role='admin') then raise exception 'ACCESS_DENIED'; end if;
  if p_decision not in ('approve','reject') or length(p_note)<3 or length(p_note)>1000 then raise exception 'ACCESS_DENIED'; end if;
  if p_decision='approve' and (p_bank_reference is null or length(p_bank_reference)<3 or length(p_bank_reference)>200) then raise exception 'ACCESS_DENIED'; end if;
  select * into o from commerce_orders where id=p_order_id for update;
  if not found then raise exception 'ACCESS_DENIED'; end if;
  if o.status <> 'payment_submitted' then raise exception 'ORDER_CLOSED'; end if;
  if not exists(select 1 from manual_payment_proofs where commerce_order_id=o.id and status='payment_submitted') then raise exception 'ACCESS_DENIED'; end if;
  begin
    update commerce_orders set status=case when p_decision='approve' then 'payment_approved' else 'rejected' end,reviewed_at=now(),reviewed_by=p_actor_id,review_note=p_note,bank_reference=case when p_decision='approve' then p_bank_reference else null end where id=o.id returning * into o;
  exception when unique_violation then raise exception 'PAYMENT_REFERENCE_USED'; end;
  update manual_payment_proofs set status=case when p_decision='approve' then 'payment_approved'::order_status else 'cancelled'::order_status end,admin_note=p_note,reviewed_at=now() where commerce_order_id=o.id;
  insert into commerce_audit_events(order_id,actor_id,action) values(o.id,p_actor_id,case when p_decision='approve' then 'payment_approved' else 'payment_rejected' end);
  return to_jsonb(o);
end $$;

create or replace function public.commerce_revoke_links(p_order_id uuid,p_actor_id uuid) returns boolean language plpgsql set search_path=public,pg_temp as $$
begin
  if not exists(select 1 from app_user_roles where user_id=p_actor_id and role='admin') then raise exception 'ACCESS_DENIED'; end if;
  update download_tokens set revoked_at=now() where commerce_order_id=p_order_id and revoked_at is null;
  insert into commerce_audit_events(order_id,actor_id,action) values(p_order_id,p_actor_id,'download_links_revoked');
  return true;
end $$;

create or replace function public.commerce_issue_links(p_order_id uuid,p_actor_id uuid,p_links jsonb) returns boolean language plpgsql set search_path=public,pg_temp as $$
declare o commerce_orders; l jsonb; begin
  select * into o from commerce_orders where id=p_order_id for update;
  if not found then raise exception 'ACCESS_DENIED'; end if;
  if not exists(select 1 from app_user_roles where user_id=p_actor_id and role='admin') and o.user_id is distinct from p_actor_id then raise exception 'ACCESS_DENIED'; end if;
  if o.status <> 'payment_approved' then raise exception 'PAYMENT_NOT_APPROVED'; end if;
  if jsonb_array_length(p_links) <> cardinality(o.fulfilment_slugs) or (select count(distinct x->>'slug') from jsonb_array_elements(p_links) x) <> cardinality(o.fulfilment_slugs) then raise exception 'ACCESS_DENIED'; end if;
  update download_tokens set revoked_at=now() where commerce_order_id=o.id and revoked_at is null;
  for l in select * from jsonb_array_elements(p_links) loop
    if not ((l->>'slug') = any(o.fulfilment_slugs)) or (l->>'token_hash') !~ '^[a-f0-9]{64}$' then raise exception 'ACCESS_DENIED'; end if;
    insert into download_tokens(commerce_order_id,token_hash,product_slug,customer_email,order_number,storage_path,expires_at,max_downloads,download_count)
    values(o.id,l->>'token_hash',l->>'slug',o.email,o.order_number,l->>'path',now()+interval '72 hours',3,0);
  end loop;
  insert into commerce_audit_events(order_id,actor_id,action) values(o.id,p_actor_id,'download_links_issued');
  return true;
end $$;

create or replace function public.commerce_claim_download(p_hash text,p_count int) returns boolean language plpgsql set search_path=public,pg_temp as $$
declare t download_tokens; begin
  select * into t from download_tokens where token_hash=p_hash for update;
  if not found or t.revoked_at is not null or t.expires_at<=now() or t.download_count<>p_count or t.download_count>=t.max_downloads then return false; end if;
  if t.commerce_order_id is not null then
    if not exists(select 1 from commerce_orders o where o.id=t.commerce_order_id and o.status='payment_approved' and o.email=t.customer_email and t.product_slug=any(o.fulfilment_slugs)) then return false; end if;
  else
    if not exists(select 1 from manual_payment_proofs p where p.order_number=t.order_number and lower(p.email)=lower(t.customer_email) and p.product_slug=t.product_slug and p.status='payment_approved') then return false; end if;
  end if;
  update download_tokens set download_count=download_count+1,last_downloaded_at=now() where id=t.id;
  return true;
end $$;

create or replace function public.commerce_record_delivery(p_order_id uuid,p_status text) returns boolean language plpgsql set search_path=public,pg_temp as $$
begin
  if p_status not in ('sent','failed') then raise exception 'ACCESS_DENIED'; end if;
  update commerce_orders set delivery_status=p_status where id=p_order_id and status='payment_approved';
  if not found then raise exception 'PAYMENT_NOT_APPROVED'; end if;
  insert into commerce_delivery_attempts(order_id,status) values(p_order_id,p_status);
  return true;
end $$;

-- Invoker rights; no anonymous or authenticated direct calls to privileged RPCs.
revoke execute on function public.commerce_rate_limit(text,int),public.commerce_create_order(jsonb),public.commerce_submit_receipt(uuid,jsonb),public.commerce_review_order(uuid,uuid,text,text,text),public.commerce_issue_links(uuid,uuid,jsonb),public.commerce_claim_download(text,int),public.commerce_record_delivery(uuid,text),public.commerce_revoke_links(uuid,uuid) from public,anon,authenticated;
grant execute on function public.commerce_rate_limit(text,int),public.commerce_create_order(jsonb),public.commerce_submit_receipt(uuid,jsonb),public.commerce_review_order(uuid,uuid,text,text,text),public.commerce_issue_links(uuid,uuid,jsonb),public.commerce_claim_download(text,int),public.commerce_record_delivery(uuid,text),public.commerce_revoke_links(uuid,uuid) to service_role;
update storage.buckets set public=false where id in ('payment-receipts','product-files','lead-magnets','source-vault');
commit;
