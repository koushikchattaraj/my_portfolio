import { motion, useReducedMotion } from 'framer-motion'
import { useResume } from '../context/ResumeContext'

const easePremium = [0.22, 1, 0.36, 1] as const

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  show: (reduced: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.01 }
      : { duration: 0.55, ease: easePremium },
  }),
}

const staggerChildren = (reduced: boolean) => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.15, delayChildren: 0.08 },
  },
})

const cardRevealItem = (reduced: boolean) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0.01 }
      : { duration: 0.5, ease: easePremium },
  },
})

const cardHover = (reduced: boolean) =>
  reduced
    ? {}
    : {
        y: -5,
        boxShadow:
          '0 24px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(110, 231, 255, 0.22), 0 0 36px rgba(110, 231, 255, 0.08)',
        borderColor: 'rgba(110, 231, 255, 0.35)',
        transition: { duration: 0.25, ease: easePremium },
      }

const btnTransition = { duration: 0.26, ease: easePremium }

function plain(text: string): string {
  return text.replace(/\*\*/g, '').trim()
}

/** tel: href — keep digits and leading + */
function telHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : '#'
}

const FACEBOOK_PROFILE = 'https://www.facebook.com/thebrahmindev/'
const INSTAGRAM_PROFILE =
  'https://www.instagram.com/the_brahmin_dev?igsh=MTJqOXJrODdnY2E5Nw%3D%3D&utm_source=qr'

type Props = { onOpenResumeMenu: () => void }

export function Portfolio({ onOpenResumeMenu }: Props) {
  const { data } = useResume()
  const summaryPlain = plain(data.summary)
  const reduced = useReducedMotion() ?? false

  return (
    <div className="portfolio-root">
      <div className="portfolio-bg portfolio-bg--layered" aria-hidden />
      <div className="portfolio-page-spotlight" aria-hidden />
      <div className="portfolio-inner">
        <motion.header className="portfolio-hero" initial={false}>
          <div className="portfolio-name-wrap">
            <div className="portfolio-name-glow" aria-hidden />
            <motion.h1
              className="portfolio-name"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0.01 }
                  : { duration: 0.88, ease: easePremium }
              }
            >
              {data.name}
            </motion.h1>
          </div>

          <motion.p
            className="portfolio-tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0.01 }
                : { delay: 0.14, duration: 0.6, ease: easePremium }
            }
          >
            {data.tagline}
          </motion.p>

          <motion.div
            className="portfolio-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0.01 }
                : { delay: 0.28, duration: 0.58, ease: easePremium }
            }
          >
            <span className="portfolio-meta-item portfolio-meta-with-icon">
              <svg
                className="portfolio-meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 21s-6-5.25-6-10a6 6 0 1 1 12 0c0 4.75-6 10-6 10Z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
              {data.contact.location}
            </span>
            <a
              className="portfolio-meta-item portfolio-meta-item--muted portfolio-meta-with-icon portfolio-meta-phone"
              href={telHref(data.contact.phone)}
            >
              <svg
                className="portfolio-meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {data.contact.phone}
            </a>
            <a
              className="portfolio-meta-email portfolio-meta-with-icon"
              href={`mailto:${data.contact.email}`}
            >
              <svg
                className="portfolio-meta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect width="20" height="16" x="2" y="4" rx="2" fill="none" />
                <path d="m22 7-8.97 6.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" />
              </svg>
              {data.contact.email}
            </a>
          </motion.div>

          <motion.div
            className="portfolio-cta-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0.01 }
                : { delay: 0.42, duration: 0.55, ease: easePremium }
            }
          >
            <motion.button
              type="button"
              className="btn-primary btn-premium"
              onClick={onOpenResumeMenu}
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={btnTransition}
            >
              Resume →
            </motion.button>
            <motion.a
              className="btn-ghost btn-premium-ghost"
              href={data.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={btnTransition}
            >
              LinkedIn
            </motion.a>
            <motion.a
              className="btn-ghost btn-premium-ghost"
              href={FACEBOOK_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={btnTransition}
            >
              Facebook
            </motion.a>
            <motion.a
              className="btn-ghost btn-premium-ghost"
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={btnTransition}
            >
              Instagram
            </motion.a>
          </motion.div>
        </motion.header>

        <motion.section
          className="portfolio-panel portfolio-panel--accent glass-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: sectionReveal.hidden,
            show: sectionReveal.show(reduced),
          }}
          whileHover={cardHover(reduced)}
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <h2 className="portfolio-h2">About</h2>
          <p className="portfolio-lead portfolio-lead--full">{summaryPlain}</p>
        </motion.section>

        <motion.section
          className="portfolio-metrics"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerChildren(reduced)}
        >
          {[
            { label: 'Roles profiled', value: String(data.experience.length) },
            { label: 'Case studies', value: String(data.projects.length) },
            { label: 'Skill pillars', value: String(data.skills.length) },
            {
              label: 'Base',
              value: data.contact.location.split(',')[0]?.trim() || data.contact.location,
            },
          ].map((m) => (
            <motion.div
              key={m.label}
              className="metric-tile glass-metric"
              variants={cardRevealItem(reduced)}
              whileHover={cardHover(reduced)}
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <span
                className={
                  m.label === 'Base' ? 'metric-value metric-value--place' : 'metric-value'
                }
              >
                {m.value}
              </span>
              <span className="metric-label">{m.label}</span>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: sectionReveal.hidden,
            show: sectionReveal.show(reduced),
          }}
        >
          <h2 className="portfolio-section-title">Technical footprint</h2>
          <motion.div
            className="portfolio-grid portfolio-grid--all"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerChildren(reduced)}
          >
            {data.skills.map((row) => (
              <motion.article
                key={row.label}
                className="skill-card glass-card"
                variants={cardRevealItem(reduced)}
                whileHover={cardHover(reduced)}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <span className="skill-card-label">{row.label}</span>
                <p className="skill-card-value">{row.value}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="portfolio-timeline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: sectionReveal.hidden,
            show: sectionReveal.show(reduced),
          }}
        >
          <h2 className="portfolio-section-title">Experience</h2>
          <ul className="portfolio-timeline">
            {data.experience.map((exp, i) => (
              <motion.li
                key={exp.id}
                className="timeline-item timeline-item--glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  reduced
                    ? { duration: 0.01 }
                    : { delay: i * 0.12, duration: 0.52, ease: easePremium }
                }
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

        <motion.section
          className="portfolio-projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: sectionReveal.hidden,
            show: sectionReveal.show(reduced),
          }}
        >
          <h2 className="portfolio-section-title">Selected work</h2>
          <p className="portfolio-section-intro">
            Product-facing builds across support, HR, and marketing analytics — from component libraries to perf
            hardening.
          </p>
          <div className="project-stack">
            {data.projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  reduced
                    ? { duration: 0.01 }
                    : { delay: i * 0.14, duration: 0.52, ease: easePremium }
                }
                whileHover={cardHover(reduced)}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
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

        <motion.section
          className="portfolio-edu grid-two"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerChildren(reduced)}
        >
          <motion.div
            className="portfolio-panel portfolio-panel--compact glass-panel"
            variants={cardRevealItem(reduced)}
            whileHover={cardHover(reduced)}
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <h2 className="portfolio-h2">Education</h2>
            <ul className="edu-list">
              {data.education.map((line, i) => (
                <li key={i}>
                  <span className="edu-left">{line.left}</span>
                  <span className="edu-right">{line.right}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="portfolio-panel portfolio-panel--compact glass-panel"
            variants={cardRevealItem(reduced)}
            whileHover={cardHover(reduced)}
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <h2 className="portfolio-h2">Certifications</h2>
            <ul className="cert-list">
              {data.certifications.map((c, i) => (
                <li key={i}>{plain(c)}</li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        <motion.footer
          className="portfolio-footer-cta glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={
            reduced ? { duration: 0.01 } : { duration: 0.55, ease: easePremium }
          }
          whileHover={cardHover(reduced)}
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
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
              <motion.a
                className="btn-primary footer-btn btn-premium"
                href={`mailto:${data.contact.email}`}
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                transition={btnTransition}
              >
                Say hello
              </motion.a>
              <motion.a
                className="btn-ghost footer-btn btn-premium-ghost"
                href={FACEBOOK_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                transition={btnTransition}
              >
                Facebook
              </motion.a>
              <motion.a
                className="btn-ghost footer-btn btn-premium-ghost"
                href={INSTAGRAM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                transition={btnTransition}
              >
                Instagram
              </motion.a>
              <motion.button
                type="button"
                className="btn-ghost footer-btn btn-premium-ghost"
                onClick={onOpenResumeMenu}
                whileHover={reduced ? {} : { scale: 1.05 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                transition={btnTransition}
              >
                Resume
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
