export default function Goals({ goals, overallLabel, onToggleMilestone }) {
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
