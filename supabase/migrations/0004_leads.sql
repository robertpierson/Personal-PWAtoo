-- Contact-form leads. Public (anon) may insert from the marketing site;
-- nobody reads through the API (studio reviews leads in the Supabase
-- dashboard). Deny-by-default: only the insert policy is granted.

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  org text not null,
  org_type text,
  website text,
  pains text[] not null default '{}',
  email text not null,
  note text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone submitting the contact form may create a lead. No select /
-- update / delete policy exists, so reads are denied to anon and
-- authenticated alike.
create policy leads_public_insert on public.leads
  for insert
  to anon, authenticated
  with check (true);
