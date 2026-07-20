import { useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';

const typeOptions = [
  { value: 'reminder', label: 'Meeting reminder' },
  { value: 'announcement', label: 'Weekly announcement' },
  { value: 'event', label: 'Event info' },
  { value: 'resource', label: 'Resource' },
  { value: 'guest-speaker', label: 'Guest speaker' },
];

const fieldStyle = {
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '10px 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

export default function Announcements({ announcements, onAddAnnouncement, onDeleteAnnouncement }) {
  const [type, setType] = useState('announcement');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t || !b) {
      setError(true);
      return;
    }
    onAddAnnouncement(type, t, b);
    setTitle('');
    setBody('');
    setError(false);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17 }}>Post an announcement</div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ ...fieldStyle, alignSelf: 'flex-start' }}>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={fieldStyle} />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What do you want your cohort to know?"
            style={{ ...fieldStyle, minHeight: 80, resize: 'none', lineHeight: 1.5 }}
          />
          {error && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>Add a title and message before posting.</div>
          )}
          <button
            onClick={submit}
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
            }}
          >
            Post to cohort →
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} onDelete={onDeleteAnnouncement} />
        ))}
      </div>
    </div>
  );
}
