import { kindMap } from '../data';

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
  openComments,
  commentDrafts,
  onToggleHighFive,
  onToggleComments,
  onSetCommentDraft,
  onAddComment,
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
      {posts.map((p) => {
        const km = kindMap[p.kind] || kindMap.try;
        const hf = p.highFives;
        const open = !!openComments[p.id];
        return (
          <div key={p.id} style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 20, animation: 'floatin .3s ease' }}>
            <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  color: '#fff',
                  background: p.color,
                }}
              >
                {p.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#2b2440' }}>{p.author}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: km.bg, color: km.fg }}>
                    {km.label}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted,#8a83a0)', fontWeight: 600, marginTop: 2 }}>
                  {p.project ? `${p.project} · ` : ''}{p.time}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 15, color: '#33304a', lineHeight: 1.55, marginTop: 14, whiteSpace: 'pre-wrap' }}>{p.text}</div>

            {p.hasImg && (
              <div
                style={{
                  marginTop: 14,
                  height: 190,
                  borderRadius: 16,
                  border: '1px dashed rgba(43,36,64,.2)',
                  background: 'repeating-linear-gradient(45deg, rgba(43,36,64,.03) 0 12px, rgba(43,36,64,.05) 12px 24px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, color: 'var(--muted,#8a83a0)' }}>{p.imgLabel}</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
              <button
                onClick={() => onToggleHighFive(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  borderRadius: 12,
                  padding: '9px 15px',
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  border: p.hiFived ? '1px solid transparent' : '1px solid var(--line,rgba(43,36,64,.1))',
                  background: p.hiFived ? 'var(--primary,#ffd84c)' : 'none',
                  color: p.hiFived ? '#7a5a00' : '#5a5470',
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(.94)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = '')}
              >
                <span style={{ fontSize: 15, display: 'inline-block', animation: p.hiFived ? 'pop .4s ease' : 'none' }}>✋</span> High-five{' '}
                <span style={{ fontWeight: 800 }}>{hf}</span>
              </button>
              <button
                onClick={() => onToggleComments(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'none',
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 12,
                  padding: '9px 15px',
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#5a5470',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                💬 {p.comments.length}
              </button>
            </div>

            {open && (
              <div style={{ marginTop: 14, borderTop: '1px solid var(--line,rgba(43,36,64,.1))', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.comments.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10 }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        flex: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 11,
                        color: '#fff',
                        background: c.color,
                      }}
                    >
                      {c.initials}
                    </div>
                    <div style={{ background: 'rgba(43,36,64,.04)', borderRadius: 13, padding: '9px 13px' }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: '#2b2440' }}>{c.author}</span>
                      <div style={{ fontSize: 13.5, color: '#43405a', lineHeight: 1.45, marginTop: 2 }}>{c.text}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      flex: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 11,
                      color: '#fff',
                      background: memberColor || 'var(--lilac,#6562ac)',
                    }}
                  >
                    {memberInitials}
                  </div>
                  <input
                    value={commentDrafts[p.id] || ''}
                    onChange={(e) => onSetCommentDraft(p.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        onAddComment(p.id);
                      }
                    }}
                    placeholder="Add a supportive comment…"
                    style={{
                      flex: 1,
                      border: '1px solid var(--line,rgba(43,36,64,.1))',
                      borderRadius: 12,
                      padding: '10px 14px',
                      fontFamily: 'inherit',
                      fontSize: 13.5,
                      color: '#2b2440',
                      outline: 'none',
                      background: 'var(--bg,#fdfaf3)',
                    }}
                  />
                  <button
                    onClick={() => onAddComment(p.id)}
                    style={{
                      background: 'var(--lilac,#6562ac)',
                      color: '#fff',
                      border: 'none',
                      fontFamily: 'inherit',
                      fontWeight: 700,
                      fontSize: 13,
                      padding: '10px 16px',
                      borderRadius: 12,
                      cursor: 'pointer',
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
