-- Run this in the Supabase SQL Editor. Adds self-editable "about me" fields
-- to profiles (shown/edited on the member-facing Profile screen). Existing
-- profiles_update RLS policy already covers these (a member can edit their
-- own row) — no new policy needed.

alter table public.profiles
  add column bio text not null default '',
  add column focus_title text not null default '',
  add column focus_body text not null default '',
  add column tags text[] not null default '{}';
