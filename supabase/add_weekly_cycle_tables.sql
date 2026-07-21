-- Run this in the Supabase SQL Editor. Adds the cohort-wide weekly meeting
-- cycle: exactly one non-archived row is "the current week"; archived rows
-- form the history. Admin-only in both directions — no member-facing UI
-- reads this table.

create table public.cohort_weeks (
  id uuid primary key default gen_random_uuid(),
  number int not null unique,
  meeting_date date not null,
  submissions_open boolean not null default true,
  archived boolean not null default false,
  submitted_count int,
  total_count int,
  created_at timestamptz not null default now()
);

create table public.week_attendance (
  week_id uuid not null references public.cohort_weeks (id) on delete cascade,
  member_id uuid not null references public.profiles (id) on delete cascade,
  primary key (week_id, member_id)
);

alter table public.cohort_weeks enable row level security;
alter table public.week_attendance enable row level security;

create policy "cohort_weeks_admin_all"
  on public.cohort_weeks for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "week_attendance_admin_all"
  on public.week_attendance for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Seed a starting "week 1" so the Weekly Meetings screen has a current week
-- to show immediately. Safe to edit/delete manually afterward.
insert into public.cohort_weeks (number, meeting_date, submissions_open, archived)
values (1, current_date, true, false);
