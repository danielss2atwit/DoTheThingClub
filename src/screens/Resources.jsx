export default function Resources({ resources }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div
        style={{
          background: 'var(--surface,#fff)',
          border: '1px solid var(--line,rgba(43,36,64,.1))',
          borderRadius: 20,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 13,
            background: 'var(--primary,#ffd84c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flex: 'none',
          }}
        >
          📚
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 18, fontStyle: 'var(--head-style,normal)' }}>
            Roadmap &amp; reads from your program lead
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 3 }}>
            Hand-picked so you don&rsquo;t have to figure out everything alone.
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {resources.map((r) => (
          <div
            key={r.title}
            style={{
              background: 'var(--surface,#fff)',
              border: '1px solid var(--line,rgba(43,36,64,.1))',
              borderRadius: 18,
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              cursor: 'pointer',
              transition: 'transform .15s ease, box-shadow .15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 28px -14px rgba(43,36,64,.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 11px', borderRadius: 20, background: r.tagBg, color: r.tagFg }}>{r.tag}</span>
              <span style={{ fontSize: 16 }}>↗</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15.5, color: '#2b2440', lineHeight: 1.35 }}>{r.title}</div>
            <div style={{ fontSize: 13, color: '#5a5470', lineHeight: 1.5 }}>{r.blurb}</div>
            <div style={{ fontSize: 12, color: 'var(--muted,#8a83a0)', fontWeight: 700, marginTop: 2 }}>{r.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
