-- Apply before live commerce verification. Server integrations use service_role.
alter table public.manual_payment_proofs enable row level security;
alter table public.download_tokens enable row level security;
revoke all on public.manual_payment_proofs from anon, authenticated;
revoke all on public.download_tokens from anon, authenticated;
grant all on public.manual_payment_proofs to service_role;
grant all on public.download_tokens to service_role;
