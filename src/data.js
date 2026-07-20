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

export const initialWeeklyGoals = [
  {
    id: 'w1',
    text: 'Cold-email a professor I admire and ask for 15 minutes of their time.',
    why: 'I always assume busy people don’t want to be bothered, so I default to never asking. This forces me to ask anyway.',
    date: 'Jul 10',
    goalId: null,
    reflected: true,
    completed: true,
    reflection: 'Did it! They said yes within 10 minutes — way less scary than I built it up to be.',
  },
];

export const initialGoals = [
  {
    id: 'g1',
    title: 'Speak up more',
    why: 'Practice raising your hand and sharing your voice before you feel ready.',
    barColor: '#f26f63',
    milestones: [
      { id: 'm1', text: 'Ask a question in a lecture', done: true },
      { id: 'm2', text: 'Raise your hand before you’re 100% sure of the answer', done: true },
      { id: 'm3', text: 'Share your opinion first in a group project', done: false },
    ],
  },
  {
    id: 'g2',
    title: 'Put yourself out there',
    why: 'Small social risks build the muscle for bigger ones.',
    barColor: '#6562ac',
    milestones: [
      { id: 'm4', text: 'Sit with someone new at lunch', done: true },
      { id: 'm5', text: 'Go to a club meeting alone', done: false },
      { id: 'm6', text: 'Start a conversation with a stranger on campus', done: false },
    ],
  },
  {
    id: 'g3',
    title: 'Get comfortable with flops',
    why: 'Share the messy parts — the point is the rep, not the outcome.',
    barColor: '#ffd84c',
    milestones: [
      { id: 'm7', text: 'Post my first "it didn’t go great" update', done: true },
      { id: 'm8', text: 'Ask for help on something you’d normally push through alone', done: false },
    ],
  },
];

export const initialPeers = [
  { name: 'Priya N.', initials: 'PN', color: '#f26f63', project: 'This week: cold-emailing a professor', status: 'active' },
  { name: 'Aaliyah R.', initials: 'AR', color: '#6562ac', project: 'Focus: asking for help more', status: 'active' },
  { name: 'Sofia M.', initials: 'SM', color: '#e0994e', project: 'Focus: auditioning for things', status: 'idle' },
  { name: 'Grace K.', initials: 'GK', color: '#5a9e78', project: 'Focus: saying yes to invites', status: 'active' },
  { name: 'Nia J.', initials: 'NJ', color: '#c264a0', project: 'Focus: sharing opinions in class', status: 'idle' },
];

// Richer member records for admin features (member management, weekly meetings, dashboard stats).
// `status` mirrors initialPeers' activity dot; `memberStatus` is the admin lifecycle state.
export const initialMembers = [
  {
    id: 'u1',
    name: 'Priya N.',
    initials: 'PN',
    color: '#f26f63',
    email: 'priya.n@example.edu',
    project: 'This week: cold-emailing a professor',
    status: 'active',
    memberStatus: 'active',
    joinedDate: 'Jan 12',
    submittedThisWeek: true,
    goals: [
      { id: 'u1g1', title: 'Speak up more', why: 'Practice sharing my voice before I feel ready.', barColor: '#f26f63', milestones: [
        { id: 'u1m1', text: 'Ask a question in a lecture', done: true },
        { id: 'u1m2', text: 'Share my opinion first in a group project', done: false },
      ] },
    ],
    weeklyGoals: [
      { id: 'u1w1', text: 'Cold-email a professor I admire.', why: 'I default to never asking busy people for time.', date: 'Jul 10', goalId: 'u1g1', reflected: true, completed: true, reflection: 'Did it! Way less scary than expected.' },
    ],
  },
  {
    id: 'u2',
    name: 'Aaliyah R.',
    initials: 'AR',
    color: '#6562ac',
    email: 'aaliyah.r@example.edu',
    project: 'Focus: asking for help more',
    status: 'active',
    memberStatus: 'active',
    joinedDate: 'Jan 12',
    submittedThisWeek: true,
    goals: [
      { id: 'u2g1', title: 'Ask for help', why: 'Stop pushing through things alone.', barColor: '#6562ac', milestones: [
        { id: 'u2m1', text: 'Email a professor for an extension', done: true },
        { id: 'u2m2', text: 'Ask a classmate to study together', done: true },
      ] },
    ],
    weeklyGoals: [
      { id: 'u2w1', text: 'Emailed my professor to ask for an extension.', why: 'Hands were sweating but I did it.', date: 'Jul 10', goalId: 'u2g1', reflected: true, completed: true, reflection: 'She said yes in 10 minutes.' },
    ],
  },
  {
    id: 'u3',
    name: 'Sofia M.',
    initials: 'SM',
    color: '#e0994e',
    email: 'sofia.m@example.edu',
    project: 'Focus: auditioning for things',
    status: 'idle',
    memberStatus: 'active',
    joinedDate: 'Jan 19',
    submittedThisWeek: false,
    goals: [
      { id: 'u3g1', title: 'Put myself out there', why: 'Small social risks build the muscle for bigger ones.', barColor: '#ffd84c', milestones: [
        { id: 'u3m1', text: 'Audition for one thing this semester', done: false },
      ] },
    ],
    weeklyGoals: [],
  },
  {
    id: 'u4',
    name: 'Grace K.',
    initials: 'GK',
    color: '#5a9e78',
    email: 'grace.k@example.edu',
    project: 'Focus: saying yes to invites',
    status: 'active',
    memberStatus: 'active',
    joinedDate: 'Jan 12',
    submittedThisWeek: true,
    goals: [
      { id: 'u4g1', title: 'Say yes more', why: 'Practice showing up even when it feels awkward.', barColor: '#5a9e78', milestones: [
        { id: 'u4m1', text: 'Go to a party where I only know one person', done: true },
      ] },
    ],
    weeklyGoals: [
      { id: 'u4w1', text: 'Said yes to a party where I knew one person.', why: 'I usually stay home when I feel unsure.', date: 'Jul 10', goalId: 'u4g1', reflected: true, completed: true, reflection: 'Stayed two hours, actually had fun.' },
    ],
  },
  {
    id: 'u5',
    name: 'Nia J.',
    initials: 'NJ',
    color: '#c264a0',
    email: 'nia.j@example.edu',
    project: 'Focus: sharing opinions in class',
    status: 'idle',
    memberStatus: 'pending',
    joinedDate: 'Jul 15',
    submittedThisWeek: false,
    goals: [],
    weeklyGoals: [],
  },
  {
    id: 'u6',
    name: 'Devon T.',
    initials: 'DT',
    color: '#5a8fa0',
    email: 'devon.t@example.edu',
    project: '',
    status: 'idle',
    memberStatus: 'pending',
    joinedDate: 'Jul 17',
    submittedThisWeek: false,
    goals: [],
    weeklyGoals: [],
  },
  {
    id: 'u7',
    name: 'Kayla B.',
    initials: 'KB',
    color: '#a0785a',
    email: 'kayla.b@example.edu',
    project: '',
    status: 'idle',
    memberStatus: 'invited',
    joinedDate: '',
    submittedThisWeek: false,
    goals: [],
    weeklyGoals: [],
  },
  {
    id: 'u8',
    name: 'Rina P.',
    initials: 'RP',
    color: '#8a8a8a',
    email: 'rina.p@example.edu',
    project: '',
    status: 'idle',
    memberStatus: 'deactivated',
    joinedDate: 'Feb 2',
    submittedThisWeek: false,
    goals: [],
    weeklyGoals: [],
  },
];

export const initialAnnouncements = [
  {
    id: 'an1',
    type: 'reminder',
    title: "Meeting reminder",
    body: "We meet Thursday at 6pm in the student center — bring your weekly reflection!",
    date: 'Jul 18',
    author: 'Program Lead · Dana',
  },
  {
    id: 'an2',
    type: 'guest-speaker',
    title: 'Guest speaker next week',
    body: "We're hosting an alum from Cohort 1 to talk about turning small risks into a habit. Come with questions!",
    date: 'Jul 16',
    author: 'Program Lead · Dana',
  },
];

export const reminderTemplates = [
  "Don't forget to submit your challenge!",
  'Meeting starts in 30 minutes.',
  "Reflect on last week's challenge.",
];

export const initialWeeklyCycle = {
  currentWeek: {
    number: 4,
    meetingDate: '2026-07-24',
    submissionsOpen: true,
    attendance: [],
  },
  archive: [
    { number: 3, meetingDate: '2026-07-17', submittedCount: 4, totalCount: 5 },
    { number: 2, meetingDate: '2026-07-10', submittedCount: 5, totalCount: 5 },
  ],
};

export const initialAdminSettings = {
  semesterStart: '2026-01-12',
  semesterEnd: '2026-05-08',
  meetingDay: weekEndDay,
  groupName: 'DoTheThingClub',
  groupLogo: '💛',
  reflectionQuestions: [
    'Did you do the thing?',
    'How did it go?',
    'What would you tell a friend about to try the same thing?',
  ],
  privacy: {
    showRealNames: true,
    membersSeeEachOthersGoals: true,
  },
};

export const initialPosts = [
  {
    id: 'p1',
    author: 'Priya N.',
    initials: 'PN',
    color: '#f26f63',
    project: 'Speaking up',
    time: '2h ago',
    kind: 'learn',
    text: 'Okay so I raised my hand to answer in seminar and totally blanked halfway through 😅 professor just smiled and said "take your time." Lesson: nobody\'s keeping score as hard as I think they are.',
    hasImg: false,
    highFives: 12,
    hiFived: false,
    comments: [
      { author: 'Maya Chen', initials: 'MC', color: '#6562ac', text: 'this is such a good reframe!! nobody remembers the blank, they remember you tried' },
    ],
  },
  {
    id: 'p2',
    author: 'Grace K.',
    initials: 'GK',
    color: '#5a9e78',
    project: 'Saying yes',
    time: '5h ago',
    kind: 'win',
    text: 'Said yes to a party where I knew literally one person. Went alone, stayed two hours, actually had fun. Thank you to everyone who told me to just show up 🥹',
    hasImg: true,
    imgLabel: 'photo from the night',
    highFives: 27,
    hiFived: true,
    comments: [],
  },
  {
    id: 'p3',
    author: 'Aaliyah R.',
    initials: 'AR',
    color: '#6562ac',
    project: 'Asking for help',
    time: '1d ago',
    kind: 'try',
    text: 'Emailed my professor to ask for an extension today. Hands were sweating lol but she said yes in 10 minutes. Doing the thing is scary for about 4 seconds and then it\'s just… done?',
    hasImg: false,
    highFives: 19,
    hiFived: false,
    comments: [
      { author: 'Sofia M.', initials: 'SM', color: '#e0994e', text: 'the 4 seconds of scary is SO real' },
    ],
  },
];

export const initialResources = [
  { title: 'Why fear of failure hits women hardest', source: 'Harvard Business Review', tag: 'Mindset', tagBg: '#6562ac', tagFg: '#fff', blurb: 'The research behind why we hesitate longer — and how to shrink that gap.' },
  { title: 'The 4-second rule for scary asks', source: 'Program Lead · Dana', tag: 'Toolkit', tagBg: '#ffd84c', tagFg: '#7a5a00', blurb: 'A trick for doing the brave thing before your brain can talk you out of it.' },
  { title: 'Reframing rejection as data, not verdict', source: 'Psychology Today', tag: 'Mindset', tagBg: '#6562ac', tagFg: '#fff', blurb: 'A "no" tells you something useful — it doesn’t tell you your worth.' },
  { title: 'Scripts for speaking up in class', source: 'Curated list', tag: 'Toolkit', tagBg: '#ffd84c', tagFg: '#7a5a00', blurb: 'Simple sentence starters for when your hand won’t go up.' },
  { title: 'Near-peer stories: "the time I embarrassed myself"', source: 'DoTheThingClub alums', tag: 'Stories', tagBg: '#5a9e78', tagFg: '#fff', blurb: 'Honest debriefs from women one year ahead of you.' },
  { title: 'How to ask for help without over-explaining', source: 'Program Lead · Dana', tag: 'Toolkit', tagBg: '#ffd84c', tagFg: '#7a5a00', blurb: 'A short template for the email or DM you keep drafting and deleting.' },
];

export const initialNotifications = [
  { id: 'n1', icon: '✋', bg: 'rgba(242,111,99,.14)', text: 'Grace K. and 4 others high-fived your update', time: '12m ago', unread: true },
  { id: 'n2', icon: '💬', bg: 'rgba(101,98,172,.14)', text: 'Aaliyah commented: "you’ve got this!"', time: '1h ago', unread: true },
  { id: 'n3', icon: '📅', bg: 'rgba(255,216,76,.22)', text: 'Your weekly update is due Friday — got a flop to share?', time: '3h ago', unread: true },
  { id: 'n4', icon: '🎉', bg: 'rgba(90,158,120,.14)', text: 'You completed a challenge: "Ask a question in lecture"', time: 'yesterday', unread: false },
];
