import { useState } from 'react';

const textareaStyle = {
  marginTop: 6,
  width: '100%',
  minHeight: 60,
  resize: 'none',
  border: '1.5px solid var(--line,rgba(43,36,64,.14))',
  borderRadius: 14,
  padding: '12px 14px',
  fontFamily: 'inherit',
  fontSize: 14.5,
  color: '#2b2440',
  lineHeight: 1.5,
  outline: 'none',
  background: 'var(--bg,#fdfaf3)',
};

const smallLabelStyle = { fontSize: 12, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase' };

const primaryButtonStyle = {
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
  boxShadow: '0 3px 0 rgba(196,74,64,.5)',
};

function daysUntilWeekEnd(weekEndDay) {
  const today = new Date().getDay();
  let diff = weekEndDay - today;
  if (diff < 0) diff += 7;
  return diff;
}

function choiceButtonStyle(on) {
  return {
    border: `2px solid ${on ? '#f26f63' : 'rgba(43,36,64,.12)'}`,
    fontFamily: 'inherit',
    fontWeight: 700,
    fontSize: 14,
    padding: '10px 16px',
    borderRadius: 14,
    cursor: 'pointer',
    background: on ? 'rgba(242,111,99,.12)' : 'transparent',
    color: on ? '#d0554a' : '#43405a',
  };
}

export default function WeeklyGoalBanner({ goals, activeGoal, weekEndDay, onAddWeeklyGoal, onReflectWeeklyGoal }) {
  const [goalText, setGoalText] = useState('');
  const [goalWhy, setGoalWhy] = useState('');
  const [linkedGoalId, setLinkedGoalId] = useState(null);
  const [showError, setShowError] = useState(false);

  const [completedChoice, setCompletedChoice] = useState(null);
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionError, setReflectionError] = useState(false);

  const goalTitleFor = (gid) => {
    if (!gid) return 'General';
    const g = goals.find((x) => x.id === gid);
    return g ? g.title : 'General';
  };

  const submitWeeklyGoal = () => {
    const ok = onAddWeeklyGoal(goalText, goalWhy, linkedGoalId);
    if (!ok) {
      setShowError(true);
      return;
    }
    setGoalText('');
    setGoalWhy('');
    setLinkedGoalId(null);
    setShowError(false);
  };

  const submitReflection = () => {
    const ok = onReflectWeeklyGoal(activeGoal.id, completedChoice, reflectionText);
    if (!ok) {
      setReflectionError(true);
      return;
    }
    setCompletedChoice(null);
    setReflectionText('');
    setReflectionError(false);
  };

  const cardStyle = {
    background: 'var(--surface,#fff)',
    border: '1px solid var(--line,rgba(43,36,64,.1))',
    borderRadius: 22,
    padding: '22px 26px',
  };

  // No active goal yet — show the picker so the user can post this week's goal.
  if (!activeGoal) {
    return (
      <div style={cardStyle}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 19, fontStyle: 'var(--head-style,normal)' }}>
          Post this week&rsquo;s brave goal
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--muted,#8a83a0)', marginTop: 4, lineHeight: 1.45 }}>
          Pick one thing that pushes you past comfortable — and name why it counts as a stretch for you.
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ ...smallLabelStyle, color: 'var(--lilac,#6562ac)' }}>Which goal is this for?</label>
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[{ id: null, title: 'General' }, ...goals].map((g) => {
                const on = linkedGoalId === g.id;
                return (
                  <button
                    key={g.id ?? 'general'}
                    onClick={() => setLinkedGoalId(g.id)}
                    style={{
                      border: 'none',
                      fontFamily: 'inherit',
                      fontWeight: 700,
                      fontSize: 13,
                      padding: '9px 15px',
                      borderRadius: 13,
                      cursor: 'pointer',
                      background: on ? '#6562ac' : 'rgba(43,36,64,.05)',
                      color: on ? '#fff' : '#43405a',
                    }}
                  >
                    {g.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ ...smallLabelStyle, color: 'var(--lilac,#6562ac)' }}>This week&rsquo;s goal</label>
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="e.g. Ask a question during the team meeting instead of staying quiet…"
              style={textareaStyle}
            />
          </div>

          <div>
            <label style={{ ...smallLabelStyle, color: 'var(--coral,#f26f63)' }}>Why is this out of your comfort zone?</label>
            <textarea
              value={goalWhy}
              onChange={(e) => setGoalWhy(e.target.value)}
              placeholder="e.g. I usually stay quiet in meetings because I'm scared my question will sound obvious…"
              style={textareaStyle}
            />
          </div>

          {showError && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>
              Add both a goal and why it&rsquo;s a stretch for you before posting.
            </div>
          )}

          <button
            onClick={submitWeeklyGoal}
            style={primaryButtonStyle}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 1px 0 rgba(196,74,64,.5)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 3px 0 rgba(196,74,64,.5)';
            }}
          >
            Post my weekly goal →
          </button>
        </div>
      </div>
    );
  }

  const isEndOfWeek = daysUntilWeekEnd(weekEndDay) === 0;

  // End of week — reflect on the goal before picking a new one.
  if (isEndOfWeek) {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.02em', textTransform: 'uppercase', color: 'var(--coral,#f26f63)' }}>
          End of week — time to reflect
        </div>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 18, marginTop: 6, lineHeight: 1.3, fontStyle: 'var(--head-style,normal)' }}>
          This week: {activeGoal.text}
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ ...smallLabelStyle, color: 'var(--lilac,#6562ac)' }}>Did you do the thing?</label>
            <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
              <button onClick={() => setCompletedChoice(true)} style={choiceButtonStyle(completedChoice === true)}>
                ✓ Yes, I did it
              </button>
              <button onClick={() => setCompletedChoice(false)} style={choiceButtonStyle(completedChoice === false)}>
                Not this time
              </button>
            </div>
          </div>

          <div>
            <label style={{ ...smallLabelStyle, color: 'var(--coral,#f26f63)' }}>How did it go?</label>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="e.g. It was scary for about 4 seconds and then it was fine…"
              style={textareaStyle}
            />
          </div>

          {reflectionError && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#d0554a' }}>
              Pick yes or no and share a quick reflection before continuing.
            </div>
          )}

          <button
            onClick={submitReflection}
            style={primaryButtonStyle}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 1px 0 rgba(196,74,64,.5)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 3px 0 rgba(196,74,64,.5)';
            }}
          >
            Save reflection &amp; pick next week&rsquo;s goal →
          </button>
        </div>
      </div>
    );
  }

  // Mid-week — read-only view of the active goal with a countdown.
  const daysLeft = daysUntilWeekEnd(weekEndDay);
  return (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '.02em',
            textTransform: 'uppercase',
            color: 'var(--lilac,#6562ac)',
            background: 'rgba(101,98,172,.12)',
            borderRadius: 8,
            padding: '3px 8px',
            marginBottom: 8,
          }}
        >
          {goalTitleFor(activeGoal.goalId)}
        </div>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 18, lineHeight: 1.3, fontStyle: 'var(--head-style,normal)' }}>
          {activeGoal.text}
        </div>
        <div style={{ fontSize: 13, color: 'var(--coral,#f26f63)', fontWeight: 600, marginTop: 6, lineHeight: 1.45 }}>
          Why it&rsquo;s a stretch: {activeGoal.why}
        </div>
      </div>
      <div style={{ textAlign: 'center', flex: 'none' }}>
        <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 34, lineHeight: 1, color: 'var(--lilac,#6562ac)', fontStyle: 'var(--head-style,normal)' }}>
          {daysLeft}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--muted,#8a83a0)', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {daysLeft === 1 ? 'day left' : 'days left'}
        </div>
      </div>
    </div>
  );
}
