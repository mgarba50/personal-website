-- Revenue activation migration
-- Safe to run on an existing Supabase project.

insert into storage.buckets (id, name, public)
values ('payment-receipts', 'payment-receipts', false)
on conflict (id) do update set public = false;

-- Existing installations already have proof_url; this is defensive.
alter table if exists manual_payment_proofs
  add column if not exists proof_url text;

create index if not exists manual_payment_order_number_idx
  on manual_payment_proofs(order_number);

create index if not exists manual_payment_status_idx
  on manual_payment_proofs(status);
