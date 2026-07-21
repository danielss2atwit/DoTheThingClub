-- Run this in the Supabase SQL Editor. Adds cohort announcements —
-- everyone signed in reads them, only admins can post or delete.

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  type text not null default 'announcement' check (type in ('reminder', 'announcement', 'event', 'resource', 'guest-speaker')),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "announcements_select_authenticated"
  on public.announcements for select
  to authenticated
  using (true);

create policy "announcements_insert_admin"
  on public.announcements for insert
  to authenticated
  with check (member_id = auth.uid() and public.is_admin(auth.uid()));

create policy "announcements_delete_admin"
  on public.announcements for delete
  to authenticated
  using (public.is_admin(auth.uid()));
