const actionButtonStyle = {
  border: 'none',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 13,
  padding: '9px 16px',
  borderRadius: 12,
  cursor: 'pointer',
  background: 'rgba(43,36,64,.06)',
  color: '#5a5470',
};

const primaryButtonStyle = { ...actionButtonStyle, background: 'var(--coral,#f26f63)', color: '#fff' };

export default function WeeklyMeetings({
  weeklyCycle,
  members,
  onSetMeetingDate,
  onToggleSubmissions,
  onToggleAttendance,
  onToggleSubmitted,
  onArchiveWeek,
  onOpenNewWeek,
  onViewProfile,
}) {
  const { currentWeek, archive } = weeklyCycle;
  const activeMembers = members.filter((m) => m.memberStatus === 'active');
  const submittedCount = activeMembers.filter((m) => m.submittedThisWeek).length;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 22, padding: '22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 20 }}>
            Week {currentWeek.number}
          </div>
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: '.02em',
              textTransform: 'uppercase',
              padding: '4px 11px',
              borderRadius: 10,
              background: currentWeek.submissionsOpen ? 'rgba(90,158,120,.15)' : 'rgba(43,36,64,.08)',
              color: currentWeek.submissionsOpen ? '#3f7d58' : '#8a83a0',
            }}
          >
            Submissions {currentWeek.submissionsOpen ? 'open' : 'closed'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>
              Meeting date
            </label>
            <div style={{ marginTop: 6 }}>
              <input
                type="date"
                value={currentWeek.meetingDate}
                onChange={(e) => onSetMeetingDate(e.target.value)}
                style={{
                  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
                  borderRadius: 12,
                  padding: '9px 12px',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  color: '#2b2440',
                  outline: 'none',
                  background: 'var(--bg,#fdfaf3)',
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--coral,#f26f63)' }}>
              Submitted this week
            </label>
            <div style={{ marginTop: 6, fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22 }}>
              {submittedCount}/{activeMembers.length}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
          <button onClick={onToggleSubmissions} style={actionButtonStyle}>
            {currentWeek.submissionsOpen ? 'Close submissions' : 'Reopen submissions'}
          </button>
          <button onClick={onArchiveWeek} style={actionButtonStyle}>Archive this week</button>
          <button onClick={onOpenNewWeek} style={primaryButtonStyle}>Open new week →</button>
        </div>
      </div>

      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
          Attendance &amp; submissions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activeMembers.map((m) => {
            const attended = currentWeek.attendance.includes(m.id);
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 14,
                  padding: '10px 14px',
                }}
              >
                <div
                  onClick={() => onViewProfile(m.id)}
                  style={{ width: 32, height: 32, borderRadius: 10, background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flex: 'none', cursor: 'pointer' }}
                >
                  {m.initials}
                </div>
                <div onClick={() => onViewProfile(m.id)} style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: '#2b2440', cursor: 'pointer' }}>{m.name}</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: '#5a5470', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!m.submittedThisWeek} onChange={() => onToggleSubmitted(m.id)} />
                  Submitted
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: '#5a5470', cursor: 'pointer' }}>
                  <input type="checkbox" checked={attended} onChange={() => onToggleAttendance(m.id)} />
                  Attended
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {archive.length > 0 && (
        <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
            Archived weeks
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {archive.map((w) => (
              <div
                key={w.number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg,#fdfaf3)',
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 14,
                  padding: '10px 16px',
                }}
              >
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#2b2440' }}>Week {w.number}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted,#8a83a0)', fontWeight: 700 }}>{w.meetingDate}</div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--lilac,#6562ac)' }}>
                  {w.submittedCount}/{w.totalCount} submitted
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
