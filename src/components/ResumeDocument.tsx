import { Fragment } from 'react'
import type { ResumeData } from '../types/resume'
import { renderBoldSegments } from '../utils/renderBold'
import './ResumeDocument.css'

type Props = {
  data: ResumeData
  id?: string
  className?: string
}

export function ResumeDocument({ data, id = 'resume-document', className = '' }: Props) {
  const c = data.contact
  return (
    <div id={id} className={`resume-page ${className}`.trim()}>
      <header className="resume-header">
        <h1>{data.name}</h1>
        <div className="resume-tagline">{data.tagline}</div>
        <div className="resume-contact">
          <span>{c.location}</span>
          <span className="sep">|</span>
          <span>{c.phone}</span>
          <span className="sep">|</span>
          <a href={`mailto:${c.email}`}>{c.email}</a>
          <span className="sep">|</span>
          <a href={c.linkedinUrl} target="_blank" rel="noreferrer">
            {c.linkedinLabel}
          </a>
        </div>
      </header>

      <section className="resume-section">
        <div className="resume-section-title">Professional Summary</div>
        <div className="resume-summary">{renderBoldSegments(data.summary)}</div>
      </section>

      <section className="resume-section">
        <div className="resume-section-title">Core Technical Skills</div>
        <div className="resume-skills">
          {data.skills.map((row) => (
            <Fragment key={row.label}>
              <div className="label">{row.label}</div>
              <div className="value">{row.value}</div>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <div className="resume-section-title">Professional Experience</div>
        {data.experience.map((exp) => (
          <div className="resume-exp-block" key={exp.id}>
            <div className="resume-exp-header">
              <span className="company">{exp.company}</span>
              <span className="dates">{exp.dates}</span>
            </div>
            <div className="resume-exp-role">{exp.role}</div>
            <ul className="resume-list">
              {exp.bullets.map((b, i) => (
                <li key={i}>{renderBoldSegments(b)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <div className="resume-section-title">Key Projects</div>
        {data.projects.map((proj) => (
          <div className="resume-proj-block" key={proj.id}>
            <div className="resume-proj-title">{proj.title}</div>
            <div className="resume-proj-desc">{proj.description}</div>
            <ul className="resume-list">
              {proj.bullets.map((b, i) => (
                <li key={i}>{renderBoldSegments(b)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <div className="resume-section-title">Education</div>
        {data.education.map((line, i) => (
          <div className="resume-edu-line" key={i}>
            <span className={i === 0 ? 'edu-inst' : 'edu-italic'}>{line.left}</span>
            <span className={i === 0 ? 'edu-dates' : 'edu-italic'}>{line.right}</span>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <div className="resume-section-title">Certifications</div>
        <div className="resume-cert">
          {data.certifications.map((line, i) => (
            <div key={i}>{renderBoldSegments(line)}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
