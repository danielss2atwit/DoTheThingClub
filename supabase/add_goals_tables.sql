-- Run this in the Supabase SQL Editor. Adds semester goals, their
-- milestones, and weekly challenge entries — all owned by a member,
-- readable (not writable) by admins for the Members screen rollup.

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
