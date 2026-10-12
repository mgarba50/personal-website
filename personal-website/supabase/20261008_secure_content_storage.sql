-- MusaAllama.com secure-content storage correction
-- Run once in Supabase SQL Editor.

insert into storage.buckets (id, name, public)
values
  ('payment-receipts', 'payment-receipts', false),
  ('product-files', 'product-files', false),
  ('lead-magnets', 'lead-magnets', false),
  ('source-vault', 'source-vault', false)
on conflict (id) do update set public = false;

create table if not exists download_tokens (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  product_slug text not null,
  customer_email text not null,
  order_number text,
  storage_path text not null,
  expires_at timestamptz not null,
  max_downloads integer not null default 3 check (max_downloads > 0),
  download_count integer not null default 0 check (download_count >= 0),
  last_downloaded_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists download_tokens_token_hash_idx
  on download_tokens(token_hash);

create index if not exists download_tokens_order_number_idx
  on download_tokens(order_number);

-- Buckets remain private. Server routes and admin scripts use the service role.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
