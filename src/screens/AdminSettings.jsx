import { useState } from 'react';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

const labelStyle = { fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--lilac,#6562ac)' };

const cardStyle = { background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 };

export default function AdminSettings({ settings, onUpdateSettings }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const setField = (key, value) => onUpdateSettings({ [key]: value });
  const setPrivacy = (key, value) => onUpdateSettings({ privacy: { ...settings.privacy, [key]: value } });

  const addQuestion = () => {
    const q = newQuestion.trim();
    if (!q) return;
    onUpdateSettings({ reflectionQuestions: [...settings.reflectionQuestions, q] });
    setNewQuestion('');
  };
  const startEditQuestion = (i) => {
    setEditingIndex(i);
    setEditingText(settings.reflectionQuestions[i]);
  };
  const saveEditQuestion = () => {
    const q = editingText.trim();
    if (!q) return;
    const next = settings.reflectionQuestions.map((existing, i) => (i === editingIndex ? q : existing));
    onUpdateSettings({ reflectionQuestions: next });
    setEditingIndex(null);
  };
  const deleteQuestion = (i) => {
    onUpdateSettings({ reflectionQuestions: settings.reflectionQuestions.filter((_, idx) => idx !== i) });
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={cardStyle}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Semester</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <label style={labelStyle}>Start date</label>
            <div style={{ marginTop: 6 }}>
              <input type="date" value={settings.semesterStart} onChange={(e) => setField('semesterStart', e.target.value)} style={fieldStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>End date</label>
            <div style={{ marginTop: 6 }}>
              <input type="date" value={settings.semesterEnd} onChange={(e) => setField('semesterEnd', e.target.value)} style={fieldStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Weekly meeting day</label>
            <div style={{ marginTop: 6 }}>
              <select value={settings.meetingDay} onChange={(e) => setField('meetingDay', Number(e.target.value))} style={fieldStyle}>
                {dayNames.map((d, i) => (
                  <option key={d} value={i}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Group</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px' }}>
            <label style={labelStyle}>Group name</label>
            <div style={{ marginTop: 6 }}>
              <input value={settings.groupName} onChange={(e) => setField('groupName', e.target.value)} style={{ ...fieldStyle, width: '100%' }} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Logo (emoji)</label>
            <div style={{ marginTop: 6 }}>
              <input value={settings.groupLogo} onChange={(e) => setField('groupLogo', e.target.value)} style={{ ...fieldStyle, width: 70, textAlign: 'center', fontSize: 18 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Reflection questions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {settings.reflectionQuestions.map((q, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {editingIndex === i ? (
                <>
                  <input
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEditQuestion()}
                    style={{ ...fieldStyle, flex: 1 }}
                  />
                  <button onClick={saveEditQuestion} style={{ background: 'rgba(43,36,64,.06)', border: 'none', borderRadius: 8, width: 28, height: 28, cursor: 'pointer' }}>✓</button>
                  <button onClick={() => setEditingIndex(null)} style={{ background: 'rgba(43,36,64,.06)', border: 'none', borderRadius: 8, width: 28, height: 28, cursor: 'pointer' }}>✕</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: 14, color: '#33304a', fontWeight: 600 }}>{q}</span>
                  <button onClick={() => startEditQuestion(i)} style={{ background: 'rgba(43,36,64,.06)', border: 'none', borderRadius: 8, width: 28, height: 28, cursor: 'pointer' }}>✎</button>
                  <button onClick={() => deleteQuestion(i)} style={{ background: 'rgba(43,36,64,.06)', border: 'none', borderRadius: 8, width: 28, height: 28, cursor: 'pointer' }}>✕</button>
                </>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
              placeholder="Add a reflection question…"
              style={{ ...fieldStyle, flex: 1, borderStyle: 'dashed' }}
            />
            <button
              onClick={addQuestion}
              style={{ background: 'rgba(101,98,172,.12)', color: 'var(--lilac,#6562ac)', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: 13.5, padding: '10px 16px', borderRadius: 13, cursor: 'pointer' }}
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Privacy</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#33304a', cursor: 'pointer' }}>
            <input type="checkbox" checked={settings.privacy.showRealNames} onChange={(e) => setPrivacy('showRealNames', e.target.checked)} />
            Show members&rsquo; real names (instead of initials only)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#33304a', cursor: 'pointer' }}>
            <input type="checkbox" checked={settings.privacy.membersSeeEachOthersGoals} onChange={(e) => setPrivacy('membersSeeEachOthersGoals', e.target.checked)} />
            Members can see each other&rsquo;s semester goals
          </label>
        </div>
      </div>
    </div>
  );
}
