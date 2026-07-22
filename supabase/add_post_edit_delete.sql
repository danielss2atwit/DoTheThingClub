-- Run this in the Supabase SQL Editor. Lets a member edit or delete their
-- own feed posts (post_high_fives/post_comments already cascade-delete via
-- the FK in add_feed_tables.sql).

create policy "posts_update_own"
  on public.posts for update
  to authenticated
  using (member_id = auth.uid())
  with check (member_id = auth.uid());

create policy "posts_delete_own"
  on public.posts for delete
  to authenticated
  using (member_id = auth.uid());
