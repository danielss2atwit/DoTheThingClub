-- The escalation-guard trigger was blocking direct SQL Editor edits (no
-- auth.uid() in that context) along with the app-level self-promotion it
-- was meant to stop. Only block the check when there IS a logged-in,
-- non-admin user making the change via the app's API.

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and (new.role is distinct from old.role or new.member_status is distinct from old.member_status)
     and not public.is_admin(auth.uid()) then
    raise exception 'Only admins can change role or member_status';
  end if;
  return new;
end;
$$;
