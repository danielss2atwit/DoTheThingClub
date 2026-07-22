export default function Topbar({ screenTitle, screenSub, hasUnread, unreadCount, onToggleNotif, onPost, onSignOut }) {
  return (
    <header
      style={{
        height: 70,
        flex: 'none',
        background: 'rgba(253,250,243,.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--line,rgba(43,36,64,.1))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display,\'Fredoka\')',
            fontWeight: 700,
            fontSize: 21,
            letterSpacing: '-.01em',
            fontStyle: 'var(--head-style,normal)',
          }}
        >
          {screenTitle}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted,#8a83a0)', fontWeight: 600, marginTop: 2 }}>{screenSub}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onToggleNotif}
          style={{
            position: 'relative',
            width: 44,
            height: 44,
            borderRadius: 13,
            background: 'var(--surface,#fff)',
            border: '1px solid var(--line,rgba(43,36,64,.1))',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface,#fff)')}
        >
          🔔
          {hasUnread && (
            <span
              style={{
                position: 'absolute',
                top: 8,
                right: 9,
                minWidth: 16,
                height: 16,
                padding: '0 4px',
                borderRadius: 9,
                background: 'var(--coral,#f26f63)',
                color: '#fff',
                fontSize: 10,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--surface,#fff)',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onPost}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'var(--coral,#f26f63)',
            color: '#fff',
            border: 'none',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 13.5,
            padding: '0 18px',
            height: 44,
            borderRadius: 13,
            cursor: 'pointer',
            boxShadow: '0 3px 0 rgba(196,74,64,.5)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 1px 0 rgba(196,74,64,.5)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 3px 0 rgba(196,74,64,.5)';
          }}
        >
          <span style={{ fontSize: 16 }}>＋</span> Post update
        </button>

        <button
          onClick={onSignOut}
          style={{
            height: 44,
            borderRadius: 13,
            background: 'var(--surface,#fff)',
            border: '1px solid var(--line,rgba(43,36,64,.1))',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 13,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(43,36,64,.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface,#fff)')}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
