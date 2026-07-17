export default function Profile() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          background: 'var(--surface,#fff)',
          border: '1px solid var(--line,rgba(43,36,64,.1))',
          borderRadius: 22,
          padding: 26,
          display: 'flex',
          gap: 22,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: 'var(--lilac,#6562ac)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 32,
            flex: 'none',
            transform: 'rotate(-4deg)',
          }}
        >
          MC
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 26, fontStyle: 'var(--head-style,normal)' }}>Maya Chen</div>
          <div style={{ fontSize: 14.5, color: '#5a5470', marginTop: 3 }}>Junior · Psychology · Cohort 4</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#7a5a00', background: 'var(--primary,#ffd84c)', padding: '5px 12px', borderRadius: 20 }}>
              Public Speaking
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--coral,#f26f63)', padding: '5px 12px', borderRadius: 20 }}>
              Social Courage
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--lilac,#6562ac)', padding: '5px 12px', borderRadius: 20 }}>
              Consistency
            </span>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>My focus</div>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 20, marginTop: 6, fontStyle: 'var(--head-style,normal)' }}>
          Speaking up &amp; taking up space
        </div>
        <div style={{ fontSize: 14.5, color: '#5a5470', marginTop: 6, lineHeight: 1.5 }}>
          Practicing raising my hand, sharing my opinion first, and not shrinking just to stay comfortable.
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: 8 }}>
        <div style={{ fontSize: 14, color: 'var(--muted,#8a83a0)' }}>This is a prototype profile — plug into the dashboard to see it in action.</div>
      </div>
    </div>
  );
}
