-- Run this in the Supabase SQL Editor. Adds the single cohort-wide admin
-- settings row (semester dates, group branding, reflection questions,
-- privacy toggles). Admin-only in both directions — no member-facing UI
-- reads this table currently.
--
-- The `id boolean primary key check (id)` trick forces exactly one row to
-- ever exist: id can only legally be `true`, and it's the primary key, so a
-- second row is impossible.

create table public.admin_settings (
  id boolean primary key default true check (id),
  semester_start date not null default current_date,
  semester_end date not null default (current_date + interval '4 months')::date,
  meeting_day int not null default 4,
  group_name text not null default 'Our Cohort',
  group_logo text not null default '💛',
  reflection_questions text[] not null default array[
    'Did you do the thing?',
    'How did it go?',
    'What would you tell a friend about to try the same thing?'
  ],
  show_real_names boolean not null default true,
  members_see_each_others_goals boolean not null default true
);

alter table public.admin_settings enable row level security;

create policy "admin_settings_admin_all"
  on public.admin_settings for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

insert into public.admin_settings default values;
