import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useResume } from '../context/ResumeContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const stagger = {
  show: { transition: { staggerChildren: 0.06 } },
}

function plain(text: string): string {
  return text.replace(/\*\*/g, '').trim()
}

const FACEBOOK_PROFILE = 'https://www.facebook.com/thebrahmindev/'
const INSTAGRAM_PROFILE =
  'https://www.instagram.com/the_brahmin_dev?igsh=MTJqOXJrODdnY2E5Nw%3D%3D&utm_source=qr'

type Props = { onEditResume: () => void }

export function Portfolio({ onEditResume }: Props) {
  const { data } = useResume()

  const focusTags = useMemo(() => {
    return data.tagline
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [data.tagline])

  const summaryPlain = plain(data.summary)

  return (
    <div className="portfolio-root">
      <div className="portfolio-bg" aria-hidden />
      <motion.div
        className="portfolio-inner"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.header className="portfolio-hero" variants={fadeUp} custom={0}>
          <p className="portfolio-kicker">Portfolio</p>
          <motion.h1
            className="portfolio-name"
            initial={{ opacity: 0, letterSpacing: '0.35em' }}
            animate={{ opacity: 1, letterSpacing: '0.06em' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.name}
          </motion.h1>
          <p className="portfolio-tag">{data.tagline}</p>

          <motion.div
            className="portfolio-meta"
            variants={fadeUp}
            custom={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span className="portfolio-meta-item">
              <span className="portfolio-meta-dot" aria-hidden />
              {data.contact.location}
            </span>
            <span className="portfolio-meta-item portfolio-meta-item--muted">{data.contact.phone}</span>
            <span className="portfolio-pills" aria-label="Focus areas">
              {focusTags.map((tag) => (
                <span key={tag} className="portfolio-pill">
                  {tag}
                </span>
              ))}
            </span>
          </motion.div>

          <div className="portfolio-cta-row">
            <motion.button
              type="button"
              className="btn-primary"
              onClick={onEditResume}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit resume →
            </motion.button>
            <a className="btn-ghost" href={`mailto:${data.contact.email}`}>
              Email
            </a>
            <a
              className="btn-ghost"
              href={data.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a className="btn-ghost" href={FACEBOOK_PROFILE} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a className="btn-ghost" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </motion.header>

        <motion.section className="portfolio-panel portfolio-panel--accent" variants={fadeUp} custom={2}>
          <h2 className="portfolio-h2">About</h2>
          <p className="portfolio-lead portfolio-lead--full">{summaryPlain}</p>
        </motion.section>

        <motion.section className="portfolio-metrics" variants={fadeUp} custom={3}>
          {[
            { label: 'Roles profiled', value: String(data.experience.length) },
            { label: 'Case studies', value: String(data.projects.length) },
            { label: 'Skill pillars', value: String(data.skills.length) },
            {
              label: 'Base',
              value: data.contact.location.split(',')[0]?.trim() || data.contact.location,
            },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="metric-tile"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </motion.div>
          ))}
        </motion.section>

        <motion.section variants={fadeUp} custom={4}>
          <h2 className="portfolio-section-title">Technical footprint</h2>
          <div className="portfolio-grid portfolio-grid--all">
            {data.skills.map((row, i) => (
              <motion.article
                key={row.label}
                className="skill-card"
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <span className="skill-card-label">{row.label}</span>
                <p className="skill-card-value">{row.value}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="portfolio-timeline-wrap" variants={fadeUp} custom={5}>
          <h2 className="portfolio-section-title">Experience</h2>
          <ul className="portfolio-timeline">
            {data.experience.map((exp, i) => (
              <motion.li
                key={exp.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="timeline-dot" aria-hidden />
                <div className="timeline-body">
                  <div className="timeline-top">
                    <span className="timeline-company">{exp.company}</span>
                    <span className="timeline-dates">{exp.dates}</span>
                  </div>
                  <p className="timeline-role">{exp.role}</p>
                  <ul className="timeline-bullets">
                    {exp.bullets.slice(0, 3).map((b, j) => (
                      <li key={j}>{plain(b)}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="portfolio-projects" variants={fadeUp} custom={6}>
          <h2 className="portfolio-section-title">Selected work</h2>
          <p className="portfolio-section-intro">
            Product-facing builds across support, HR, and marketing analytics — from component libraries to perf
            hardening.
          </p>
          <div className="project-stack">
            {data.projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="project-card"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul className="project-highlights">
                  {p.bullets.map((b, j) => (
                    <li key={j}>{plain(b)}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="portfolio-edu grid-two" variants={fadeUp} custom={7}>
          <div className="portfolio-panel portfolio-panel--compact">
            <h2 className="portfolio-h2">Education</h2>
            <ul className="edu-list">
              {data.education.map((line, i) => (
                <li key={i}>
                  <span className="edu-left">{line.left}</span>
                  <span className="edu-right">{line.right}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="portfolio-panel portfolio-panel--compact">
            <h2 className="portfolio-h2">Certifications</h2>
            <ul className="cert-list">
              {data.certifications.map((c, i) => (
                <li key={i}>{plain(c)}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.footer
          className="portfolio-footer-cta"
          variants={fadeUp}
          custom={8}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="portfolio-footer-inner">
            <div>
              <p className="portfolio-footer-kicker">Let&apos;s talk</p>
              <p className="portfolio-footer-text">
                Building fast, accessible frontends for complex domains. Open to Frontend / React-heavy roles and
                meaningful product work.
              </p>
            </div>
            <div className="portfolio-footer-actions">
              <a className="btn-primary footer-btn" href={`mailto:${data.contact.email}`}>
                Say hello
              </a>
              <a className="btn-ghost footer-btn" href={FACEBOOK_PROFILE} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a className="btn-ghost footer-btn" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <button type="button" className="btn-ghost footer-btn" onClick={onEditResume}>
                Tweak resume
              </button>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  )
}
