const typeMeta = {
  reminder: { icon: '⏰', label: 'Reminder', bg: 'rgba(255,216,76,.22)', fg: '#7a5a00' },
  announcement: { icon: '📣', label: 'Announcement', bg: 'rgba(101,98,172,.14)', fg: '#6562ac' },
  event: { icon: '📅', label: 'Event', bg: 'rgba(242,111,99,.14)', fg: '#d0554a' },
  resource: { icon: '📚', label: 'Resource', bg: 'rgba(90,158,120,.15)', fg: '#3f7d58' },
  'guest-speaker': { icon: '🎤', label: 'Guest speaker', bg: 'rgba(101,98,172,.14)', fg: '#6562ac' },
};

export default function AnnouncementCard({ announcement: a, onDelete }) {
  const meta = typeMeta[a.type] || typeMeta.announcement;

  return (
    <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 18, padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flex: 'none' }}>
          {meta.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.02em', textTransform: 'uppercase', color: meta.fg, background: meta.bg, padding: '3px 9px', borderRadius: 8 }}>
              {meta.label}
            </span>
            <span style={{ fontSize: 11.5, color: 'var(--muted,#8a83a0)', fontWeight: 700 }}>{a.date}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 16, marginTop: 6 }}>{a.title}</div>
          <div style={{ fontSize: 13.5, color: '#5a5470', marginTop: 4, lineHeight: 1.5 }}>{a.body}</div>
          <div style={{ fontSize: 12, color: 'var(--muted,#8a83a0)', fontWeight: 700, marginTop: 8 }}>{a.author}</div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(a.id)}
            title="Delete announcement"
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              border: 'none',
              background: 'rgba(43,36,64,.06)',
              cursor: 'pointer',
              fontSize: 12,
              color: '#5a5470',
              flex: 'none',
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
