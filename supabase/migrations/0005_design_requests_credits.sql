-- Design requests: clients ask for build/design work from inside the
-- app; the studio delivers through client_content. Credits: each plan
-- grants monthly build credits spent on these requests.

alter table public.organizations
  add column credits integer not null default 0;

create type public.design_request_status as enum
  ('requested', 'in_progress', 'delivered', 'declined');

create table public.design_requests (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  requested_by uuid references public.users(id) on delete set null,
  title text not null,
  kind public.content_kind not null default 'design',
  brief text not null,
  status public.design_request_status not null default 'requested',
  created_at timestamptz not null default now()
);

create index design_requests_org_idx on public.design_requests (org_id, created_at desc);

alter table public.design_requests enable row level security;

-- Everyone in the org can see and file requests; only the studio
-- updates status (service role, no policy needed).
create policy design_requests_select on public.design_requests
  for select to authenticated
  using (org_id = public.current_org_id());

create policy design_requests_insert on public.design_requests
  for insert to authenticated
  with check (org_id = public.current_org_id());
