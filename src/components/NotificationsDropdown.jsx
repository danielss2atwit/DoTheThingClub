export default function NotificationsDropdown({ notifications, onMarkAllRead }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 74,
        right: 30,
        width: 340,
        background: 'var(--surface,#fff)',
        border: '1px solid var(--line,rgba(43,36,64,.1))',
        borderRadius: 18,
        boxShadow: '0 22px 50px -18px rgba(43,36,64,.35)',
        zIndex: 50,
        overflow: 'hidden',
        animation: 'floatin .18s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 18px',
          borderBottom: '1px solid var(--line,rgba(43,36,64,.1))',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 15, fontStyle: 'var(--head-style,normal)' }}>
          Notifications
        </span>
        <button
          onClick={onMarkAllRead}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--lilac,#6562ac)',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Mark all read
        </button>
      </div>
      <div style={{ maxHeight: 340, overflow: 'auto' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              display: 'flex',
              gap: 12,
              padding: '14px 18px',
              borderBottom: '1px solid var(--line,rgba(43,36,64,.06))',
              background: n.unread ? 'rgba(255,216,76,.07)' : 'transparent',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                background: n.bg,
              }}
            >
              {n.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, color: '#2b2440', lineHeight: 1.4 }}>{n.text}</div>
              <div style={{ fontSize: 11, color: 'var(--muted,#8a83a0)', marginTop: 3, fontWeight: 600 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
