-- Row-level security: deny by default, org-scoped via auth.uid() membership.
--   owner  — full read/write/delete on all org tables, own org only.
--   member — read-only content_calendar + insights; may read own org row
--            and own profile. Fully blocked from invoices, approvals,
--            client_content, and all writes to organizations/users.

-- Helpers run as security definer so policies on public.users don't recurse.
create function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id from public.users where id = auth.uid();
$$;

create function public.is_org_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'owner' and org_id is not null
  );
$$;

alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.client_content enable row level security;
alter table public.content_calendar enable row level security;
alter table public.approvals_queue enable row level security;
alter table public.invoices enable row level security;
alter table public.insights enable row level security;

-- organizations: any member reads their org; only owners write it.
create policy org_member_read on public.organizations
  for select using (id = public.current_org_id());

create policy org_owner_insert on public.organizations
  for insert with check (
    -- a signed-in user with no org yet may create one (onboarding)
    auth.uid() is not null and public.current_org_id() is null
  );

create policy org_owner_update on public.organizations
  for update using (id = public.current_org_id() and public.is_org_owner());

create policy org_owner_delete on public.organizations
  for delete using (id = public.current_org_id() and public.is_org_owner());

-- users: everyone reads/updates their own profile; owners read and
-- manage the whole org roster. Members cannot touch other rows.
create policy users_self_read on public.users
  for select using (id = auth.uid());

create policy users_self_insert on public.users
  for insert with check (id = auth.uid());

create policy users_self_update on public.users
  for update using (id = auth.uid());

create policy users_owner_read on public.users
  for select using (org_id = public.current_org_id() and public.is_org_owner());

create policy users_owner_update on public.users
  for update using (org_id = public.current_org_id() and public.is_org_owner());

create policy users_owner_delete on public.users
  for delete using (
    org_id = public.current_org_id()
    and public.is_org_owner()
    and id <> auth.uid()
  );

-- client_content: owners only.
create policy content_owner_all on public.client_content
  for all using (org_id = public.current_org_id() and public.is_org_owner())
  with check (org_id = public.current_org_id() and public.is_org_owner());

-- content_calendar: owners full; members read-only.
create policy calendar_owner_all on public.content_calendar
  for all using (org_id = public.current_org_id() and public.is_org_owner())
  with check (org_id = public.current_org_id() and public.is_org_owner());

create policy calendar_member_read on public.content_calendar
  for select using (org_id = public.current_org_id());

-- approvals_queue: owners only.
create policy approvals_owner_all on public.approvals_queue
  for all using (org_id = public.current_org_id() and public.is_org_owner())
  with check (org_id = public.current_org_id() and public.is_org_owner());

-- invoices: owners only — members have no access of any kind.
create policy invoices_owner_all on public.invoices
  for all using (org_id = public.current_org_id() and public.is_org_owner())
  with check (org_id = public.current_org_id() and public.is_org_owner());

-- insights: owners full; members read-only.
create policy insights_owner_all on public.insights
  for all using (org_id = public.current_org_id() and public.is_org_owner())
  with check (org_id = public.current_org_id() and public.is_org_owner());

create policy insights_member_read on public.insights
  for select using (org_id = public.current_org_id());
