-- Run this in the Supabase SQL Editor to fix the profiles table you already
-- created — replaces the recursive policies with the corrected ones from
-- the updated supabase/schema.sql. Safe to re-run in full if it errored
-- partway through last time.

drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;
drop policy if exists "profiles_update" on public.profiles;
drop policy if exists "profiles_delete_admin" on public.profiles;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = uid and role = 'admin');
$$;

create policy "profiles_update"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id or public.is_admin(auth.uid()))
  with check (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles_delete_admin"
  on public.profiles for delete
  to authenticated
  using (public.is_admin(auth.uid()));

-- Fix test signups created before this patch — they landed with
-- member_status/status = 'active' from the old (unfixed) trigger. Must run
-- before the escalation-guard trigger below exists, since the SQL Editor
-- has no auth.uid() and would otherwise get blocked by its own new guard.
update public.profiles set member_status = 'pending', status = 'idle', joined_date = null
where member_status = 'active' and role != 'admin';

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (new.role is distinct from old.role or new.member_status is distinct from old.member_status)
     and not public.is_admin(auth.uid()) then
    raise exception 'Only admins can change role or member_status';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_role_escalation_trigger on public.profiles;
create trigger prevent_role_escalation_trigger
  before update on public.profiles
  for each row execute procedure public.prevent_role_escalation();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, initials, email, role, member_status, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 2)),
    new.email,
    'member',
    'pending',
    'idle'
  );
  return new;
end;
$$;
