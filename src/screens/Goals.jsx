import { useState } from 'react';

export default function Goals({ goals, overallLabel, onToggleMilestone, weeklyGoals, onAddWeeklyGoal }) {
  const [goalText, setGoalText] = useState('');
  const [goalWhy, setGoalWhy] = useState('');
  const [showError, setShowError] = useState(false);

  const submitWeeklyGoal = () => {
    const ok = onAddWeeklyGoal(goalText, goalWhy);
    if (!ok) {
      setShowError(true);
      return;
    }
    setGoalText('');
    setGoalWhy('');
    setShowError(false);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--lilac,#6562ac), #7f7cc4)',
          borderRadius: 22,
          padding: '24px 26px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22, fontStyle: 'var(--head-style,normal)' }}>
            Your 3 challenge areas for Cohort 4
          </div>
          <div style={{ fontSize: 14, opacity: 0.9, marginTop: 5 }}>
            Small, low-stakes, doable. Check one off and it shows up on your profile.
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 'none' }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 38, lineHeight: 1, fontStyle: 'var(--head-style,normal)' }}>
            {overallLabel}
          </div>
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700 }}>complete</div>
        </div>
      </div>

      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 19, fontStyle: 'var(--head-style,normal)' }}>
          Post this week&rsquo;s brave goal
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 4, lineHeight: 1.45 }}>
          Pick one thing that pushes you past comfortable — and name why it counts as a stretch for you.
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>
              This week&rsquo;s goal
            </label>
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="e.g. Ask a question during the team meeting instead of staying quiet…"
              style={{
                marginTop: 6,
                width: '100%',
                minHeight: 60,
                resize: 'none',
                border: '1.5px solid var(--line,rgba(43,36,64,.14))',
                borderRadius: 14,
                padding: '12px 14px',
                fontFamily: 'inherit',
                fontSize: 14.5,
                color: '#2b2440',
                lineHeight: 1.5,
                outline: 'none',
                background: 'var(--bg,#fdfaf3)',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--coral,#f26f63)' }}>
              Why is this out of your comfort zone?
            </label>
            <textarea
              value={goalWhy}
              onChange={(e) => setGoalWhy(e.target.value)}
              placeholder="e.g. I usually stay quiet in meetings because I'm scared my question will sound obvious…"
              style={{
                marginTop: 6,
                width: '100%',
                minHeight: 60,
                resize: 'none',
                border: '1.5px solid var(--line,rgba(43,36,64,.14))',
                borderRadius: 14,
                padding: '12px 14px',
                fontFamily: 'inherit',
                fontSize: 14.5,
                color: '#2b2440',
                lineHeight: 1.5,
                outline: 'none',
                background: 'var(--bg,#fdfaf3)',
              }}
            />
          </div>

          {showError && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>
              Add both a goal and why it&rsquo;s a stretch for you before posting.
            </div>
          )}

          <button
            onClick={submitWeeklyGoal}
            style={{
              alignSelf: 'flex-start',
              background: 'var(--coral,#f26f63)',
              color: '#fff',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 20px',
              borderRadius: 13,
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
            Post my weekly goal →
          </button>
        </div>

        {weeklyGoals.length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {weeklyGoals.map((wg) => (
              <div
                key={wg.id}
                style={{
                  background: 'var(--bg,#fdfaf3)',
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 15,
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#2b2440', lineHeight: 1.4 }}>{wg.text}</div>
                  <span style={{ fontSize: 11.5, color: 'var(--muted,#8a83a0)', fontWeight: 700, flex: 'none' }}>{wg.date}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--coral,#f26f63)', fontWeight: 600, marginTop: 6, lineHeight: 1.45 }}>
                  Why it&rsquo;s a stretch: {wg.why}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {goals.map((g) => (
        <div key={g.id} style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 19, fontStyle: 'var(--head-style,normal)' }}>{g.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 4, lineHeight: 1.45 }}>{g.why}</div>
            </div>
            <div style={{ textAlign: 'right', flex: 'none' }}>
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
              <button
                key={m.id}
                onClick={() => onToggleMilestone(g.id, m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  textAlign: 'left',
                  background: m.done ? 'rgba(43,36,64,.02)' : 'var(--surface,#fff)',
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 14,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(43,36,64,.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line,rgba(43,36,64,.1))')}
              >
                <span
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
                  }}
                >
                  {m.done ? '✓' : ''}
                </span>
                <span
                  style={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: m.done ? '#a49dba' : '#33304a',
                    textDecoration: m.done ? 'line-through' : 'none',
                  }}
                >
                  {m.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
