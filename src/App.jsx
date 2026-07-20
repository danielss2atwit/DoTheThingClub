import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NotificationsDropdown from './components/NotificationsDropdown';
import Dashboard from './screens/Dashboard';
import Feed from './screens/Feed';
import Goals from './screens/Goals';
import Resources from './screens/Resources';
import Profile from './screens/Profile';
import AdminDashboard from './screens/AdminDashboard';
import Members from './screens/Members';
import WeeklyMeetings from './screens/WeeklyMeetings';
import Announcements from './screens/Announcements';
import AdminSettings from './screens/AdminSettings';
import IntakeOverlay from './components/IntakeOverlay';
import {
  themes,
  cssVars,
  screenTitles,
  intakeSteps,
  goalColorRotation,
  weekEndDay,
  initialGoals,
  initialWeeklyGoals,
  initialPeers,
  initialPosts,
  initialResources,
  initialNotifications,
  initialMembers,
  initialAnnouncements,
  initialWeeklyCycle,
  initialAdminSettings,
  reminderTemplates,
} from './data';

const resourceTagStyles = {
  Toolkit: { tagBg: '#ffd84c', tagFg: '#7a5a00' },
  Mindset: { tagBg: '#6562ac', tagFg: '#fff' },
  Stories: { tagBg: '#5a9e78', tagFg: '#fff' },
};

const emptyAreaDraft = { category: '', goal: '', why: '' };

function withMilestoneStats(goals) {
  return goals.map((g) => {
    const done = g.milestones.filter((m) => m.done).length;
    const total = g.milestones.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { ...g, done, total, pct };
  });
}

export default function App() {
  const [screen, setScreenState] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [view, setView] = useState('member');

  const [compose, setCompose] = useState('');
  const [composeKind, setComposeKind] = useState('try');
  const [commentDrafts, setCommentDrafts] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [streak] = useState(3);

  const [goals, setGoals] = useState(initialGoals);
  const [weeklyGoals, setWeeklyGoals] = useState(initialWeeklyGoals);
  const [peers] = useState(initialPeers);
  const [posts, setPosts] = useState(initialPosts);
  const [resources, setResources] = useState(initialResources);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [members, setMembers] = useState(initialMembers);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [weeklyCycle, setWeeklyCycle] = useState(initialWeeklyCycle);
  const [adminSettings, setAdminSettings] = useState(initialAdminSettings);

  // intake
  const [intakeStep, setIntakeStep] = useState(0);
  const [areas, setAreas] = useState([]);
  const [areaDraft, setAreaDraft] = useState(emptyAreaDraft);
  const [areaDraftError, setAreaDraftError] = useState(false);
  const [areaCountError, setAreaCountError] = useState(false);
  const [fears, setFears] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggested, setSuggested] = useState([]);

  const setScreen = (s) => {
    setScreenState(s);
    setNotifOpen(false);
  };

  const toggleNotif = () => setNotifOpen((o) => !o);
  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })));

  const goPost = () => {
    setScreenState('feed');
    setNotifOpen(false);
  };
  const goGoals = () => setScreen('goals');
  const goFeed = () => setScreen('feed');
  const goIntake = () => {
    setIntakeStep(0);
    setAreas([]);
    setAreaDraft(emptyAreaDraft);
    setAreaDraftError(false);
    setAreaCountError(false);
    setFears([]);
    setSuggested([]);
    setScreenState('intake');
    setNotifOpen(false);
  };
  const goProfile = () => setScreen('profile');

  const toggleView = () => {
    const nextView = view === 'member' ? 'admin' : 'member';
    setView(nextView);
    setScreen(nextView === 'admin' ? 'admin-dashboard' : 'dashboard');
  };

  // feed
  const onCompose = (e) => setCompose(e.target.value);
  const postUpdate = () => {
    const txt = compose.trim();
    if (!txt) {
      setScreen('feed');
      return;
    }
    const post = {
      id: 'p' + Date.now(),
      author: 'Maya Chen',
      initials: 'MC',
      color: '#6562ac',
      project: 'Speaking up',
      time: 'just now',
      kind: composeKind,
      text: txt,
      hasImg: false,
      highFives: 0,
      hiFived: false,
      comments: [],
    };
    setPosts((ps) => [post, ...ps]);
    setCompose('');
    setScreen('feed');
  };
  const toggleHighFive = (id) =>
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, hiFived: !p.hiFived } : p)));
  const toggleComments = (id) => setOpenComments((oc) => ({ ...oc, [id]: !oc[id] }));
  const setCommentDraft = (id, val) => setCommentDrafts((cd) => ({ ...cd, [id]: val }));
  const addComment = (id) => {
    const val = (commentDrafts[id] || '').trim();
    if (!val) return;
    const c = { author: 'Maya Chen', initials: 'MC', color: '#6562ac', text: val };
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, comments: [...p.comments, c] } : p)));
    setCommentDrafts((cd) => ({ ...cd, [id]: '' }));
    setOpenComments((oc) => ({ ...oc, [id]: true }));
  };

  // goals
  const toggleMilestone = (gid, mid) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id !== gid
          ? g
          : { ...g, milestones: g.milestones.map((m) => (m.id === mid ? { ...m, done: !m.done } : m)) }
      )
    );

  const updateGoal = (gid, title, why) =>
    setGoals((gs) => gs.map((g) => (g.id === gid ? { ...g, title, why } : g)));
  const deleteGoal = (gid) => setGoals((gs) => gs.filter((g) => g.id !== gid));

  const addMilestone = (gid, text) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id !== gid
          ? g
          : { ...g, milestones: [...g.milestones, { id: 'm' + Date.now() + Math.random().toString(36).slice(2, 6), text, done: false }] }
      )
    );
  const updateMilestone = (gid, mid, text) =>
    setGoals((gs) =>
      gs.map((g) => (g.id !== gid ? g : { ...g, milestones: g.milestones.map((m) => (m.id === mid ? { ...m, text } : m)) }))
    );
  const deleteMilestone = (gid, mid) =>
    setGoals((gs) => gs.map((g) => (g.id !== gid ? g : { ...g, milestones: g.milestones.filter((m) => m.id !== mid) })));

  const addWeeklyGoal = (text, why, goalId) => {
    const t = text.trim();
    const w = why.trim();
    if (!t || !w) return false;
    const goal = {
      id: 'w' + Date.now(),
      text: t,
      why: w,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      goalId: goalId || null,
      reflected: false,
      completed: null,
      reflection: '',
    };
    setWeeklyGoals((gs) => [goal, ...gs]);
    return true;
  };

  const reflectWeeklyGoal = (id, completed, reflection) => {
    const r = reflection.trim();
    if (completed === null || !r) return false;
    setWeeklyGoals((gs) => gs.map((g) => (g.id === id ? { ...g, reflected: true, completed, reflection: r } : g)));
    return true;
  };

  // admin — members
  const inviteMember = (name, email) => {
    const initials = name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const member = {
      id: 'u' + Date.now(),
      name,
      initials,
      color: '#8a83a0',
      email,
      project: '',
      status: 'idle',
      memberStatus: 'invited',
      joinedDate: '',
      submittedThisWeek: false,
      goals: [],
      weeklyGoals: [],
    };
    setMembers((ms) => [...ms, member]);
  };
  const updateMember = (id, fields) =>
    setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, ...fields } : m)));
  const approveMember = (id) => updateMember(id, { memberStatus: 'active', status: 'active', joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
  const declineMember = (id) => setMembers((ms) => ms.filter((m) => m.id !== id));
  const markMemberJoined = (id) => updateMember(id, { memberStatus: 'active', status: 'active', joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
  const deactivateMember = (id) => updateMember(id, { memberStatus: 'deactivated', status: 'idle' });
  const reactivateMember = (id) => updateMember(id, { memberStatus: 'active', status: 'active' });
  const removeMember = (id) => setMembers((ms) => ms.filter((m) => m.id !== id));

  // admin — announcements
  const addAnnouncement = (type, title, body) => {
    const a = {
      id: 'an' + Date.now(),
      type,
      title,
      body,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      author: 'Program Lead · Dana',
    };
    setAnnouncements((as) => [a, ...as]);
  };
  const deleteAnnouncement = (id) => setAnnouncements((as) => as.filter((a) => a.id !== id));

  // admin — weekly meetings
  const setMeetingDate = (date) =>
    setWeeklyCycle((wc) => ({ ...wc, currentWeek: { ...wc.currentWeek, meetingDate: date } }));
  const toggleSubmissions = () =>
    setWeeklyCycle((wc) => ({ ...wc, currentWeek: { ...wc.currentWeek, submissionsOpen: !wc.currentWeek.submissionsOpen } }));
  const toggleAttendance = (memberId) =>
    setWeeklyCycle((wc) => {
      const attending = wc.currentWeek.attendance.includes(memberId);
      const attendance = attending
        ? wc.currentWeek.attendance.filter((id) => id !== memberId)
        : [...wc.currentWeek.attendance, memberId];
      return { ...wc, currentWeek: { ...wc.currentWeek, attendance } };
    });
  const toggleSubmitted = (memberId) => {
    const m = members.find((mem) => mem.id === memberId);
    if (m) updateMember(memberId, { submittedThisWeek: !m.submittedThisWeek });
  };
  const archiveCurrentWeek = () => {
    const activeMembers = members.filter((m) => m.memberStatus === 'active');
    const submittedCount = activeMembers.filter((m) => m.submittedThisWeek).length;
    const entry = {
      number: weeklyCycle.currentWeek.number,
      meetingDate: weeklyCycle.currentWeek.meetingDate,
      submittedCount,
      totalCount: activeMembers.length,
    };
    setWeeklyCycle((wc) => ({ ...wc, archive: [entry, ...wc.archive] }));
  };
  const openNewWeek = () => {
    setWeeklyCycle((wc) => ({
      ...wc,
      currentWeek: {
        number: wc.currentWeek.number + 1,
        meetingDate: wc.currentWeek.meetingDate,
        submissionsOpen: true,
        attendance: [],
      },
    }));
    setMembers((ms) => ms.map((m) => (m.memberStatus === 'active' ? { ...m, submittedThisWeek: false } : m)));
  };

  // admin — settings
  const updateAdminSettings = (fields) => setAdminSettings((s) => ({ ...s, ...fields }));

  // admin — notifications
  const sendReminder = (text) => {
    const n = { id: 'n' + Date.now(), icon: '🔔', bg: 'rgba(255,216,76,.22)', text, time: 'just now', unread: true };
    setNotifications((ns) => [n, ...ns]);
  };

  // admin — resources
  const addResource = (title, source, tag, blurb) => {
    const style = resourceTagStyles[tag] || resourceTagStyles.Toolkit;
    const resource = { title, source, tag, tagBg: style.tagBg, tagFg: style.tagFg, blurb };
    setResources((rs) => [resource, ...rs]);
  };

  // intake
  const setAreaCategory = (cat) => setAreaDraft((d) => ({ ...d, category: cat }));
  const onAreaGoalChange = (e) => setAreaDraft((d) => ({ ...d, goal: e.target.value }));
  const onAreaWhyChange = (e) => setAreaDraft((d) => ({ ...d, why: e.target.value }));
  const addArea = () => {
    if (areas.length >= 3) return;
    const { category, goal, why } = areaDraft;
    if (!category || !goal.trim() || !why.trim()) {
      setAreaDraftError(true);
      return;
    }
    const area = { id: 'a' + Date.now(), category, goal: goal.trim(), why: why.trim() };
    setAreas((as) => [...as, area]);
    setAreaDraft(emptyAreaDraft);
    setAreaDraftError(false);
    setAreaCountError(false);
  };
  const removeArea = (id) => setAreas((as) => as.filter((a) => a.id !== id));

  const toggleFear = (f) =>
    setFears((fs) => (fs.includes(f) ? fs.filter((x) => x !== f) : fs.length >= 3 ? fs : [...fs, f]));
  const closeIntake = () => setScreen('dashboard');

  const buildSuggestions = (areasList) =>
    areasList.map((a, i) => {
      const short = a.goal.length > 44 ? a.category.toLowerCase() : a.goal.replace(/\.$/, '');
      return {
        id: a.id,
        title: a.goal.length > 60 ? a.category : a.goal,
        why: a.why,
        barColor: goalColorRotation[i % goalColorRotation.length],
        items: [
          { n: 1, text: `Do the smallest version of “${short}” once this week, even if it’s a little shaky.` },
          { n: 2, text: `Post one honest update in the feed about ${a.category.toLowerCase()} — even "I was terrified" counts.` },
        ],
      };
    });

  const intakeBack = () => {
    if (intakeStep === 0) closeIntake();
    else setIntakeStep((s) => s - 1);
  };
  const intakeNext = () => {
    const stepName = intakeSteps[intakeStep];
    if (stepName === 'areas') {
      if (areas.length < 2) {
        setAreaCountError(true);
        return;
      }
      setAreaCountError(false);
      setIntakeStep((s) => s + 1);
      return;
    }
    if (stepName === 'fears') {
      setIntakeStep((s) => s + 1);
      setSuggestLoading(true);
      setSuggested([]);
      setTimeout(() => {
        setSuggestLoading(false);
        setSuggested(buildSuggestions(areas));
      }, 1100);
      return;
    }
    if (stepName === 'suggest') {
      if (suggestLoading) return;
      const gs = suggested.map((grp) => ({
        id: 'g' + Date.now() + Math.random().toString(36).slice(2, 6),
        title: grp.title,
        why: grp.why,
        barColor: grp.barColor,
        milestones: grp.items.map((it, i) => ({
          id: 'sm' + Date.now() + i + Math.random().toString(36).slice(2, 6),
          text: it.text,
          done: false,
        })),
      }));
      setGoals((gs2) => [...gs2, ...gs]);
      setScreenState('goals');
      setIntakeStep(0);
    }
  };

  const T = themes.bounce;
  const rootStyle = {
    ...cssVars,
    '--font-display': T.display,
    '--font-body': T.body,
    '--accent': T.accent,
    '--head-style': T.head,
    background: '#fdfaf3',
    color: '#2b2440',
    fontFamily: T.body,
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
  };

  const goalsWithStats = withMilestoneStats(goals);
  const totalM = goals.reduce((a, g) => a + g.milestones.length, 0);
  const doneM = goals.reduce((a, g) => a + g.milestones.filter((m) => m.done).length, 0);
  const overallPct = totalM ? Math.round((doneM / totalM) * 100) : 0;
  const ringGrad = `conic-gradient(var(--accent,#ffd84c) ${overallPct * 3.6}deg, rgba(43,36,64,.09) 0deg)`;

  const unreadCount = notifications.filter((n) => n.unread).length;
  const [screenTitle, screenSub] = screenTitles[screen] || screenTitles.dashboard;

  return (
    <div style={rootStyle}>
      <Sidebar screen={screen} view={view} onNav={setScreen} onPost={goPost} onProfile={goProfile} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Topbar
          screenTitle={screenTitle}
          screenSub={screenSub}
          hasUnread={unreadCount > 0}
          unreadCount={unreadCount}
          onToggleNotif={toggleNotif}
          onPost={goPost}
        />

        {notifOpen && <NotificationsDropdown notifications={notifications} onMarkAllRead={markAllRead} />}

        <main style={{ flex: 1, overflow: 'auto', padding: '30px 34px 60px' }}>
          {screen === 'dashboard' && (
            <Dashboard
              streak={streak}
              doneM={doneM}
              totalM={totalM}
              overallLabel={`${overallPct}%`}
              ringGrad={ringGrad}
              goals={goalsWithStats}
              peers={peers}
              announcements={announcements}
              onGoals={goGoals}
              onIntake={goIntake}
              onFeed={goFeed}
              onToggleView={toggleView}
            />
          )}

          {screen === 'feed' && (
            <Feed
              compose={compose}
              onCompose={onCompose}
              composeKind={composeKind}
              onSetComposeKind={setComposeKind}
              onPostUpdate={postUpdate}
              posts={posts}
              openComments={openComments}
              commentDrafts={commentDrafts}
              onToggleHighFive={toggleHighFive}
              onToggleComments={toggleComments}
              onSetCommentDraft={setCommentDraft}
              onAddComment={addComment}
            />
          )}

          {screen === 'goals' && (
            <Goals
              goals={goalsWithStats}
              overallLabel={`${overallPct}%`}
              onToggleMilestone={toggleMilestone}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
              onAddMilestone={addMilestone}
              onUpdateMilestone={updateMilestone}
              onDeleteMilestone={deleteMilestone}
              weeklyGoals={weeklyGoals}
              onAddWeeklyGoal={addWeeklyGoal}
              onReflectWeeklyGoal={reflectWeeklyGoal}
              weekEndDay={weekEndDay}
            />
          )}

          {screen === 'resources' && (
            <Resources resources={resources} isAdmin={view === 'admin'} onAddResource={addResource} />
          )}

          {screen === 'profile' && <Profile />}

          {screen === 'admin-dashboard' && (
            <AdminDashboard
              members={members}
              weeklyCycle={weeklyCycle}
              reminderTemplates={reminderTemplates}
              onSendReminder={sendReminder}
              onToggleView={toggleView}
            />
          )}

          {screen === 'admin-members' && (
            <Members
              members={members}
              onInviteMember={inviteMember}
              onUpdateMember={updateMember}
              onApprove={approveMember}
              onDecline={declineMember}
              onMarkJoined={markMemberJoined}
              onDeactivate={deactivateMember}
              onReactivate={reactivateMember}
              onRemove={removeMember}
            />
          )}

          {screen === 'admin-meetings' && (
            <WeeklyMeetings
              weeklyCycle={weeklyCycle}
              members={members}
              onSetMeetingDate={setMeetingDate}
              onToggleSubmissions={toggleSubmissions}
              onToggleAttendance={toggleAttendance}
              onToggleSubmitted={toggleSubmitted}
              onArchiveWeek={archiveCurrentWeek}
              onOpenNewWeek={openNewWeek}
            />
          )}

          {screen === 'admin-announcements' && (
            <Announcements
              announcements={announcements}
              onAddAnnouncement={addAnnouncement}
              onDeleteAnnouncement={deleteAnnouncement}
            />
          )}

          {screen === 'admin-settings' && (
            <AdminSettings settings={adminSettings} onUpdateSettings={updateAdminSettings} />
          )}
        </main>
      </div>

      {screen === 'intake' && (
        <IntakeOverlay
          step={intakeStep}
          areas={areas}
          areaDraft={areaDraft}
          areaDraftError={areaDraftError}
          areaCountError={areaCountError}
          fears={fears}
          suggestLoading={suggestLoading}
          suggested={suggested}
          onSetAreaCategory={setAreaCategory}
          onAreaGoalChange={onAreaGoalChange}
          onAreaWhyChange={onAreaWhyChange}
          onAddArea={addArea}
          onRemoveArea={removeArea}
          onToggleFear={toggleFear}
          onBack={intakeBack}
          onNext={intakeNext}
          onClose={closeIntake}
        />
      )}
    </div>
  );
}
