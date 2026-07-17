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

export const intakeSteps = ['thing', 'field', 'fears', 'suggest'];

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
