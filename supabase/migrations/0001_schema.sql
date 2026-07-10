-- Bandana schema — organizations, users, content, calendar, approvals,
-- invoices, insights. Applying to production requires approval.

create type public.user_role as enum ('owner', 'member');

create type public.content_kind as enum ('design', 'photo', 'video', 'document');

create type public.content_status as enum ('drafting', 'in_review', 'approved', 'delivered');

create type public.calendar_platform as enum ('instagram', 'facebook', 'website', 'email');

create type public.calendar_status as enum (
  'drafting',
  'awaiting_approval',
  'in_review',
  'approved',
  'scheduled',
  'shipped'
);

create type public.approval_decision as enum ('approved', 'changes_requested');

create type public.invoice_status as enum ('outstanding', 'paid', 'void');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  org_type text,
  logo_url text,
  created_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  org_id uuid references public.organizations (id) on delete set null,
  role public.user_role not null default 'owner',
  email text not null,
  full_name text,
  avatar_url text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.client_content (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  title text not null,
  kind public.content_kind not null default 'design',
  storage_path text,
  preview_url text,
  status public.content_status not null default 'drafting',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_calendar (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  content_id uuid references public.client_content (id) on delete set null,
  platform public.calendar_platform not null,
  caption text not null default '',
  scheduled_at timestamptz not null,
  status public.calendar_status not null default 'drafting',
  created_at timestamptz not null default now()
);

create table public.approvals_queue (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  calendar_id uuid not null references public.content_calendar (id) on delete cascade,
  requested_at timestamptz not null default now(),
  decided_at timestamptz,
  decision public.approval_decision,
  note text,
  decided_by uuid references public.users (id) on delete set null
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  number text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  status public.invoice_status not null default 'outstanding',
  issued_at timestamptz not null default now(),
  due_at timestamptz,
  paid_at timestamptz,
  unique (org_id, number)
);

create table public.insights (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  metric_date date not null,
  followers integer not null default 0,
  reach integer not null default 0,
  engagement integer not null default 0,
  profile_views integer not null default 0,
  unique (org_id, metric_date)
);

create index users_org_idx on public.users (org_id);
create index client_content_org_idx on public.client_content (org_id);
create index content_calendar_org_idx on public.content_calendar (org_id);
create index content_calendar_sched_idx on public.content_calendar (org_id, scheduled_at);
create index approvals_queue_org_idx on public.approvals_queue (org_id);
create index approvals_queue_open_idx on public.approvals_queue (org_id) where decided_at is null;
create index invoices_org_idx on public.invoices (org_id);
create index insights_org_idx on public.insights (org_id, metric_date);
