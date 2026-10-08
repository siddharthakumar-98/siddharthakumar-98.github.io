export const profile = {
  name: 'Siddhartha Kumar Senthil Kumar',
  short: 'Siddhartha Kumar',
  roles: ['Data Analyst', 'Software Engineer', 'Machine Learning'],
  location: 'Burlington, VT',
  email: 'siddhartha.kumar.sk.1998@gmail.com',
  phone: '201-377-2170',
  github: 'https://github.com/siddharthakumar-98',
  resume: 'SiddharthaKumar_Resume.pdf',
  summary:
    'Data Analyst and former JPMorgan software engineer with 4+ years turning messy healthcare and financial data into decisions. Off the clock I build things that are hard to fake: video models that measure physics, a byte-matching PS2 decompilation, and a real-time multiplayer game that is ready to earn ad revenue.',
}

export const stats = [
  { value: '4+', label: 'years in analytics & engineering' },
  { value: '95M+', label: 'Medicare claims & EHR records analyzed' },
  { value: '46.0%', label: 'MRA on QuantiPhy public validation' },
  { value: '9,107', label: 'PS2 functions mapped in Burnout 3' },
]

export type Bullet = string

export const quantiphy = {
  name: 'QuantiPhy',
  kicker: 'NeurIPS 2026 Competition Track',
  title: 'Measuring physics from video with vision + VLMs',
  period: 'Sep 2026 – Present',
  link: { href: 'https://quantiphy.stanford.edu/competition/', label: 'Challenge site' },
  stack: ['Python', 'PyTorch', 'YOLO11-seg', 'ByteTrack', 'OpenCV', 'Qwen3-VL / Qwen3.5 4-bit', 'Apple MLX', 'CUDA', 'Meta VGGT', 'pytest'],
  bullets: [
    'Answers numerical physics questions (size, speed, acceleration, distance) for **3,289 questions across 568 videos**, scored by mean relative accuracy over four 2D/3D, static/dynamic categories.',
    '**Hybrid architecture**: YOLO segmentation with dense ByteTrack tracking, metric calibration from supplied physical priors and robust Huber-weighted kinematics, with **4-bit Qwen VLMs** as fallback when geometry abstains.',
    'Lifted public-validation MRA **37.5% → 46.0%** across 8 logged experiments, and rejected a 9B model and a consensus approach after both regressed.',
    'First official submission scored **36.8% MRA on the hidden test set**. Error analysis traced its 10.7% invalid predictions to zero outputs, and a targeted VLM retry pass now recovers them.',
    'Runs on an **M4 Pro with MLX** and on **Colab GPUs** with resumable checkpoints; SHA-256-verified data, provenance hashes and **100+ unit tests**.',
  ],
  categories: [
    { key: '2D static', before: 26.9, after: 50.6 },
    { key: '2D dynamic', before: 43.0, after: 43.0 },
    { key: '3D static', before: 39.8, after: 50.2 },
    { key: '3D dynamic', before: 40.2, after: 40.2 },
  ],
}

export const gamemerge = {
  name: 'GameMerge',
  kicker: 'PS2 reverse engineering',
  title: "Burnout 3's gameplay inside Midnight Club 3",
  period: '2026 – Present',
  link: { href: 'https://github.com/siddharthakumar-98/GameMerge', label: 'GitHub' },
  stack: ['Rust', 'C', 'MIPS R5900', 'Ghidra', 'PCSX2 PINE', 'ps2dev', 'Docker'],
  bullets: [
    'A **passthrough mod**: two PCSX2 emulators linked by a **Rust bridge** that syncs per-frame shared-memory mailboxes over PINE. MC3 supplies the city and cars, Burnout supplies takedowns, boost and slow-mo.',
    'Leading a **byte-matching decompilation** of Burnout 3: rebuilt the executable **byte-for-byte (SHA-1 match)**, identified the CodeWarrior 3.0.3 compiler and named 260 library functions.',
    'Wrote a **Ghidra export-repair tool** for a PS2 static recompiler that cut **4,270 unhandled instruction encodings to zero**.',
  ],
  related: [
    { name: 'Burnout3', href: 'https://github.com/siddharthakumar-98/Burnout3' },
    { name: 'MC3DER', href: 'https://github.com/siddharthakumar-98/MC3DER' },
    { name: 'PS2Recomp', href: 'https://github.com/siddharthakumar-98/PS2Recomp' },
  ],
}

export const letterlane = {
  name: 'LetterLane',
  kicker: 'Real-time multiplayer word game',
  title: 'Duel or co-op with a friend or a bot',
  period: '2026',
  link: { href: 'https://letterlane.vercel.app', label: 'Play it' },
  repo: 'https://github.com/siddharthakumar-98/LetterLane',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Zod', 'Playwright', 'Vercel'],
  bullets: [
    'Full-stack, server-authoritative game with row-level security, row locking and idempotency keys, so late or duplicate requests never corrupt a match.',
    '**Monetization-ready**: v3.0 adds Google AdSense and H5 Games ad placements, consent controls and SEO pages, giving it a clear path to ad revenue.',
    'Bots at three difficulty levels using constraint-based filtering and information-ranked guesses; Vitest, Playwright E2E and axe-core checks.',
  ],
}

export const moreProjects = [
  { name: 'LocalTransfer', desc: 'Cloud-free file transfer between Macs over local Wi-Fi and Bluetooth. Pair once, send Desktop to Desktop.', lang: 'Rust', href: 'https://github.com/siddharthakumar-98/LocalTransfer' },
  { name: 'ShooterLane', desc: 'A shooter edition of LetterLane, built for fun on the same real-time engine.', lang: 'TypeScript', href: 'https://github.com/siddharthakumar-98/ShooterLane' },
  { name: 'MC3DER', desc: 'Byte-matching decompilation of Midnight Club 3: DUB Edition Remix, with a planned Rust rewrite.', lang: 'Rust · C', href: 'https://github.com/siddharthakumar-98/MC3DER' },
  { name: 'ML Final Project', desc: 'CS 5540 machine learning final project at the University of Vermont.', lang: 'Jupyter', href: 'https://github.com/siddharthakumar-98/ML_Final_Proj' },
  { name: 'Deep Learning Project', desc: 'Graduate deep learning final project at the University of Vermont.', lang: 'Jupyter', href: 'https://github.com/siddharthakumar-98/DL_proj' },
  { name: 'Ludobots', desc: 'Simulated robots built and evolved in PyBullet, following the r/ludobots evolutionary robotics course.', lang: 'Python', href: 'https://github.com/siddharthakumar-98/myludobots' },
]

export type Job = {
  role: string
  org: string
  place: string
  period: string
  bullets: Bullet[]
}

export const experience: Job[] = [
  {
    role: 'Data Analyst',
    org: 'Optum',
    place: 'Remote, USA',
    period: 'Dec 2024 – Present',
    bullets: [
      'Large-scale **EDA on 95M+ Medicare claims and EHR records** with ML-assisted feature extraction, improving predictive analytical accuracy by **41%**.',
      'ML classification, regression and hypothesis testing on care coordination, contributing to a **19% reduction** in 30-day readmissions.',
      'Clustering and predictive modeling to find high-risk cohorts, improving early readmission risk detection by **26%**.',
      'Automated Python ETL with AI-assisted validation, cutting manual processing by **58%** and daily workflows from 5 hours to 2.',
      'Tableau dashboards for risk scores, readmission KPIs and care gaps, speeding executive decisions by **38%**.',
      'SSIS pipelines from 18+ sources into an AWS S3 data lake: **72%** more reliable refreshes, **44%** lower latency, **27%** lower infrastructure cost.',
    ],
  },
  {
    role: 'Software Engineer II',
    org: 'JPMorgan Chase',
    place: 'Dallas, TX',
    period: 'Dec 2020 – Dec 2022',
    bullets: [
      'Delivered 5 enterprise analytics releases on schedule across the SDLC, improving reporting accuracy by **35%**.',
      'Statistical modeling and anomaly detection on revenue and variance data, reducing reporting discrepancies by **22%** a year.',
      'Cleaned **12M+ financial records** (+46% reliability); tuned SQL and MySQL indexing for **36%** faster queries.',
      'Power BI dashboards for revenue and profitability KPIs, improving executive visibility by **40%**.',
      'SOX-compliant governance with access controls, validation checks and audit trails; SAS + Python variance models (+28% forecast accuracy).',
    ],
  },
  {
    role: 'Graduate Teaching & Research Assistant',
    org: 'University of Vermont',
    place: 'Burlington, VT',
    period: 'Jan 2023 – Dec 2024',
    bullets: [
      'Built ML assignments in computer vision, deep learning and neural networks (Dr. Safwan Wshah).',
      'Cognitive computing research detecting mind-wandering from physiological signals (Prof. David Jangraw).',
      'Synthetic datasets with bias mitigation for Inclusive Computing (Prof. Yuanyuan Feng).',
      'Reinforcement learning for robot locomotion in PyBullet and Taichi.',
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'SQL', 'R', 'C', 'C++', 'Rust', 'Java', 'TypeScript', 'JavaScript'] },
  { group: 'ML & AI', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Hugging Face', 'OpenCV', 'YOLO', 'MLX', 'LLMs / VLMs', 'RAG', 'Fine-tuning', 'Reinforcement Learning'] },
  { group: 'Data & Statistics', items: ['Pandas', 'NumPy', 'SciPy', 'statsmodels', 'EDA', 'Hypothesis Testing', 'A/B Testing', 'Cohort & Funnel', 'Time Series'] },
  { group: 'BI & Visualization', items: ['Tableau', 'Power BI', 'Looker', 'Matplotlib', 'Seaborn', 'Excel / VBA'] },
  { group: 'Data Platforms', items: ['AWS (S3, Glue, Redshift, Lambda, Athena, Bedrock)', 'GCP', 'Snowflake', 'Databricks', 'Spark', 'Kafka', 'Airflow', 'dbt', 'SSIS'] },
  { group: 'Web & Databases', items: ['Next.js', 'React', 'Tailwind', 'Supabase', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Vercel'] },
  { group: 'Tools & Practice', items: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'Ghidra', 'JIRA', 'Agile / Scrum', 'HIPAA', 'SOX', 'GDPR'] },
]

export const education = [
  { degree: 'M.S. Computer Science', school: 'University of Vermont', period: 'Jan 2023 – Dec 2024' },
  { degree: 'B.Sc. Computer Engineering', school: 'Purdue University', period: 'Aug 2016 – May 2021' },
]

export const certifications = [
  { name: 'Analyze Datasets and Train ML Models using AutoML', issuer: 'AWS / Coursera', date: 'May 2022' },
  { name: 'Blockchain Specialization', issuer: 'Coursera', date: 'Apr 2022' },
]
