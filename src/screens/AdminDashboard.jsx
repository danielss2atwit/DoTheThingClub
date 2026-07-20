import { useState } from 'react';

const statCardStyle = {
  background: 'var(--surface,#fff)',
  border: '1px solid var(--line,rgba(43,36,64,.1))',
  borderRadius: 18,
  padding: '18px 20px',
  flex: '1 1 200px',
};

export default function AdminDashboard({ members, weeklyCycle, reminderTemplates, onSendReminder, onToggleView }) {
  const [customMessage, setCustomMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const activeMembers = members.filter((m) => m.memberStatus === 'active');
  const submittedCount = activeMembers.filter((m) => m.submittedThisWeek).length;
  const notYetSubmitted = activeMembers.filter((m) => !m.submittedThisWeek);
  const lastWeek = weeklyCycle.archive[0];
  const completionRateLastWeek = lastWeek ? Math.round((lastWeek.submittedCount / lastWeek.totalCount) * 100) : null;

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    onSendReminder(t);
    setSentMessage(t);
    setCustomMessage('');
    setTimeout(() => setSentMessage(''), 2500);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 26 }}>Admin Dashboard</div>
          <div style={{ fontSize: 14, color: 'var(--muted,#8a83a0)', fontWeight: 600, marginTop: 4 }}>
            How your cohort is doing this week.
          </div>
        </div>
        <button
          onClick={onToggleView}
          style={{
            background: 'none',
            color: '#5a5470',
            border: '1px solid var(--line,rgba(43,36,64,.1))',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 13,
            padding: '10px 16px',
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          ← Switch to Member View
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>
            Submitted this week
          </div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 30, marginTop: 6 }}>
            {submittedCount}/{activeMembers.length}
          </div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--coral,#f26f63)' }}>
            Completion rate last week
          </div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 30, marginTop: 6 }}>
            {completionRateLastWeek === null ? '—' : `${completionRateLastWeek}%`}
          </div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#3f7d58' }}>
            Upcoming meeting
          </div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22, marginTop: 6 }}>
            {weeklyCycle.currentWeek.meetingDate}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
          Members who haven&rsquo;t submitted yet
        </div>
        {notYetSubmitted.length === 0 ? (
          <div style={{ fontSize: 14, color: 'var(--muted,#8a83a0)' }}>Everyone&rsquo;s submitted this week 🎉</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {notYetSubmitted.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--bg,#fdfaf3)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 13, padding: '8px 13px' }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flex: 'none' }}>
                  {m.initials}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#2b2440' }}>{m.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17 }}>Quick reminders</div>
        <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 4 }}>
          Sends a notification to your cohort.
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 14 }}>
          {reminderTemplates.map((t) => (
            <button
              key={t}
              onClick={() => send(t)}
              style={{
                border: 'none',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: 12.5,
                padding: '9px 14px',
                borderRadius: 12,
                cursor: 'pointer',
                background: 'rgba(101,98,172,.12)',
                color: 'var(--lilac,#6562ac)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <input
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(customMessage)}
            placeholder="Write a custom reminder…"
            style={{
              flex: 1,
              border: '1.5px solid var(--line,rgba(43,36,64,.14))',
              borderRadius: 12,
              padding: '10px 14px',
              fontFamily: 'inherit',
              fontSize: 14,
              color: '#2b2440',
              outline: 'none',
              background: 'var(--bg,#fdfaf3)',
            }}
          />
          <button
            onClick={() => send(customMessage)}
            style={{
              flex: 'none',
              background: 'var(--coral,#f26f63)',
              color: '#fff',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '10px 18px',
              borderRadius: 12,
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
        {sentMessage && (
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#3f7d58', marginTop: 10 }}>
            Sent: &ldquo;{sentMessage}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
