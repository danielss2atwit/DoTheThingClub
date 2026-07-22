import PostCard from '../components/PostCard';

const composeTagDefs = [
  { key: 'try', label: 'Tried it' },
  { key: 'learn', label: 'Learned' },
  { key: 'win', label: 'Small win' },
];

export default function Feed({
  compose,
  onCompose,
  composeKind,
  onSetComposeKind,
  onPostUpdate,
  posts,
  currentMemberId,
  onUpdatePost,
  onDeletePost,
  openComments,
  commentDrafts,
  onToggleHighFive,
  onToggleComments,
  onSetCommentDraft,
  onAddComment,
  onViewProfile,
  memberInitials,
  memberColor,
}) {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* compose */}
      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 18 }}>
        <div style={{ display: 'flex', gap: 13 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 13,
              background: memberColor || 'var(--lilac,#6562ac)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 15,
              flex: 'none',
            }}
          >
            {memberInitials}
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              value={compose}
              onChange={onCompose}
              placeholder="What did you push yourself to do this week? Wins, flops, and sweaty-palm moments all welcome…"
              style={{
                width: '100%',
                minHeight: 54,
                resize: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: 15,
                color: '#2b2440',
                lineHeight: 1.5,
                background: 'none',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                borderTop: '1px solid var(--line,rgba(43,36,64,.1))',
                paddingTop: 12,
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {composeTagDefs.map((c) => {
                  const on = composeKind === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => onSetComposeKind(c.key)}
                      style={{
                        border: 'none',
                        fontFamily: 'inherit',
                        fontWeight: 700,
                        fontSize: 12,
                        padding: '7px 13px',
                        borderRadius: 20,
                        cursor: 'pointer',
                        background: on ? '#2b2440' : 'rgba(43,36,64,.06)',
                        color: on ? '#fff' : '#5a5470',
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line,rgba(43,36,64,.1))', background: 'none', cursor: 'pointer', fontSize: 16 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  📎
                </button>
                <button
                  onClick={onPostUpdate}
                  style={{
                    background: 'var(--coral,#f26f63)',
                    color: '#fff',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    fontSize: 13.5,
                    padding: '10px 20px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    boxShadow: '0 3px 0 rgba(196,74,64,.5)',
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(2px)';
                    e.currentTarget.style.boxShadow = '0 1px 0 rgba(196,74,64,.5)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 3px 0 rgba(196,74,64,.5)';
                  }}
                >
                  Share it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* posts */}
      {posts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          isOwn={p.authorId === currentMemberId}
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}
          openComments={openComments}
          commentDrafts={commentDrafts}
          onToggleHighFive={onToggleHighFive}
          onToggleComments={onToggleComments}
          onSetCommentDraft={onSetCommentDraft}
          onAddComment={onAddComment}
          onViewProfile={onViewProfile}
          memberInitials={memberInitials}
          memberColor={memberColor}
        />
      ))}
    </div>
  );
}
