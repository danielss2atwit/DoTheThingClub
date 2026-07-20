import { navBase, adminNav } from '../data';

const idleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 13,
  width: '100%',
  textAlign: 'left',
  border: 'none',
  background: 'none',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 14.5,
  color: '#5a5470',
  padding: '11px 13px',
  borderRadius: 14,
  cursor: 'pointer',
};

const activeBounceStyle = {
  ...idleStyle,
  background: '#ffd84c',
  fontWeight: 800,
  color: '#2b2440',
  boxShadow: '0 3px 0 rgba(200,166,40,.4)',
};

export default function Sidebar({ screen, view, onNav, onPost, onProfile }) {
  return (
    <aside
      style={{
        width: 250,
        flex: 'none',
        background: 'var(--surface,#fff)',
        borderRight: '1px solid var(--line,rgba(43,36,64,.1))',
        display: 'flex',
        flexDirection: 'column',
        padding: '26px 18px',
        gap: 22,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0 6px' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            background: 'var(--primary,#ffd84c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 0 rgba(43,36,64,.14)',
            transform: 'rotate(-6deg)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display,\'Fredoka\')',
              fontWeight: 700,
              fontSize: 22,
              color: '#2b2440',
              fontStyle: 'var(--head-style,normal)',
            }}
          >
            D
          </span>
        </div>
        <div style={{ lineHeight: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display,\'Fredoka\')',
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-.01em',
              fontStyle: 'var(--head-style,normal)',
            }}
          >
            DoThe<span style={{ color: 'var(--coral,#f26f63)' }}>Thing</span>Club
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--muted,#8a83a0)', marginTop: 3, fontWeight: 600, letterSpacing: '.02em' }}>
            One brave thing, every week.
          </div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
        {navBase.map((item) => {
          const isActive = screen === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNav(item.key)}
              style={isActive ? activeBounceStyle : idleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(.98)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
            >
              <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {view === 'admin' && (
          <>
            <div
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid var(--line,rgba(43,36,64,.1))',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: 'var(--muted,#8a83a0)',
                padding: '10px 13px 4px',
              }}
            >
              Admin
            </div>
            {adminNav.map((item) => {
              const isActive = screen === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  style={isActive ? activeBounceStyle : idleStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(.98)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
                >
                  <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div
          style={{
            background: 'linear-gradient(160deg, var(--primary,#ffd84c), #ffe486)',
            borderRadius: 18,
            padding: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#7a5a00', letterSpacing: '.04em', textTransform: 'uppercase' }}>
            This week&rsquo;s nudge
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2b2440', marginTop: 6, lineHeight: 1.35 }}>
            Post one honest update — even if it&rsquo;s a flop. 💛
          </div>
          <button
            onClick={onPost}
            style={{
              marginTop: 12,
              width: '100%',
              border: 'none',
              background: '#2b2440',
              color: '#fff',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 12.5,
              padding: 9,
              borderRadius: 11,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#3a3155')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2b2440')}
          >
            Share an update
          </button>
        </div>

        <button
          onClick={onProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            background: 'none',
            border: '1px solid var(--line,rgba(43,36,64,.1))',
            borderRadius: 14,
            padding: '9px 11px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: 'var(--lilac,#6562ac)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 14,
              flex: 'none',
            }}
          >
            MC
          </div>
          <div style={{ lineHeight: 1.2, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2b2440' }}>Maya Chen</div>
            <div style={{ fontSize: 11, color: 'var(--muted,#8a83a0)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Speaking up · Cohort 4
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
