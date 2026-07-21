-- Run this in the Supabase SQL Editor. Adds the shared cohort feed:
-- posts, per-member high-fives (toggle, not a count column), and comments.
-- Everyone signed in can read the whole feed; each member writes only
-- their own posts/high-fives/comments.

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
