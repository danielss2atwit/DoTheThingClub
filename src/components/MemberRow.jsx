import { useState } from 'react';

const badgeStyles = {
  active: { bg: 'rgba(90,158,120,.15)', fg: '#3f7d58', label: 'Active' },
  pending: { bg: 'rgba(255,216,76,.25)', fg: '#7a5a00', label: 'Pending approval' },
  invited: { bg: 'rgba(101,98,172,.14)', fg: '#6562ac', label: 'Invited' },
  deactivated: { bg: 'rgba(43,36,64,.08)', fg: '#8a83a0', label: 'Deactivated' },
};

const actionButtonStyle = {
  border: 'none',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 12.5,
  padding: '7px 13px',
  borderRadius: 10,
  cursor: 'pointer',
  background: 'rgba(43,36,64,.06)',
  color: '#5a5470',
};

const dangerButtonStyle = { ...actionButtonStyle, background: 'rgba(242,111,99,.14)', color: '#d0554a' };
const primaryButtonStyle = { ...actionButtonStyle, background: '#6562ac', color: '#fff' };

const fieldStyle = {
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 10,
  padding: '8px 12px',
  fontFamily: 'inherit',
  fontSize: 13.5,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

export default function MemberRow({
  member: m,
  onUpdateMember,
  onApprove,
  onDecline,
  onMarkJoined,
  onDeactivate,
  onReactivate,
  onRemove,
  onViewProfile,
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const [nameDraft, setNameDraft] = useState(m.name);
  const [emailDraft, setEmailDraft] = useState(m.email);
  const [projectDraft, setProjectDraft] = useState(m.project);

  const badge = badgeStyles[m.memberStatus] || badgeStyles.active;

  const startEdit = () => {
    setNameDraft(m.name);
    setEmailDraft(m.email);
    setProjectDraft(m.project);
    setConfirmingRemove(false);
    setEditing(true);
  };
  const saveEdit = () => {
    const n = nameDraft.trim();
    if (!n) return;
    onUpdateMember(m.id, { name: n, email: emailDraft.trim(), project: projectDraft.trim() });
    setEditing(false);
  };

  return (
    <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 18, padding: 16 }}>
      {confirmingRemove && (
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
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>Remove {m.name} from the cohort? This can&rsquo;t be undone.</div>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            <button onClick={() => onRemove(m.id)} style={{ ...dangerButtonStyle, background: '#f26f63', color: '#fff' }}>
              Remove
            </button>
            <button onClick={() => setConfirmingRemove(false)} style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 12.5, color: '#8a83a0', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          onClick={() => onViewProfile(m.id)}
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            background: m.color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 14,
            flex: 'none',
            cursor: 'pointer',
          }}
        >
          {m.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} placeholder="Name" style={{ ...fieldStyle, flex: '1 1 160px' }} />
              <input value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)} placeholder="Email" style={{ ...fieldStyle, flex: '1 1 200px' }} />
              <input value={projectDraft} onChange={(e) => setProjectDraft(e.target.value)} placeholder="Focus / project" style={{ ...fieldStyle, flex: '1 1 200px' }} />
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span onClick={() => onViewProfile(m.id)} style={{ fontWeight: 700, fontSize: 14.5, color: '#2b2440', cursor: 'pointer' }}>{m.name}</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.02em', textTransform: 'uppercase', background: badge.bg, color: badge.fg, padding: '3px 9px', borderRadius: 8 }}>
                  {badge.label}
                </span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--muted,#8a83a0)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.email}
                {m.project ? ` · ${m.project}` : ''}
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 7, flex: 'none', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {editing ? (
            <>
              <button onClick={saveEdit} style={primaryButtonStyle}>Save</button>
              <button onClick={() => setEditing(false)} style={actionButtonStyle}>Cancel</button>
            </>
          ) : (
            <>
              {m.memberStatus === 'pending' && (
                <>
                  <button onClick={() => onApprove(m.id)} style={primaryButtonStyle}>Approve</button>
                  <button onClick={() => onDecline(m.id)} style={dangerButtonStyle}>Decline</button>
                </>
              )}
              {m.memberStatus === 'invited' && (
                <>
                  <button onClick={() => onMarkJoined(m.id)} style={primaryButtonStyle}>Mark as joined</button>
                  <button onClick={() => setConfirmingRemove(true)} style={dangerButtonStyle}>Cancel invite</button>
                </>
              )}
              {m.memberStatus === 'active' && (
                <>
                  <button onClick={() => setExpanded((e) => !e)} style={actionButtonStyle}>{expanded ? 'Hide' : 'View'} history</button>
                  <button onClick={startEdit} style={actionButtonStyle}>Edit</button>
                  <button onClick={() => onDeactivate(m.id)} style={actionButtonStyle}>Deactivate</button>
                  <button onClick={() => setConfirmingRemove(true)} style={dangerButtonStyle}>Remove</button>
                </>
              )}
              {m.memberStatus === 'deactivated' && (
                <>
                  <button onClick={() => onReactivate(m.id)} style={primaryButtonStyle}>Reactivate</button>
                  <button onClick={() => setConfirmingRemove(true)} style={dangerButtonStyle}>Remove</button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed rgba(43,36,64,.15)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)', marginBottom: 8 }}>
              Semester goals
            </div>
            {m.goals.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--muted,#8a83a0)' }}>No goals set yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {m.goals.map((g) => {
                  const done = g.milestones.filter((mi) => mi.done).length;
                  const total = g.milestones.length;
                  return (
                    <div key={g.id} style={{ background: 'var(--bg,#fdfaf3)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 13, padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontWeight: 700, fontSize: 13.5, color: '#2b2440' }}>{g.title}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 800, color: g.barColor }}>{done}/{total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--coral,#f26f63)', marginBottom: 8 }}>
              Weekly challenge history
            </div>
            {m.weeklyGoals.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--muted,#8a83a0)' }}>No weekly challenges submitted yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {m.weeklyGoals.map((wg) => (
                  <div key={wg.id} style={{ background: 'var(--bg,#fdfaf3)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 13, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#2b2440' }}>{wg.text}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted,#8a83a0)', fontWeight: 700, flex: 'none' }}>{wg.date}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: wg.completed ? '#3f7d58' : '#8a83a0', marginTop: 4 }}>
                      {wg.reflected ? (wg.completed ? '✓ Completed' : 'Not completed') : 'Awaiting reflection'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
