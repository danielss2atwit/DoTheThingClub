import WeeklyGoalBanner from '../components/WeeklyGoalBanner';
import GoalCard from '../components/GoalCard';

export default function Goals({
  goals,
  overallLabel,
  onToggleMilestone,
  onUpdateGoal,
  onDeleteGoal,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  weeklyGoals,
  onAddWeeklyGoal,
  onReflectWeeklyGoal,
  weekEndDay,
}) {
  const activeGoal = weeklyGoals.find((wg) => !wg.reflected) || null;
  const pastGoals = weeklyGoals.filter((wg) => wg.reflected);

  const goalTitleFor = (gid) => {
    if (!gid) return 'General';
    const g = goals.find((x) => x.id === gid);
    return g ? g.title : 'General';
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--lilac,#6562ac), #7f7cc4)',
          borderRadius: 22,
          padding: '24px 26px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 22, fontStyle: 'var(--head-style,normal)' }}>
            Your 3 challenge areas for Cohort 4
          </div>
          <div style={{ fontSize: 14, opacity: 0.9, marginTop: 5 }}>
            Small, low-stakes, doable. Check one off and it shows up on your profile.
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 'none' }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 38, lineHeight: 1, fontStyle: 'var(--head-style,normal)' }}>
            {overallLabel}
          </div>
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700 }}>complete</div>
        </div>
      </div>

      <WeeklyGoalBanner
        goals={goals}
        activeGoal={activeGoal}
        weekEndDay={weekEndDay}
        onAddWeeklyGoal={onAddWeeklyGoal}
        onReflectWeeklyGoal={onReflectWeeklyGoal}
      />

      {pastGoals.length > 0 && (
        <div style={{ background: 'var(--surface,#fff)', border: '1px solid var(--line,rgba(43,36,64,.1))', borderRadius: 20, padding: 22 }}>
          <div style={{ fontFamily: 'var(--font-display,\'Fredoka\')', fontWeight: 700, fontSize: 17, fontStyle: 'var(--head-style,normal)' }}>
            Past weekly goals
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pastGoals.map((wg) => (
              <div
                key={wg.id}
                style={{
                  background: 'var(--bg,#fdfaf3)',
                  border: '1px solid var(--line,rgba(43,36,64,.1))',
                  borderRadius: 15,
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#2b2440', lineHeight: 1.4 }}>{wg.text}</div>
                  <span style={{ fontSize: 11.5, color: 'var(--muted,#8a83a0)', fontWeight: 700, flex: 'none' }}>{wg.date}</span>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '.02em',
                    textTransform: 'uppercase',
                    color: 'var(--lilac,#6562ac)',
                    background: 'rgba(101,98,172,.12)',
                    borderRadius: 8,
                    padding: '3px 8px',
                  }}
                >
                  {goalTitleFor(wg.goalId)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--coral,#f26f63)', fontWeight: 600, marginTop: 6, lineHeight: 1.45 }}>
                  Why it&rsquo;s a stretch: {wg.why}
                </div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed rgba(43,36,64,.15)' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: wg.completed ? '#3f7d58' : '#8a83a0' }}>
                    {wg.completed ? '✓ Completed' : 'Not completed'}
                  </div>
                  {wg.reflection && (
                    <div style={{ fontSize: 13, color: '#33304a', marginTop: 4, lineHeight: 1.45 }}>{wg.reflection}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {goals.map((g) => (
        <GoalCard
          key={g.id}
          goal={g}
          onToggleMilestone={onToggleMilestone}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          onAddMilestone={onAddMilestone}
          onUpdateMilestone={onUpdateMilestone}
          onDeleteMilestone={onDeleteMilestone}
        />
      ))}
    </div>
  );
}
