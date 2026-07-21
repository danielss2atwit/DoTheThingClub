-- Distinguishes admin-sent invites from self-serve signups: accounts
-- created via signInWithOtp with data: { invited: true } land as
-- 'invited' instead of 'pending'.

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
    case when new.raw_user_meta_data->>'invited' = 'true' then 'invited' else 'pending' end,
    'idle'
  );
  return new;
end;
$$;
