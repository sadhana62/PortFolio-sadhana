/*
  All of the site's words live in this one file. Edit freely.

  Anything in [square brackets] is a placeholder: the site shows it with a dashed
  outline so it's obvious it still needs your words. Replace it, or set the field
  to an empty string '' to hide it.

  Everything here comes from the previous version of the site. Nothing was invented.
*/

export const site = {
  // Used for the browser tab, search results and social previews (copied into index.html at build).
  title: 'Sadhana Shrivastava — Software Engineer',
  description:
    'Full-stack engineer and AI integrator. 2+ years building AI-powered features on a WebRTC video platform. MCA at JNU.',
  // The full address the site lives at. Change it if you deploy somewhere else (e.g. your Vercel URL).
  url: 'https://sadhana62.github.io/PortFolio-sadhana/',
}

export const hero = {
  name: 'Sadhana',
  fullName: 'Sadhana Shrivastava',
  role: 'Full-Stack Engineer & AI Integrator',
  location: '',

  // Short intro under your name. From the About section, in your words.
  intro: "I'm a full-stack developer with **2+ years of production experience** building AI-powered features on a WebRTC-based communication platform at **EnableX**.",
  photo: 'me.webp',
  photoFallback: 'me.jpg',
  photoAlt: 'Portrait of Sadhana Shrivastava',
  // Leave resumeUrl empty to hide the résumé button. Put your PDF in /public and write e.g. 'resume.pdf'.
  resumeUrl: '',
}

export const about = {
  title: 'Full-Stack Engineer & AI Integrator',
  paragraphs: [
    "I'm a full-stack developer with **2+ years of production experience** building AI-powered features on a WebRTC-based communication platform at **EnableX**.",
    'I have a deep interest in shipping AI capability inside real products (offensive-language detection, meeting summarization, facial verification) and in Data Structures & Algorithms. Currently pursuing my MCA at JNU while contributing to open-source projects.',
  ],
  // Optional: a line or two about you outside of code. Leave empty to hide it.
  personalNote: '',
  focus: ['WebRTC', 'React', 'Node.js', 'AI/ML', 'Full Stack'],
  stats: [
    { value: '2+', label: 'Years production experience' },
    { value: '8.63', label: 'CGPA at JNU (MCA)' },
    { value: '9.5', label: 'CGPA at DU (B.Sc.)' },
    { value: '10+', label: 'Technologies mastered' },
  ],
}

/*
  Each project has a case study page (open it with "Read the story").
  Fill in the [bracketed] parts in your own words. Add screenshots by putting images in /public
  and listing them, e.g. screenshots: [{ src: 'mindspace-1.png', alt: 'Mood tracker screen' }].
*/
export const projects = [
  {
    name: 'MindSpace',
    slug: 'mindspace',
    category: 'Mental Health',
    badge: 'Mumbai Hacks · Top 100 of 3,000+ teams',
    what: 'A full-stack mental well-being platform with mood tracking, guided self-assessments, an NLP-powered chatbot, and progress visualization.',
    stack: ['React.js', 'Django', 'Python', 'NLP'],
    links: [{ label: 'Source code', href: 'https://github.com/sadhana62' }],
    caseStudy: {
      role: '[Your role: what you built yourself]',
      timeline: '[When, and how long: e.g. a 36-hour hackathon]',
      team: '[Team size]',
      why: '[Why you built it: the problem you saw]',
      built: ['Mood tracking', 'Guided self-assessments', 'An NLP-powered chatbot', 'Progress visualization'],
      hard: '[The hardest problem you hit, and how you solved it]',
      outcome: 'Ranked in the Top 100 among 3,000+ teams at Mumbai Hacks.',
      learned: '[What you learned, or what you would do next]',
      screenshots: [],
    },
    doodle: 'flower',
  },
  {
    name: 'Smart Attendance System',
    slug: 'smart-attendance',
    category: 'EdTech',
    badge: 'Smart India Hackathon',
    what: 'Multi-role school management with real-time facial recognition using DeepFace, reducing manual attendance time by 20%.',
    stack: ['React.js', 'DeepFace', 'Python'],
    links: [{ label: 'Source code', href: 'https://github.com/sadhana62' }],
    caseStudy: {
      role: '[Your role: what you built yourself]',
      timeline: '[When, and how long]',
      team: '[Team size]',
      why: '[Why you built it: the problem you saw]',
      built: ['Multi-role school management', 'Real-time facial recognition using DeepFace'],
      hard: '[The hardest problem you hit, and how you solved it]',
      outcome: 'Reduced manual attendance time by 20%. Built for Smart India Hackathon.',
      learned: '[What you learned, or what you would do next]',
      screenshots: [],
    },
    doodle: 'star',
  },
  {
    name: 'URL Shortener',
    slug: 'url-shortener',
    category: 'Backend / Distributed Systems',
    badge: '',
    what: 'Built to relearn distributed-systems fundamentals: Snowflake-style ID generation, Redis cache-aside lookups, sliding-window rate limiting, and async batched click analytics.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    links: [{ label: 'Source code', href: 'https://github.com/sadhana62' }],
    caseStudy: {
      role: '[Your role: e.g. solo project]',
      timeline: '[When, and how long]',
      team: '[Team size]',
      why: 'To relearn distributed-systems fundamentals.',
      built: ['Snowflake-style ID generation', 'Redis cache-aside lookups', 'Sliding-window rate limiting', 'Async batched click analytics'],
      hard: '[The hardest problem you hit, and how you solved it]',
      outcome: '[A result you measured, e.g. requests per second or latency]',
      learned: '[What you learned, or what you would do next]',
      screenshots: [],
    },
    doodle: 'spark',
  },
  {
    name: 'Campus Laundry App',
    slug: 'campus-laundry',
    category: 'Campus Utility · Full Stack',
    badge: '',
    what: 'An order-tracking app with a full state machine (placed → delivered) and live GPS tracking via Socket.io, built on Flutter, FastAPI, and React.',
    stack: ['Flutter', 'FastAPI', 'React', 'Socket.io'],
    links: [{ label: 'Source code', href: 'https://github.com/sadhana62' }],
    caseStudy: {
      role: '[Your role: what you built yourself]',
      timeline: '[When, and how long]',
      team: '[Team size]',
      why: '[Why you built it: the problem you saw on campus]',
      built: ['A full order state machine (placed → delivered)', 'Live GPS tracking via Socket.io', 'Built on Flutter, FastAPI and React'],
      hard: '[The hardest problem you hit, and how you solved it]',
      outcome: '[A result: who used it, or what it changed]',
      learned: '[What you learned, or what you would do next]',
      screenshots: [],
    },
    doodle: 'loop',
  },
]

// Your GitHub and LeetCode usernames. Their activity graphs are fetched when the site builds.
export const stats = {
  githubUser: 'sadhana62',
  leetcodeUser: 'Sadhana_new_',
}

export const moreWork = {
  text: "Want to see everything I've shipped?",
  label: 'Browse all repos on GitHub',
  href: 'https://github.com/sadhana62?tab=repositories',
}

export const experience = [
  {
    kind: 'Work',
    period: 'Jul 2022 – Sep 2024',
    title: 'Frontend Developer',
    org: 'EnableX — WebRTC Communication Platform',
    text: 'Shipped production features including a whiteboard, in-call chat, virtual background, and meeting summarization on a WebRTC-based video platform. Built AI-powered capabilities: offensive language detection, meeting note generation, and facial verification.',
    tags: ['WebRTC', 'React.js', 'Socket.io', 'Face AI'],
  },
  {
    kind: 'Open source',
    period: '2026',
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code (GSSoC) & Social Summer of Code (SSoC)',
    text: 'Selected as a contributor in two open-source programs, contributing to real-world projects and collaborating with developers globally.',
    tags: ['GSSoC 2026', 'SSoC 2026'],
  },
  {
    kind: 'Education',
    period: '2025 – 2027',
    title: 'Master of Computer Applications (MCA)',
    org: 'Jawaharlal Nehru University, New Delhi',
    text: 'Currently pursuing MCA with a focus on advanced algorithms, distributed systems, and software engineering. CGPA: 8.63/9. GATE 2026 qualified (CS & IT).',
    tags: ['CGPA 8.63/9', 'JNU', 'GATE 2026'],
  },
  {
    kind: 'Education',
    period: '2019 – 2022',
    title: 'B.Sc. (H) Computer Science',
    org: 'University of Delhi',
    text: 'Graduated with distinction. Awarded the Udaan Scholarship (2022) and secured 2nd position in the annual exam (2021). CGPA: 9.5/10.',
    tags: ['CGPA 9.5/10', 'Udaan Scholar'],
  },
]

export const skills = [
  { group: 'Languages', items: ['C++', 'JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'Vue.js', 'HTML/CSS', 'Tailwind'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'WebRTC', 'Socket.io'] },
  { group: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { group: 'AI / ML', items: ['HuggingFace', 'LangChain', 'DeepFace', 'FAISS', 'OpenCV'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Figma', 'Linux'] },
]

export const achievements = [
  { title: 'GATE 2026 Qualified', text: 'Graduate Aptitude Test in Engineering — Computer Science & IT' },
  { title: 'GSSoC 2026 Contributor', text: "Selected contributor — GirlScript Summer of Code, India's largest open-source program" },
  { title: 'SSoC 2026 Contributor', text: 'Selected contributor — Social Summer of Code 2026' },
  { title: 'Udaan Scholarship', text: 'Awarded at SSCBS (2022) for academic excellence' },
  { title: '2nd Position — SSCBS 2021', text: 'Annual exam at Shaheed Sukhdev College' },
  { title: 'Top 100 — Mumbai Hacks', text: 'Ranked in the Top 100 among 3,000+ teams' },
  { title: 'TensorFlow Developer Certificate', text: 'Udemy' },
  { title: 'Google & CalArts Certifications', text: 'Computer Networking (Google) · Graphic Design (CalArts) via Coursera' },
]

export const contact = {
  title: "Let's connect",
  text: "I'm currently open to new opportunities, whether it's a full-time role, a freelance project, or just a chat about tech. My inbox is always open!",
  email: 'sadhana6299@gmail.com',
  phone: '+91 6299 300 994',
  location: '',
  links: [
    { label: 'GitHub', handle: 'github.com/sadhana62', href: 'https://github.com/sadhana62', note: 'Check out my code' },
    { label: 'LinkedIn', handle: 'linkedin.com/in/sadhana-shrivastava-profile', href: 'https://linkedin.com/in/sadhana-shrivastava-profile/', note: "Let's connect professionally" },
    { label: 'LeetCode', handle: 'leetcode.com/u/Sadhana_new_', href: 'https://leetcode.com/u/Sadhana_new_', note: 'View profile' },
  ],
}

export const footer = {
  line: 'Software Engineer · DSA Enthusiast · Problem Solver',
  copyright: '© 2026 Designed & Developed by Sadhana Shrivastava',
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Activity', href: '#activity' },
  { label: 'Badges', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
