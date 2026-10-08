import { useEffect, useState, type ReactNode } from 'react'
import {
  profile,
  stats,
  quantiphy,
  gamemerge,
  letterlane,
  moreProjects,
  experience,
  skills,
  education,
  certifications,
} from './data'
import { TrajectoryViz, CategoryBars, BridgeDiagram, WordTiles } from './visuals'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/** Renders `**bold**` spans inside a plain string. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
      )}
    </>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => document.documentElement.dataset.theme ?? '')
  const isDark =
    theme === 'dark' || (theme === '' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
    setTheme(next)
  }
  return (
    <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
      {isDark ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function Nav() {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="brand" aria-label="Back to top">
          <span className="brand__mark">sk</span>
          <span className="brand__name">Siddhartha Kumar</span>
        </a>
        <nav aria-label="Sections">
          <ul className="nav__links">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <a className="btn btn--small" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="dot" /> {profile.roles.join(' · ')}
          </p>
          <h1 className="hero__title">
            I turn data into <em>decisions</em>,<br />
            and video into <em>measurements</em>.
          </h1>
          <p className="hero__lede">{profile.summary}</p>
          <div className="hero__cta">
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>
        <div className="hero__viz reveal">
          <TrajectoryViz />
        </div>
      </div>
      <dl className="stats reveal">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SectionHead({ index, title, children }: { index: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-head reveal">
      <span className="section-head__index">{index}</span>
      <h2>{title}</h2>
      {children && <p className="section-head__sub">{children}</p>}
    </div>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack" aria-label="Tech stack">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets">
      {items.map((b) => (
        <li key={b}>
          <Rich text={b} />
        </li>
      ))}
    </ul>
  )
}

function ProjectHeader({
  kicker,
  name,
  title,
  period,
  link,
  badge,
}: {
  kicker: string
  name: string
  title: string
  period: string
  link: { href: string; label: string }
  badge?: string
}) {
  return (
    <div className="project__head">
      <div className="project__meta">
        <span className="kicker">{kicker}</span>
        <span className="period">{period}</span>
      </div>
      <h3 className="project__name">
        {name}
        {badge && <span className="badge">{badge}</span>}
      </h3>
      <p className="project__title">{title}</p>
      <a className="project__link" href={link.href} target="_blank" rel="noreferrer">
        {link.label} <ArrowIcon />
      </a>
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="section">
      <SectionHead index="01" title="Selected work">
        Three projects I'm building now, from competition ML to emulator internals to a game that can pay for itself.
      </SectionHead>

      <article className="project project--feature reveal">
        <div className="project__body">
          <ProjectHeader {...quantiphy} />
          <Bullets items={quantiphy.bullets} />
          <Stack items={quantiphy.stack} />
        </div>
        <aside className="project__aside">
          <CategoryBars data={quantiphy.categories} />
        </aside>
      </article>

      <div className="project-pair">
        <article className="project project--wide reveal">
          <ProjectHeader {...gamemerge} />
          <BridgeDiagram />
          <Bullets items={gamemerge.bullets} />
          <div className="related">
            <span>Related repos</span>
            {gamemerge.related.map((r) => (
              <a key={r.name} href={r.href} target="_blank" rel="noreferrer">
                {r.name}
              </a>
            ))}
          </div>
          <Stack items={gamemerge.stack} />
        </article>

        <article className="project reveal">
          <ProjectHeader {...letterlane} badge="Monetization-ready" />
          <WordTiles />
          <Bullets items={letterlane.bullets} />
          <div className="related">
            <span>Source</span>
            <a href={letterlane.repo} target="_blank" rel="noreferrer">
              LetterLane on GitHub
            </a>
          </div>
          <Stack items={letterlane.stack} />
        </article>
      </div>

      <h3 className="subhead reveal">More on GitHub</h3>
      <ul className="mini-grid">
        {moreProjects.map((p) => (
          <li key={p.name} className="reveal">
            <a className="mini" href={p.href} target="_blank" rel="noreferrer">
              <span className="mini__top">
                <span className="mini__name">{p.name}</span>
                <ArrowIcon />
              </span>
              <span className="mini__desc">{p.desc}</span>
              <span className="mini__lang">{p.lang}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Experience() {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  return (
    <section id="experience" className="section">
      <SectionHead index="02" title="Experience">
        Healthcare analytics at Optum, financial engineering at JPMorgan Chase, and ML research at the University of Vermont.
      </SectionHead>
      <ol className="timeline">
        {experience.map((job, i) => {
          const expanded = open[i] ?? false
          const shown = expanded ? job.bullets : job.bullets.slice(0, 3)
          return (
            <li key={job.org} className="job reveal">
              <div className="job__rail" aria-hidden="true">
                <span />
              </div>
              <div className="job__card">
                <div className="job__head">
                  <div>
                    <h3>
                      {job.role} <span className="at">@ {job.org}</span>
                    </h3>
                    <p className="job__place">{job.place}</p>
                  </div>
                  <span className="period">{job.period}</span>
                </div>
                <Bullets items={shown} />
                {job.bullets.length > 3 && (
                  <button
                    className="link-btn"
                    onClick={() => setOpen((o) => ({ ...o, [i]: !expanded }))}
                    aria-expanded={expanded}
                  >
                    {expanded ? 'Show less' : `Show ${job.bullets.length - 3} more`}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHead index="03" title="Skills & education" />
      <div className="skills">
        {skills.map((g) => (
          <div className="skill-group reveal" key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="edu reveal">
        <div>
          <h3 className="subhead">Education</h3>
          <ul className="edu__list">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="edu__degree">{e.degree}</span>
                <span className="edu__school">{e.school}</span>
                <span className="period">{e.period}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="subhead">Certifications</h3>
          <ul className="edu__list">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="edu__degree">{c.name}</span>
                <span className="edu__school">{c.issuer}</span>
                <span className="period">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section id="contact" className="section contact reveal">
      <span className="section-head__index">04</span>
      <h2 className="contact__title">
        Let's build something <em>measurable</em>.
      </h2>
      <p className="contact__sub">
        Open to data analyst, data science, ML and software engineering roles. Based in {profile.location}, happy to work remote.
      </p>
      <div className="contact__actions">
        <a className="btn" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button className="btn btn--ghost" onClick={copy}>
          {copied ? 'Copied ✓' : 'Copy email'}
        </button>
        <a className="btn btn--ghost" href={`tel:+1${profile.phone.replace(/-/g, '')}`}>
          {profile.phone}
        </a>
      </div>
      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>{' '}
          ·{' '}
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume (PDF)
          </a>
        </span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a href="#work" className="skip">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
