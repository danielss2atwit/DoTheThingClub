-- Run this in the Supabase SQL Editor. Adds the resources library —
-- everyone signed in reads it, only admins can add to it.

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
