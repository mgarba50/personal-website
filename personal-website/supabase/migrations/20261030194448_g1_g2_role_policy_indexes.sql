-- Follow-up to the G1/G2 account and manual-delivery migration.
-- Keep role checks cached per statement and index the new foreign keys.
begin;
alter policy own_role on public.app_user_roles using ((select auth.uid()) = user_id);
create index if not exists commerce_orders_reviewer_idx on public.commerce_orders(reviewed_by);
create index if not exists commerce_audit_order_idx on public.commerce_audit_events(order_id,created_at desc);
create index if not exists commerce_audit_actor_idx on public.commerce_audit_events(actor_id,created_at desc);
create index if not exists commerce_delivery_order_idx on public.commerce_delivery_attempts(order_id,created_at desc);
create index if not exists download_tokens_commerce_order_idx on public.download_tokens(commerce_order_id);
commit;
