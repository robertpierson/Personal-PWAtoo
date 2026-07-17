-- Owner lock: single-user app. Block every new auth signup (password or
-- OAuth) except the owner's email. Existing sessions are already screened
-- by middleware and the OAuth callback.
create or replace function public.owner_only_signup()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(new.email) is distinct from 'robertpierson196@gmail.com' then
    raise exception 'signups_disabled';
  end if;
  return new;
end;
$$;

drop trigger if exists owner_only_signup on auth.users;
create trigger owner_only_signup
  before insert on auth.users
  for each row execute function public.owner_only_signup();
