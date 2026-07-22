import { useState } from 'react';
import { kindMap } from '../data';

const iconButtonStyle = {
  width: 28,
  height: 28,
  borderRadius: 9,
  border: 'none',
  background: 'rgba(43,36,64,.06)',
  cursor: 'pointer',
  fontSize: 12,
  color: '#5a5470',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
};

const editTextareaStyle = {
  width: '100%',
  minHeight: 70,
  resize: 'none',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '9px 12px',
  fontFamily: 'inherit',
  fontSize: 15,
  color: '#2b2440',
  lineHeight: 1.55,
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
  marginTop: 14,
};

export default function PostCard({
  post: p,
  isOwn,
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
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [textDraft, setTextDraft] = useState(p.text);

  const startEdit = () => {
    setTextDraft(p.text);
    setConfirmingDelete(false);
    setEditing(true);
  };
  const saveEdit = () => {
    const t = textDraft.trim();
    if (!t) return;
    onUpdatePost(p.id, t);
    setEditing(false);
  };
  const cancelEdit = () => setEditing(false);

  const km = kindMap[p.kind] || kindMap.try;
  const hf = p.highFives;
  const open = !!openComments[p.id];

  return (
    <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 20, animation: 'floatin .3s ease' }}>
      {confirmingDelete && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: 'rgba(242,111,99,.08)',
            border: '1px solid rgba(242,111,99,.3)',
            borderRadius: 14,
            padding: '10px 14px',
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>Delete this post? This can&rsquo;t be undone.</div>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            <button
              onClick={() => onDeletePost(p.id)}
              style={{ background: '#f26f63', color: '#fff', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 12.5, padding: '7px 13px', borderRadius: 10, cursor: 'pointer' }}
            >
              Delete
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 12.5, color: '#8a83a0', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
        <div
          onClick={() => onViewProfile(p.authorId)}
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
            cursor: 'pointer',
          }}
        >
          {p.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              onClick={() => onViewProfile(p.authorId)}
              style={{ fontWeight: 700, fontSize: 15, color: '#2b2440', cursor: 'pointer' }}
            >
              {p.author}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: km.bg, color: km.fg }}>
              {km.label}
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted,#8a83a0)', fontWeight: 600, marginTop: 2 }}>
            {p.project ? `${p.project} · ` : ''}{p.time}
          </div>
        </div>
        {isOwn && !editing && (
          <div style={{ display: 'flex', gap: 6, flex: 'none' }}>
            <button onClick={startEdit} title="Edit post" style={iconButtonStyle}>
              ✎
            </button>
            <button onClick={() => setConfirmingDelete(true)} title="Delete post" style={iconButtonStyle}>
              ✕
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <>
          <textarea autoFocus value={textDraft} onChange={(e) => setTextDraft(e.target.value)} style={editTextareaStyle} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              onClick={saveEdit}
              style={{ background: 'var(--coral,#f26f63)', color: '#fff', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 11, cursor: 'pointer' }}
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, color: '#8a83a0', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 15, color: '#33304a', lineHeight: 1.55, marginTop: 14, whiteSpace: 'pre-wrap' }}>{p.text}</div>
      )}

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
                onClick={() => onViewProfile(c.memberId)}
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
                  cursor: 'pointer',
                }}
              >
                {c.initials}
              </div>
              <div style={{ background: 'rgba(43,36,64,.04)', borderRadius: 13, padding: '9px 13px' }}>
                <span
                  onClick={() => onViewProfile(c.memberId)}
                  style={{ fontWeight: 700, fontSize: 13, color: '#2b2440', cursor: 'pointer' }}
                >
                  {c.author}
                </span>
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
}
