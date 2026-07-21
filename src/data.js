export const themes = {
  bounce: {
    label: 'Bounce',
    display: "'Fredoka', system-ui",
    body: "'Nunito', system-ui",
    accent: '#ffd84c',
    head: 'normal',
  },
  studio: {
    label: 'Studio',
    display: "'Bricolage Grotesque', system-ui",
    body: "'Hanken Grotesk', system-ui",
    accent: '#6562ac',
    head: 'normal',
  },
  zine: {
    label: 'Zine',
    display: "'Instrument Serif', Georgia, serif",
    body: "'Hanken Grotesk', system-ui",
    accent: '#f26f63',
    head: 'italic',
  },
};

export const cssVars = {
  '--bg': '#fdfaf3',
  '--surface': '#ffffff',
  '--ink': '#2b2440',
  '--muted': '#8a83a0',
  '--primary': '#ffd84c',
  '--coral': '#f26f63',
  '--lilac': '#6562ac',
  '--line': 'rgba(43,36,64,.1)',
};

export const intakeSteps = ['areas', 'fears', 'suggest'];

export const goalColorRotation = ['#f26f63', '#6562ac', '#ffd84c'];

// Day the program admin has set as the end of the weekly cycle (0=Sun … 6=Sat). Thursday for now.
export const weekEndDay = 4;

export const fearOptions = [
  'I’ll look silly',
  'I don’t know where to start',
  'No one will care',
  'It won’t be perfect',
  'I’ll run out of time',
  'Impostor-y feelings',
];

export const fieldOptions = [
  'Speaking up',
  'Social & relationships',
  'Trying new things',
  'Asking for help',
  'Leadership',
  'Something else',
];

export const screenTitles = {
  dashboard: ['Home', 'Your headquarters for doing the thing'],
  feed: ['The Feed', 'Cheer each other on — messy progress welcome'],
  goals: ['My Goals', 'Small milestones, big momentum'],
  resources: ['Resources', 'A roadmap so you’re never guessing alone'],
  profile: ['My Profile', 'How your cohort sees you'],
  intake: ['Home', 'Your headquarters for doing the thing'],
  'admin-dashboard': ['Admin Dashboard', 'How your cohort is doing this week'],
  'admin-members': ['Members', 'Invite, approve, and manage your cohort'],
  'admin-meetings': ['Weekly Meetings', 'Run the weekly cycle, week by week'],
  'admin-announcements': ['Announcements', 'Post updates for the whole cohort to see'],
  'admin-settings': ['Settings', 'Semester setup and group preferences'],
};

export const kindMap = {
  try: { label: 'tried something', bg: 'rgba(101,98,172,.13)', fg: '#6562ac' },
  learn: { label: 'learned a lesson', bg: 'rgba(242,111,99,.15)', fg: '#d0554a' },
  win: { label: 'small win 🎉', bg: 'rgba(90,158,120,.15)', fg: '#3f7d58' },
};

export const navBase = [
  { key: 'dashboard', label: 'Home', icon: '◉' },
  { key: 'feed', label: 'The Feed', icon: '✦' },
  { key: 'goals', label: 'My Goals', icon: '◎' },
  { key: 'resources', label: 'Resources', icon: '❉' },
];

export const adminNav = [
  { key: 'admin-dashboard', label: 'Admin Dashboard', icon: '◈' },
  { key: 'admin-members', label: 'Members', icon: '☺' },
  { key: 'admin-meetings', label: 'Weekly Meetings', icon: '▤' },
  { key: 'admin-announcements', label: 'Announcements', icon: '📣' },
  { key: 'admin-settings', label: 'Settings', icon: '⚙' },
];

export const initialPeers = [
  { name: 'Priya N.', initials: 'PN', color: '#f26f63', project: 'This week: cold-emailing a professor', status: 'active' },
  { name: 'Aaliyah R.', initials: 'AR', color: '#6562ac', project: 'Focus: asking for help more', status: 'active' },
  { name: 'Sofia M.', initials: 'SM', color: '#e0994e', project: 'Focus: auditioning for things', status: 'idle' },
  { name: 'Grace K.', initials: 'GK', color: '#5a9e78', project: 'Focus: saying yes to invites', status: 'active' },
  { name: 'Nia J.', initials: 'NJ', color: '#c264a0', project: 'Focus: sharing opinions in class', status: 'idle' },
];

export const reminderTemplates = [
  "Don't forget to submit your challenge!",
  'Meeting starts in 30 minutes.',
  "Reflect on last week's challenge.",
];

export const initialNotifications = [
  { id: 'n1', icon: '✋', bg: 'rgba(242,111,99,.14)', text: 'Grace K. and 4 others high-fived your update', time: '12m ago', unread: true },
  { id: 'n2', icon: '💬', bg: 'rgba(101,98,172,.14)', text: 'Aaliyah commented: "you’ve got this!"', time: '1h ago', unread: true },
  { id: 'n3', icon: '📅', bg: 'rgba(255,216,76,.22)', text: 'Your weekly update is due Friday — got a flop to share?', time: '3h ago', unread: true },
  { id: 'n4', icon: '🎉', bg: 'rgba(90,158,120,.14)', text: 'You completed a challenge: "Ask a question in lecture"', time: 'yesterday', unread: false },
];
