-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Per-member notification inbox — replaces the client-side mock array.
-- Only producer today is the admin "Quick reminders" broadcast; each
-- recipient gets their own row so unread state is per-member.

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  icon text not null default '🔔',
  bg text not null default 'rgba(255,216,76,.22)',
  text text not null,
  unread boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  to authenticated
  using (member_id = auth.uid());

create policy "notifications_update_own"
  on public.notifications for update
  to authenticated
  using (member_id = auth.uid())
  with check (member_id = auth.uid());

-- Admins broadcast reminders by inserting one row per recipient, so the
-- insert check only needs to confirm the sender is an admin.
create policy "notifications_insert_admin"
  on public.notifications for insert
  to authenticated
  with check (public.is_admin(auth.uid()));
