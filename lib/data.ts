export const PROFILE = {
  name: 'Hatake Kakashi',
  realName: 'Lohitha Damisetti',
  first: 'LOHITHA',
  last: 'DAMISETTI',
  title: 'KAKASHI',
  subtitle: 'UNMASKED',
  role: 'Full Stack Developer',
  summary:
    'Motivated Full Stack Developer skilled in building scalable applications with React, Node.js and modern backend technologies. Strong in API development, system design and problem solving.',
  email: 'damisettilohitha@gmail.com',
  github: 'https://github.com/lohithadamisetti123',
  linkedin: 'https://www.linkedin.com/in/lohitha-damisetti-2bb36829a',
  resume: '/resume.pdf',
};

export type ProfileId = 'recruiter' | 'developer' | 'hackathon' | 'browsing';
export const VIEWERS: { id: ProfileId; name: string; color: string; icon: 'eye' | 'kunai' | 'leaf' | 'shuriken'; line: string }[] = [
  { id: 'recruiter', name: 'Recruiter', color: '#e50914', icon: 'eye', line: 'Looking for your next full stack hire? You picked the right show.' },
  { id: 'developer', name: 'Developer', color: '#2f6fed', icon: 'kunai', line: 'Fellow developer — the source code of every mission is on GitHub.' },
  { id: 'hackathon', name: 'Hackathon Squad', color: '#f5b301', icon: 'shuriken', line: 'Need a teammate who ships at 3 a.m.? Top 100 at Myntra HackerRamp.' },
  { id: 'browsing', name: 'Just Browsing', color: '#1db954', icon: 'leaf', line: 'Grab some popcorn. The mask comes off in a few scrolls.' },
];

// Subtitles shown while the hero "plays" (keyed by hero scroll progress)
export const SUBTITLES: { from: number; to: number; text: string; sfx?: boolean }[] = [
  { from: 0.05, to: 0.22, text: 'Everyone keeps asking what’s under the mask.' },
  { from: 0.22, to: 0.38, text: 'Fine. Just this once.' },
  { from: 0.38, to: 0.55, text: 'No more missions. No more shadows.' },
  { from: 0.55, to: 0.72, text: 'These days… I ship code.' },
  { from: 0.72, to: 0.905, text: 'Full Stack Developer. Shall we begin?' },
];

export const STATS = [
  { value: 450, suffix: '+', label: 'LeetCode' },
  { value: 500, suffix: '+', label: 'CodeChef' },
  { value: 280, suffix: '+', label: 'GeeksforGeeks' },
  { value: 20, suffix: '+', label: 'HackerRank ★' },
];

export const TOP10 = [
  { name: 'React.js', genre: 'Frontend', hue: 195 },
  { name: 'Node.js', genre: 'Backend', hue: 120 },
  { name: 'System Design', genre: 'Core', hue: 0 },
  { name: 'TypeScript', genre: 'Language', hue: 215 },
  { name: 'MongoDB', genre: 'Database', hue: 140 },
  { name: 'Python', genre: 'Language', hue: 48 },
  { name: 'PostgreSQL', genre: 'Database', hue: 205 },
  { name: 'Docker', genre: 'DevOps', hue: 200 },
  { name: 'Express.js', genre: 'Backend', hue: 30 },
  { name: 'Java', genre: 'Language', hue: 12 },
];

export const SKILL_GENRES = [
  { name: 'Languages', items: ['C++', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { name: 'Frontend', items: ['React.js', 'React Native', 'HTML', 'CSS', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Spring Boot'] },
  { name: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'MongoDB Atlas'] },
  { name: 'Tools', items: ['Docker', 'Git', 'Redis', 'JWT Auth', 'Postman', 'Electron.js'] },
  { name: 'Core', items: ['DSA', 'OOP', 'System Design', 'API Design', 'AI', 'Machine Learning', 'Data Science'] },
];

export const EPISODES = [
  {
    id: 'policyguard',
    ep: 1,
    name: 'PolicyGuard AI',
    tagline: 'The fine print never stood a chance.',
    still: '/stills/masked.jpg',
    tint: '#e50914',
    rank: 'S-Rank',
    match: 98,
    url: 'https://github.com/lohithadamisetti123/PolicyGuard-AI',
    desc: 'An AI-powered platform that analyzes privacy policies and legal contracts across web, desktop and mobile apps, with risk detection, privacy alerts and AI-generated risk scores.',
    genres: ['AI', 'Legal-tech', 'Cross-platform'],
    tech: ['React.js', 'React Native', 'Electron.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'OpenAI API', 'Prompt Engineering', 'NLP', 'Tailwind CSS', 'JWT', 'Docker', 'REST APIs'],
  },
  {
    id: 'heatmap',
    ep: 2,
    name: 'Software Release Risk Heatmap',
    tagline: 'It saw the outage before you did.',
    still: '/stills/face.jpg',
    tint: '#2f6fed',
    rank: 'S-Rank',
    match: 96,
    url: 'https://github.com/lohithadamisetti123/Software-Release-Risk-Heatmap',
    desc: 'A full-stack ML platform that uses Random Forest to classify software releases by risk level, with an interactive heatmap dashboard for real-time risk monitoring across teams and modules.',
    genres: ['Machine Learning', 'Dashboards', 'DevOps'],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'scikit-learn', 'PostgreSQL', 'JWT', 'REST APIs'],
  },
  {
    id: 'starcloset',
    ep: 3,
    name: 'StarCloset – Myntra Bharat AI',
    tagline: 'Head-to-toe. Occasion-ready. On budget.',
    still: '/stills/kunai.jpg',
    tint: '#f5b301',
    rank: 'S-Rank',
    match: 97,
    url: 'https://github.com/lohithadamisetti123/weforshe-starcloset',
    desc: 'An AI fashion platform that turns preferences, occasions and budgets into personalized head-to-toe outfits, with conversational AI, stylist personas and a scalable recommendation engine.',
    genres: ['Gen-AI', 'Fashion', 'Recommendations'],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Go', 'Gin', 'PostgreSQL', 'Redis', 'AI/LLM', 'REST APIs'],
  },
];

export const AWARDS = [
  { laurel: 'OFFICIAL SELECTION', title: 'Top 100 Team', sub: 'Myntra WeForShe HackerRamp 2026' },
  { laurel: 'WINNER', title: 'Department Topper', sub: 'Data Science Department' },
  { laurel: 'BOX OFFICE RECORD', title: '1,250+ Problems', sub: 'LeetCode · CodeChef · GFG' },
];

export const CERTS = [
  { by: 'Cisco · CLA', title: 'Programming Essentials in C/C++', hue: 205 },
  { by: 'Certiport · Pearson', title: 'HTML & CSS', hue: 20 },
  { by: 'Cisco NetAcad', title: 'Python & Intro to Data Science', hue: 50 },
  { by: 'Oracle', title: 'Java Foundations Associate', hue: 0 },
  { by: 'Cisco NetAcad', title: 'JavaScript Essentials 1 & 2', hue: 45 },
  { by: 'Google Cloud', title: 'Career Launchpad – Data Analytics', hue: 215 },
  { by: 'MongoDB', title: 'Certified Associate Developer', hue: 140 },
  { by: 'Microsoft', title: 'GitHub Foundations', hue: 270 },
];

export const SEASONS = [
  {
    label: 'Season 1',
    name: 'The Junior College Arc',
    years: '2021 – 2023',
    episodes: [{ title: 'Intermediate (MPC)', where: 'Sri Chaitanya Junior College, Kakinada', note: 'Scored 90.60%', still: '/stills/pull.jpg' }],
  },
  {
    label: 'Season 2',
    name: 'The Academy Arc',
    years: '2023 – 2027',
    episodes: [{ title: 'B.Tech in Data Science', where: 'Aditya College of Engineering and Technology, Surampalem', note: 'CGPA 9.07 · Department Topper', still: '/stills/vest.jpg' }],
  },
  {
    label: 'Season 3',
    name: 'The Training Arc',
    years: '2026',
    episodes: [
      { title: 'Full Stack Intern', where: 'Technical Hub Pvt Ltd · May – June 2026', note: 'Trained in full stack development with React Native and developed web and mobile applications.', still: '/stills/hand.jpg' },
    ],
  },
];
