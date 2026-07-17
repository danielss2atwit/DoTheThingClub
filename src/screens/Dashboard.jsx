export default function Dashboard({ streak, doneM, totalM, overallLabel, ringGrad, goals, peers, onGoals, onIntake, onFeed }) {
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display,\'Fredoka\')',
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: '-.02em',
              fontStyle: 'var(--head-style,normal)',
            }}
          >
            Hey Maya 👋
          </div>
          <div style={{ fontSize: 15, color: 'var(--muted,#8a83a0)', fontWeight: 600, marginTop: 5 }}>
            You&rsquo;re doing the brave thing. Here&rsquo;s where you&rsquo;re at this week.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 9 }}>
          <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 14, padding: '11px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22, color: 'var(--coral,#f26f63)', fontStyle: 'var(--head-style,normal)' }}>
              {streak}🔥
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted,#8a83a0)', fontWeight: 700 }}>week streak</div>
          </div>
          <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 14, padding: '11px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22, color: 'var(--lilac,#6562ac)', fontStyle: 'var(--head-style,normal)' }}>
              {doneM}/{totalM}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted,#8a83a0)', fontWeight: 700 }}>challenges done</div>
          </div>
        </div>
      </div>

      {/* hero "your thing" */}
      <div
        style={{
          background: 'var(--surface,#fff)',
          border: '1px solid var(--line,rgba(43,36,64,.1))',
          borderRadius: 24,
          padding: '26px 28px',
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -30,
            width: 170,
            height: 170,
            borderRadius: '50%',
            background: 'var(--primary,#ffd84c)',
            opacity: 0.16,
          }}
        />
        <div
          style={{
            flex: 'none',
            width: 132,
            height: 132,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'ringspin .6s ease',
            background: ringGrad,
          }}
        >
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: '50%',
              background: 'var(--surface,#fff)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 30, lineHeight: 1, fontStyle: 'var(--head-style,normal)' }}>
              {overallLabel}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--muted,#8a83a0)', fontWeight: 700, marginTop: 2 }}>of your plan</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>
              Your focus
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted,#8a83a0)', background: 'rgba(101,98,172,.1)', padding: '3px 9px', borderRadius: 20 }}>
              Week 3 of 8
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 26, letterSpacing: '-.01em', fontStyle: 'var(--head-style,normal)' }}>
            Speaking up &amp; taking up space
          </div>
          <div style={{ fontSize: 14.5, color: '#5a5470', marginTop: 6, lineHeight: 1.5, maxWidth: 560 }}>
            Practicing raising my hand, sharing my opinion first, and not shrinking just to stay comfortable.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button
              onClick={onGoals}
              style={{
                background: 'var(--primary,#ffd84c)',
                color: '#2b2440',
                border: 'none',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: 13,
                padding: '10px 16px',
                borderRadius: 12,
                cursor: 'pointer',
                boxShadow: '0 3px 0 rgba(200,166,40,.5)',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(200,166,40,.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 3px 0 rgba(200,166,40,.5)';
              }}
            >
              See my challenges →
            </button>
            <button
              onClick={onIntake}
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
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              Revisit my intake
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr .9fr', gap: 22, alignItems: 'start' }}>
        {/* goals mini */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 18, fontStyle: 'var(--head-style,normal)' }}>
              Your challenges
            </div>
            <button
              onClick={onGoals}
              style={{ background: 'none', border: 'none', color: 'var(--lilac,#6562ac)', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
            >
              View all
            </button>
          </div>
          {goals.map((g) => (
            <div key={g.id} style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 18, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#2b2440' }}>{g.title}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted,#8a83a0)', flex: 'none' }}>
                  {g.done}/{g.total}
                </div>
              </div>
              <div style={{ marginTop: 11, height: 9, borderRadius: 20, background: 'rgba(43,36,64,.08)', overflow: 'hidden' }}>
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
            </div>
          ))}
        </div>

        {/* cohort strip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 18, fontStyle: 'var(--head-style,normal)' }}>
              Your cohort
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted,#8a83a0)' }}>7 doers</span>
          </div>
          <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 18, padding: 8, display: 'flex', flexDirection: 'column' }}>
            {peers.map((p) => (
              <button
                key={p.name}
                onClick={onFeed}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, border: 'none', background: 'none', borderRadius: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    flex: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#fff',
                    background: p.color,
                  }}
                >
                  {p.initials}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#2b2440' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted,#8a83a0)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.project}
                  </div>
                </div>
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    flex: 'none',
                    background: p.status === 'active' ? '#5a9e78' : 'rgba(43,36,64,.18)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
