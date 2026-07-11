-- Tighten helper-function exposure: RLS policies need EXECUTE for
-- authenticated users only. anon and PUBLIC get nothing.
revoke execute on function public.current_org_id() from public;
revoke execute on function public.current_org_id() from anon;
revoke execute on function public.is_org_owner() from public;
revoke execute on function public.is_org_owner() from anon;
grant execute on function public.current_org_id() to authenticated;
grant execute on function public.is_org_owner() to authenticated;
