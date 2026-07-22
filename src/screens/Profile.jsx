import { useState } from 'react';

const cardStyle = { background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 };

const fieldStyle = {
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 12,
  padding: '10px 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  color: '#2b2440',
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
  width: '100%',
};

const labelStyle = { fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' };

const primaryButtonStyle = {
  border: 'none',
  fontFamily: 'inherit',
  fontWeight: 700,
  fontSize: 13.5,
  padding: '10px 18px',
  borderRadius: 12,
  cursor: 'pointer',
  background: '#6562ac',
  color: '#fff',
};

const ghostButtonStyle = { ...primaryButtonStyle, background: 'rgba(43,36,64,.06)', color: '#5a5470' };

const tagBg = ['var(--primary,#ffd84c)', 'var(--coral,#f26f63)', 'var(--lilac,#6562ac)'];
const tagFg = ['#7a5a00', '#fff', '#fff'];

export default function Profile({ profile, isOwnProfile = true, onUpdateProfile, onBack }) {
  const isNew = isOwnProfile && !profile.bio && !profile.focusTitle && profile.tags.length === 0;
  const [editing, setEditing] = useState(isNew);
  const [nameDraft, setNameDraft] = useState(profile.name);
  const [bioDraft, setBioDraft] = useState(profile.bio);
  const [tagsDraft, setTagsDraft] = useState(profile.tags.join(', '));
  const [focusTitleDraft, setFocusTitleDraft] = useState(profile.focusTitle);
  const [focusBodyDraft, setFocusBodyDraft] = useState(profile.focusBody);

  const startEdit = () => {
    setNameDraft(profile.name);
    setBioDraft(profile.bio);
    setTagsDraft(profile.tags.join(', '));
    setFocusTitleDraft(profile.focusTitle);
    setFocusBodyDraft(profile.focusBody);
    setEditing(true);
  };

  const save = () => {
    const name = nameDraft.trim() || profile.name;
    const tags = tagsDraft
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 3);
    onUpdateProfile({
      name,
      initials: name.slice(0, 2).toUpperCase(),
      bio: bioDraft.trim(),
      tags,
      focusTitle: focusTitleDraft.trim(),
      focusBody: focusBodyDraft.trim(),
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={{ maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={cardStyle}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 19, marginBottom: 4 }}>
            {isNew ? 'Welcome! Set up your profile' : 'Edit your profile'}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginBottom: 18 }}>
            This is how your cohort sees you.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <div style={{ marginTop: 6 }}>
                <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} style={fieldStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Bio</label>
              <div style={{ marginTop: 6 }}>
                <input
                  value={bioDraft}
                  onChange={(e) => setBioDraft(e.target.value)}
                  placeholder="e.g. Junior · Psychology · Cohort 4"
                  style={fieldStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Strengths / focus areas</label>
              <div style={{ marginTop: 6 }}>
                <input
                  value={tagsDraft}
                  onChange={(e) => setTagsDraft(e.target.value)}
                  placeholder="Up to 3, comma-separated — e.g. Public Speaking, Consistency"
                  style={fieldStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>My focus — headline</label>
              <div style={{ marginTop: 6 }}>
                <input
                  value={focusTitleDraft}
                  onChange={(e) => setFocusTitleDraft(e.target.value)}
                  placeholder="e.g. Speaking up & taking up space"
                  style={fieldStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>My focus — details</label>
              <div style={{ marginTop: 6 }}>
                <textarea
                  value={focusBodyDraft}
                  onChange={(e) => setFocusBodyDraft(e.target.value)}
                  placeholder="What are you practicing this semester?"
                  rows={3}
                  style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={save} style={primaryButtonStyle}>Save</button>
            {!isNew && (
              <button onClick={() => setEditing(false)} style={ghostButtonStyle}>Cancel</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{ alignSelf: 'flex-start', border: 'none', background: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 13.5, color: 'var(--lilac,#6562ac)', cursor: 'pointer', padding: 0 }}
        >
          ← Back
        </button>
      )}
      <div style={{ ...cardStyle, display: 'flex', gap: 22, alignItems: 'center' }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: profile.color,
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
          {profile.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 26, fontStyle: 'var(--head-style,normal)' }}>
            {profile.name}
          </div>
          {profile.bio && <div style={{ fontSize: 14.5, color: '#5a5470', marginTop: 3 }}>{profile.bio}</div>}
          {profile.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              {profile.tags.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: tagFg[i % tagFg.length],
                    background: tagBg[i % tagBg.length],
                    padding: '5px 12px',
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {isOwnProfile && (
          <button onClick={startEdit} style={ghostButtonStyle}>Edit</button>
        )}
      </div>

      {(profile.focusTitle || profile.focusBody) && (
        <div style={cardStyle}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' }}>
            My focus
          </div>
          {profile.focusTitle && (
            <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 20, marginTop: 6, fontStyle: 'var(--head-style,normal)' }}>
              {profile.focusTitle}
            </div>
          )}
          {profile.focusBody && (
            <div style={{ fontSize: 14.5, color: '#5a5470', marginTop: 6, lineHeight: 1.5 }}>{profile.focusBody}</div>
          )}
        </div>
      )}
    </div>
  );
}
