import { useState } from 'react';

const iconButtonStyle = {
  width: 30,
  height: 30,
  borderRadius: 9,
  border: 'none',
  background: 'rgba(43,36,64,.06)',
  cursor: 'pointer',
  fontSize: 13,
  color: '#5a5470',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleInputStyle = {
  width: '100%',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '9px 12px',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 700,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

const whyTextareaStyle = {
  marginTop: 8,
  width: '100%',
  minHeight: 54,
  resize: 'none',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '9px 12px',
  fontFamily: 'inherit',
  fontSize: 13.5,
  color: '#2b2440',
  lineHeight: 1.5,
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

const smallIconButtonStyle = {
  width: 26,
  height: 26,
  borderRadius: 8,
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

const milestoneInputStyle = {
  flex: 1,
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 10,
  padding: '8px 12px',
  fontFamily: 'inherit',
  fontSize: 14.5,
  fontWeight: 600,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

export default function GoalCard({
  goal: g,
  onToggleMilestone,
  onUpdateGoal,
  onDeleteGoal,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
}) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [titleDraft, setTitleDraft] = useState(g.title);
  const [whyDraft, setWhyDraft] = useState(g.why);

  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [milestoneDraft, setMilestoneDraft] = useState('');
  const [newMilestoneText, setNewMilestoneText] = useState('');

  const startEdit = () => {
    setTitleDraft(g.title);
    setWhyDraft(g.why);
    setConfirmingDelete(false);
    setEditing(true);
  };
  const saveEdit = () => {
    const t = titleDraft.trim();
    if (!t) return;
    onUpdateGoal(g.id, t, whyDraft.trim());
    setEditing(false);
  };
  const cancelEdit = () => setEditing(false);

  const startMilestoneEdit = (m) => {
    setEditingMilestoneId(m.id);
    setMilestoneDraft(m.text);
  };
  const saveMilestoneEdit = () => {
    const t = milestoneDraft.trim();
    if (!t) return;
    onUpdateMilestone(g.id, editingMilestoneId, t);
    setEditingMilestoneId(null);
  };
  const cancelMilestoneEdit = () => setEditingMilestoneId(null);

  const addMilestone = () => {
    const t = newMilestoneText.trim();
    if (!t) return;
    onAddMilestone(g.id, t);
    setNewMilestoneText('');
  };

  return (
    <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
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
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>Delete this goal and its milestones? This can&rsquo;t be undone.</div>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            <button
              onClick={() => onDeleteGoal(g.id)}
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

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ flex: 1 }}>
          {editing ? (
            <>
              <input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} style={titleInputStyle} />
              <textarea value={whyDraft} onChange={(e) => setWhyDraft(e.target.value)} style={whyTextareaStyle} />
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
            <>
              <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 19, fontStyle: 'var(--head-style,normal)' }}>{g.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 4, lineHeight: 1.45 }}>{g.why}</div>
            </>
          )}
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          {!editing && (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginBottom: 8 }}>
              <button onClick={startEdit} title="Edit goal" style={iconButtonStyle}>
                ✎
              </button>
              <button onClick={() => setConfirmingDelete(true)} title="Delete goal" style={iconButtonStyle}>
                ✕
              </button>
            </div>
          )}
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 20, color: g.barColor, fontStyle: 'var(--head-style,normal)' }}>
            {g.pct}%
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--muted,#8a83a0)', fontWeight: 700 }}>
            {g.done} of {g.total}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14, height: 9, borderRadius: 20, background: 'rgba(43,36,64,.08)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 20,
            background: g.barColor,
            transition: 'width .5s cubic-bezier(.34,1.56,.64,1)',
            width: `${g.pct}%`,
          }}
        />
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {g.milestones.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              background: m.done ? 'rgba(43,36,64,.02)' : 'var(--surface,#fff)',
              border: '1px solid var(--line,rgba(43,36,64,.1))',
              borderRadius: 14,
              padding: '10px 14px',
            }}
          >
            <button
              onClick={() => onToggleMilestone(g.id, m.id)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 900,
                color: '#fff',
                background: m.done ? g.barColor : 'transparent',
                border: `2px solid ${m.done ? g.barColor : 'rgba(43,36,64,.2)'}`,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {m.done ? '✓' : ''}
            </button>

            {editingMilestoneId === m.id ? (
              <>
                <input
                  autoFocus
                  value={milestoneDraft}
                  onChange={(e) => setMilestoneDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveMilestoneEdit()}
                  style={milestoneInputStyle}
                />
                <button onClick={saveMilestoneEdit} title="Save step" style={smallIconButtonStyle}>
                  ✓
                </button>
                <button onClick={cancelMilestoneEdit} title="Cancel" style={smallIconButtonStyle}>
                  ✕
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => onToggleMilestone(g.id, m.id)}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: m.done ? '#a49dba' : '#33304a',
                    textDecoration: m.done ? 'line-through' : 'none',
                  }}
                >
                  {m.text}
                </span>
                <button onClick={() => startMilestoneEdit(m)} title="Edit step" style={smallIconButtonStyle}>
                  ✎
                </button>
                <button onClick={() => onDeleteMilestone(g.id, m.id)} title="Delete step" style={smallIconButtonStyle}>
                  ✕
                </button>
              </>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            value={newMilestoneText}
            onChange={(e) => setNewMilestoneText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
            placeholder="Add another step…"
            style={{
              flex: 1,
              border: '1.5px dashed var(--line,rgba(43,36,64,.2))',
              borderRadius: 14,
              padding: '10px 14px',
              fontFamily: 'inherit',
              fontSize: 14,
              color: '#2b2440',
              outline: 'none',
              background: 'var(--bg,#fdfaf3)',
            }}
          />
          <button
            onClick={addMilestone}
            style={{
              flex: 'none',
              background: 'rgba(101,98,172,.12)',
              color: 'var(--lilac,#6562ac)',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '10px 16px',
              borderRadius: 13,
              cursor: 'pointer',
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
