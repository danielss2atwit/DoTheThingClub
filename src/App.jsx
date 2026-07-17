import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NotificationsDropdown from './components/NotificationsDropdown';
import Dashboard from './screens/Dashboard';
import Feed from './screens/Feed';
import Goals from './screens/Goals';
import Resources from './screens/Resources';
import Profile from './screens/Profile';
import IntakeOverlay from './components/IntakeOverlay';
import {
  themes,
  cssVars,
  screenTitles,
  initialGoals,
  initialWeeklyGoals,
  initialPeers,
  initialPosts,
  initialResources,
  initialNotifications,
} from './data';

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

  const [compose, setCompose] = useState('');
  const [composeKind, setComposeKind] = useState('try');
  const [commentDrafts, setCommentDrafts] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [streak] = useState(3);

  const [goals, setGoals] = useState(initialGoals);
  const [weeklyGoals, setWeeklyGoals] = useState(initialWeeklyGoals);
  const [peers] = useState(initialPeers);
  const [posts, setPosts] = useState(initialPosts);
  const [resources] = useState(initialResources);
  const [notifications, setNotifications] = useState(initialNotifications);

  // intake
  const [intakeStep, setIntakeStep] = useState(0);
  const [intakeText, setIntakeText] = useState('');
  const [intakeField, setIntakeField] = useState('');
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
    setScreenState('intake');
    setNotifOpen(false);
  };
  const goProfile = () => setScreen('profile');

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

  const addWeeklyGoal = (text, why) => {
    const t = text.trim();
    const w = why.trim();
    if (!t || !w) return false;
    const goal = {
      id: 'w' + Date.now(),
      text: t,
      why: w,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setWeeklyGoals((gs) => [goal, ...gs]);
    return true;
  };

  // intake
  const onIntakeText = (e) => setIntakeText(e.target.value);
  const toggleFear = (f) =>
    setFears((fs) => (fs.includes(f) ? fs.filter((x) => x !== f) : fs.length >= 3 ? fs : [...fs, f]));
  const closeIntake = () => setScreen('dashboard');

  const buildSuggestions = () => {
    const thing = (intakeText || 'your idea').trim().replace(/\.$/, '');
    const short = thing.length > 44 ? 'your idea' : thing;
    return [
      { n: 1, text: `Tell 3 friends you’re working on ${short} — just to hear yourself say it out loud.` },
      { n: 2, text: 'Do the smallest version of it once this week, even if it’s a little shaky.' },
      { n: 3, text: 'Post one honest update in the feed — even "I was terrified" counts.' },
    ];
  };

  const intakeBack = () => {
    if (intakeStep === 0) closeIntake();
    else setIntakeStep((s) => s - 1);
  };
  const intakeNext = () => {
    if (intakeStep < 2) {
      setIntakeStep((s) => s + 1);
      return;
    }
    if (intakeStep === 2) {
      setIntakeStep(3);
      setSuggestLoading(true);
      setSuggested([]);
      setTimeout(() => {
        setSuggestLoading(false);
        setSuggested(buildSuggestions());
      }, 1100);
      return;
    }
    if (intakeStep === 3) {
      const ms = suggested.map((s, i) => ({ id: 'sm' + Date.now() + i, text: s.text, done: false }));
      const g = {
        id: 'g' + Date.now(),
        title: 'My first steps',
        why: 'Auto-drafted from your intake — edit as you go.',
        barColor: '#f26f63',
        milestones: ms,
      };
      setGoals((gs) => [...gs, g]);
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
      <Sidebar screen={screen} onNav={setScreen} onPost={goPost} onProfile={goProfile} />

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
              onGoals={goGoals}
              onIntake={goIntake}
              onFeed={goFeed}
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
              weeklyGoals={weeklyGoals}
              onAddWeeklyGoal={addWeeklyGoal}
            />
          )}

          {screen === 'resources' && <Resources resources={resources} />}

          {screen === 'profile' && <Profile />}
        </main>
      </div>

      {screen === 'intake' && (
        <IntakeOverlay
          step={intakeStep}
          intakeText={intakeText}
          intakeField={intakeField}
          fears={fears}
          suggestLoading={suggestLoading}
          suggested={suggested}
          onIntakeText={onIntakeText}
          onSetField={setIntakeField}
          onToggleFear={toggleFear}
          onBack={intakeBack}
          onNext={intakeNext}
          onClose={closeIntake}
        />
      )}
    </div>
  );
}
