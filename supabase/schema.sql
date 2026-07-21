-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query).

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  initials text,
  color text not null default '#8a83a0',
  email text,
  project text not null default '',
  status text not null default 'idle',              -- 'active' | 'idle' (activity dot)
  member_status text not null default 'pending',     -- 'pending' | 'invited' | 'active' | 'deactivated'
  role text not null default 'member',               -- 'member' | 'admin'
  joined_date date,
  submitted_this_week boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Bypasses RLS internally (security definer) so admin checks don't
-- recurse back into the policies that call this function.
create function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = uid and role = 'admin');
$$;

-- Any signed-in user can read the roster (needed for peer list / admin dashboard).
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- A member can edit their own row; admins can edit anyone's.
-- Role/member_status escalation is blocked separately by a trigger below.
create policy "profiles_update"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id or public.is_admin(auth.uid()))
  with check (auth.uid() = id or public.is_admin(auth.uid()));

-- Only admins can hard-delete a profile (decline/remove member).
create policy "profiles_delete_admin"
  on public.profiles for delete
  to authenticated
  using (public.is_admin(auth.uid()));

-- Row inserts happen only via the handle_new_user trigger below (security
-- definer, bypasses RLS) — no client-facing insert policy is needed.

create function public.prevent_role_escalation()
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

create trigger prevent_role_escalation_trigger
  before update on public.profiles
  for each row execute procedure public.prevent_role_escalation();

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
-- Self-serve signUp({ options: { data: { name } } }) lands as 'pending'.
-- Admin-side invites (signInWithOtp with data: { name, invited: true }) land
-- as 'invited' so the Members screen can tell the two apart.
create function public.handle_new_user()
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- To make the first account an admin, run manually after they sign up:
-- update public.profiles set role = 'admin', member_status = 'active', status = 'active', joined_date = current_date where email = 'you@example.com';

-- Semester goals, milestones, and weekly challenge entries — owned by a
-- member, readable (not writable) by admins for the Members screen rollup.

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  why text not null default '',
  bar_color text not null default '#f26f63',
  created_at timestamptz not null default now()
);

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.goals (id) on delete cascade,
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.weekly_goals (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  goal_id uuid references public.goals (id) on delete set null,
  text text not null,
  why text not null,
  reflected boolean not null default false,
  completed boolean,
  reflection text not null default '',
  created_at timestamptz not null default now()
);

alter table public.goals enable row level security;
alter table public.milestones enable row level security;
alter table public.weekly_goals enable row level security;

create policy "goals_select"
  on public.goals for select
  to authenticated
  using (member_id = auth.uid() or public.is_admin(auth.uid()));

create policy "goals_insert_own"
  on public.goals for insert
  to authenticated
  with check (member_id = auth.uid());

create policy "goals_update_own"
  on public.goals for update
  to authenticated
  using (member_id = auth.uid())
  with check (member_id = auth.uid());

create policy "goals_delete_own"
  on public.goals for delete
  to authenticated
  using (member_id = auth.uid());

-- milestones have no member_id of their own — ownership is checked
-- through the parent goal.
create policy "milestones_select"
  on public.milestones for select
  to authenticated
  using (
    exists (
      select 1 from public.goals g
      where g.id = milestones.goal_id
        and (g.member_id = auth.uid() or public.is_admin(auth.uid()))
    )
  );

create policy "milestones_insert_own"
  on public.milestones for insert
  to authenticated
  with check (
    exists (select 1 from public.goals g where g.id = milestones.goal_id and g.member_id = auth.uid())
  );

create policy "milestones_update_own"
  on public.milestones for update
  to authenticated
  using (
    exists (select 1 from public.goals g where g.id = milestones.goal_id and g.member_id = auth.uid())
  )
  with check (
    exists (select 1 from public.goals g where g.id = milestones.goal_id and g.member_id = auth.uid())
  );

create policy "milestones_delete_own"
  on public.milestones for delete
  to authenticated
  using (
    exists (select 1 from public.goals g where g.id = milestones.goal_id and g.member_id = auth.uid())
  );

create policy "weekly_goals_select"
  on public.weekly_goals for select
  to authenticated
  using (member_id = auth.uid() or public.is_admin(auth.uid()));

create policy "weekly_goals_insert_own"
  on public.weekly_goals for insert
  to authenticated
  with check (member_id = auth.uid());

create policy "weekly_goals_update_own"
  on public.weekly_goals for update
  to authenticated
  using (member_id = auth.uid())
  with check (member_id = auth.uid());

-- Shared cohort feed: posts, per-member high-fives (toggle, not a count
-- column), and comments. Everyone signed in reads the whole feed; each
-- member writes only their own posts/high-fives/comments.

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null default 'try' check (kind in ('try', 'learn', 'win')),
  text text not null,
  created_at timestamptz not null default now()
);

create table public.post_high_fives (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  member_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, member_id)
);

create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  member_id uuid not null references public.profiles (id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.post_high_fives enable row level security;
alter table public.post_comments enable row level security;

create policy "posts_select_authenticated"
  on public.posts for select
  to authenticated
  using (true);

create policy "posts_insert_own"
  on public.posts for insert
  to authenticated
  with check (member_id = auth.uid());

create policy "post_high_fives_select_authenticated"
  on public.post_high_fives for select
  to authenticated
  using (true);

create policy "post_high_fives_insert_own"
  on public.post_high_fives for insert
  to authenticated
  with check (member_id = auth.uid());

create policy "post_high_fives_delete_own"
  on public.post_high_fives for delete
  to authenticated
  using (member_id = auth.uid());

create policy "post_comments_select_authenticated"
  on public.post_comments for select
  to authenticated
  using (true);

create policy "post_comments_insert_own"
  on public.post_comments for insert
  to authenticated
  with check (member_id = auth.uid());

-- Cohort announcements — everyone signed in reads them, only admins post/delete.

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

-- Cohort-wide weekly meeting cycle: exactly one non-archived row is "the
-- current week"; archived rows form the history. Admin-only, no
-- member-facing UI reads this table.

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

-- Resources library — everyone signed in reads it, only admins add to it.

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  source text not null,
  tag text not null default 'Toolkit' check (tag in ('Toolkit', 'Mindset', 'Stories')),
  blurb text not null,
  created_at timestamptz not null default now()
);

alter table public.resources enable row level security;

create policy "resources_select_authenticated"
  on public.resources for select
  to authenticated
  using (true);

create policy "resources_insert_admin"
  on public.resources for insert
  to authenticated
  with check (member_id = auth.uid() and public.is_admin(auth.uid()));

-- Single cohort-wide admin settings row (semester dates, group branding,
-- reflection questions, privacy toggles). Admin-only, no member-facing UI
-- reads this table currently. The `id boolean primary key check (id)` trick
-- forces exactly one row to ever exist.

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
