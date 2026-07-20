import { useState } from 'react';

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

export default function Resources({ resources, isAdmin, onAddResource }) {
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [tag, setTag] = useState('Toolkit');
  const [blurb, setBlurb] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    const t = title.trim();
    const s = source.trim();
    const b = blurb.trim();
    if (!t || !s || !b) {
      setError(true);
      return;
    }
    onAddResource(t, s, tag, b);
    setTitle('');
    setSource('');
    setBlurb('');
    setError(false);
  };

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

      {isAdmin && (
        <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 16 }}>Add a resource</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ ...fieldStyle, flex: '1 1 220px' }} />
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" style={{ ...fieldStyle, flex: '1 1 180px' }} />
            <select value={tag} onChange={(e) => setTag(e.target.value)} style={{ ...fieldStyle, flex: 'none' }}>
              <option value="Toolkit">Toolkit</option>
              <option value="Mindset">Mindset</option>
              <option value="Stories">Stories</option>
            </select>
          </div>
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            placeholder="Short description…"
            style={{ ...fieldStyle, width: '100%', minHeight: 60, resize: 'none', marginTop: 10, boxSizing: 'border-box' }}
          />
          {error && <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a', marginTop: 8 }}>Fill in title, source, and description first.</div>}
          <button
            onClick={submit}
            style={{
              marginTop: 10,
              background: 'var(--coral,#f26f63)',
              color: '#fff',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '10px 18px',
              borderRadius: 12,
              cursor: 'pointer',
            }}
          >
            Add resource
          </button>
        </div>
      )}

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
