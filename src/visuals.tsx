import { useEffect, useState } from 'react'

/* ------------------------------------------------------------------ */
/* Hero: a tracked projectile, a nod to QuantiPhy's measurement loop. */
/* ------------------------------------------------------------------ */

const G = 9.81 // m/s²
const DIAMETER_M = 0.22 // the "supplied prior"
const BALL_R = 10 // px
const PX_PER_M = (BALL_R * 2) / DIAMETER_M
const GROUND = 292
const X0 = 56
const VY = 6.4 // m/s
const FLIGHT = (2 * VY) / G // s
const VX = (350 / PX_PER_M) / FLIGHT // m/s, crosses ~350px
const SLOWDOWN = 2.6
const HOLD = 0.9 // s of sim time held after landing
const SAMPLE_DT = 1 / 14

function pos(t: number) {
  const x = X0 + VX * t * PX_PER_M
  const y = GROUND - BALL_R - (VY * t - 0.5 * G * t * t) * PX_PER_M
  return { x, y }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function TrajectoryViz() {
  const [t, setT] = useState(() => (prefersReducedMotion() ? FLIGHT * 0.62 : 0))

  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf = 0
    let start = performance.now()
    const tick = (now: number) => {
      const sim = (now - start) / 1000 / SLOWDOWN
      if (sim > FLIGHT + HOLD) start = now
      setT(Math.min(sim, FLIGHT))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const p = pos(t)
  const vyNow = VY - G * t
  const speed = Math.hypot(VX, vyNow)
  const samples: { x: number; y: number }[] = []
  for (let s = 0; s <= t + 1e-9; s += SAMPLE_DT) samples.push(pos(s))
  const box = BALL_R + 7
  const frame = Math.round(t * 30)

  return (
    <figure className="viz" aria-label="Animated illustration: a ball's trajectory being tracked, with calibrated speed and acceleration readouts">
      <svg viewBox="0 0 480 360" role="img" aria-hidden="true">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="var(--grid)" strokeWidth="1" />
          </pattern>
          <radialGradient id="ball" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="var(--ball-hi)" />
            <stop offset="100%" stopColor="var(--ball)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="480" height="360" rx="14" fill="var(--viz-bg)" />
        <rect x="0" y="0" width="480" height="360" rx="14" fill="url(#grid)" />

        {/* corner brackets */}
        {[
          [16, 16, 1, 1],
          [464, 16, -1, 1],
          [16, 344, 1, -1],
          [464, 344, -1, -1],
        ].map(([x, y, dx, dy], i) => (
          <path key={i} d={`M${x} ${y + 14 * dy}V${y}H${x + 14 * dx}`} fill="none" stroke="var(--muted)" strokeWidth="1.5" />
        ))}

        <text x="30" y="38" className="viz__mono">REC ● {String(frame).padStart(3, '0')}f · 30 fps</text>
        <text x="450" y="38" className="viz__mono" textAnchor="end">prior: ⌀ ball = {DIAMETER_M} m</text>

        {/* ground */}
        <line x1="30" x2="450" y1={GROUND} y2={GROUND} stroke="var(--muted)" strokeDasharray="2 5" />

        {/* fitted path (ghost) */}
        <path
          d={Array.from({ length: 41 }, (_, i) => {
            const q = pos((FLIGHT * i) / 40)
            return `${i ? 'L' : 'M'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`
          }).join(' ')}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* tracked samples */}
        {samples.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="2.4" fill="var(--accent)" opacity={0.25 + (0.6 * i) / Math.max(samples.length, 1)} />
        ))}

        {/* velocity vector */}
        <line
          x1={p.x}
          y1={p.y}
          x2={p.x + VX * 9}
          y2={p.y - vyNow * 9}
          stroke="var(--accent-2)"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--accent-2)" />
          </marker>
        </defs>

        {/* ball + detection box */}
        <circle cx={p.x} cy={p.y} r={BALL_R} fill="url(#ball)" />
        <rect x={p.x - box} y={p.y - box} width={box * 2} height={box * 2} fill="none" stroke="var(--accent)" strokeWidth="1.5" rx="3" />
        <rect x={p.x - box} y={p.y - box - 17} width="96" height="16" rx="3" fill="var(--accent)" />
        <text x={p.x - box + 5} y={p.y - box - 5.5} className="viz__tag">ball #1 · 0.94</text>

        {/* readout */}
        <g transform="translate(30 306)">
          <text className="viz__mono" y="0">t = {t.toFixed(2)} s</text>
          <text className="viz__mono" x="118" y="0">
            |v| = <tspan className="viz__val">{speed.toFixed(2)} m/s</tspan>
          </text>
          <text className="viz__mono" x="268" y="0">
            |a| = <tspan className="viz__val">{G.toFixed(2)} m/s²</tspan>
          </text>
          <text className="viz__mono viz__dim" y="22">YOLO-seg → ByteTrack → prior calibration → robust kinematics</text>
        </g>
      </svg>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* QuantiPhy: per-category MRA before/after                            */
/* ------------------------------------------------------------------ */

export function CategoryBars({ data }: { data: { key: string; before: number; after: number }[] }) {
  const max = 60
  return (
    <figure className="bars">
      <div className="bars__headline">
        <span className="bars__from">37.5%</span>
        <span className="bars__arrow" aria-hidden="true">→</span>
        <span className="bars__to">46.0%</span>
      </div>
      <figcaption>Public-validation MRA, v2 baseline → v3 (+8.6 pp)</figcaption>
      <ul>
        {data.map((d) => (
          <li key={d.key}>
            <div className="bars__label">
              <span>{d.key}</span>
              <span className="bars__nums">
                {d.after === d.before ? (
                  <>{d.after.toFixed(1)}%</>
                ) : (
                  <>
                    <span className="muted">{d.before.toFixed(1)}</span> → <strong>{d.after.toFixed(1)}%</strong>
                  </>
                )}
              </span>
            </div>
            <div className="bars__track" aria-hidden="true">
              <span className="bars__after" style={{ width: `${(d.after / max) * 100}%` }} />
              <span className="bars__before" style={{ width: `${(d.before / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="bars__legend" aria-hidden="true">
        <span><i className="sw sw--before" /> v2</span>
        <span><i className="sw sw--after" /> v3</span>
        <span className="muted">Hidden test (v1): 36.8%</span>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* GameMerge: the two-emulator bridge                                  */
/* ------------------------------------------------------------------ */

export function BridgeDiagram() {
  return (
    <figure className="bridge" aria-label="Architecture: Midnight Club 3 in PCSX2 number 1 and Burnout 3 in PCSX2 number 2, connected through a Rust bridge over PINE">
      <div className="bridge__node">
        <span className="bridge__tag">PCSX2 #1 · visible</span>
        <strong>Midnight Club 3</strong>
        <span>city, cars, physics, rendering</span>
      </div>
      <div className="bridge__link" aria-hidden="true">
        <span className="bridge__flow bridge__flow--right">car states →</span>
        <span className="bridge__wire" />
        <span className="bridge__flow bridge__flow--left">← takedowns · boost</span>
      </div>
      <div className="bridge__node bridge__node--core">
        <span className="bridge__tag">PINE IPC</span>
        <strong>gm-bridge</strong>
        <span>Rust · per-frame mailboxes</span>
      </div>
      <div className="bridge__link" aria-hidden="true">
        <span className="bridge__flow bridge__flow--right">puppet cars →</span>
        <span className="bridge__wire" />
        <span className="bridge__flow bridge__flow--left">← events · slow-mo</span>
      </div>
      <div className="bridge__node">
        <span className="bridge__tag">PCSX2 #2 · hidden</span>
        <strong>Burnout 3</strong>
        <span>takedown rules, scoring, modes</span>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* LetterLane: your board vs. the opponent's private feedback          */
/* ------------------------------------------------------------------ */

type Mark = 'g' | 'y' | 'x'
const YOU: { word: string; marks: Mark[] }[] = [
  { word: 'CRANE', marks: ['x', 'y', 'g', 'x', 'x'] },
  { word: 'LOAMY', marks: ['y', 'x', 'g', 'x', 'x'] },
  { word: 'PLANT', marks: ['g', 'g', 'g', 'g', 'g'] },
]
const THEM: Mark[][] = [
  ['x', 'x', 'g', 'y', 'x'],
  ['x', 'g', 'g', 'x', 'y'],
]

export function WordTiles() {
  return (
    <figure className="tiles" aria-label="LetterLane duel: your guesses with letters, and your opponent's progress shown as colors only">
      <div className="tiles__lane">
        <span className="tiles__who">You · solved in 3</span>
        {YOU.map((row) => (
          <div className="tiles__row" key={row.word}>
            {row.word.split('').map((ch, i) => (
              <span key={i} className={`tile tile--${row.marks[i]}`}>
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="tiles__lane">
        <span className="tiles__who">Bot · letters hidden</span>
        {THEM.map((row, r) => (
          <div className="tiles__row" key={r}>
            {row.map((m, i) => (
              <span key={i} className={`tile tile--${m}`} />
            ))}
          </div>
        ))}
        <div className="tiles__row">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="tile tile--empty" />
          ))}
        </div>
      </div>
    </figure>
  )
}
