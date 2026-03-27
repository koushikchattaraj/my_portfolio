import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { useResume } from '../context/ResumeContext'
import type { Experience, Project, SkillRow } from '../types/resume'
import { downloadResumePdf } from '../utils/downloadPdf'
import { newId } from '../utils/id'
import { ResumeDocument } from './ResumeDocument'

function bulletsFromText(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function bulletsToText(bullets: string[]): string {
  return bullets.join('\n')
}

export function EditResume() {
  const { data, setData, resetToDefault } = useResume()
  const pdfRef = useRef<HTMLDivElement>(null)
  const [pdfBusy, setPdfBusy] = useState(false)
  const safeName = data.name.replace(/[^a-zA-Z0-9]+/g, '_') || 'Resume'

  const runDownload = useCallback(async () => {
    const el = document.getElementById('resume-document')
    if (!el) return
    setPdfBusy(true)
    try {
      await downloadResumePdf(el as HTMLElement, safeName)
    } finally {
      setPdfBusy(false)
    }
  }, [safeName])

  const updateSkill = (index: number, patch: Partial<SkillRow>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }))
  }

  const addSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { label: 'Label', value: 'Skills' }],
    }))
  }

  const removeSkill = (index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const updateExp = (id: string, patch: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }

  const setExpBullets = (id: string, text: string) => {
    updateExp(id, { bullets: bulletsFromText(text) })
  }

  const addExp = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: newId(),
          company: 'Company',
          dates: 'Dates',
          role: 'Role',
          bullets: ['First bullet (**bold** with asterisks)'],
        },
      ],
    }))
  }

  const removeExp = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }))
  }

  const updateProj = (id: string, patch: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }

  const setProjBullets = (id: string, text: string) => {
    updateProj(id, { bullets: bulletsFromText(text) })
  }

  const addProj = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: newId(),
          title: 'Project title',
          description: 'One-line description',
          bullets: ['Impact bullet'],
        },
      ],
    }))
  }

  const removeProj = (id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }))
  }

  const certText = data.certifications.join('\n')
  const setCerts = (text: string) => {
    setData((prev) => ({
      ...prev,
      certifications: bulletsFromText(text).length ? bulletsFromText(text) : [''],
    }))
  }

  return (
    <div className="edit-root">
      <motion.div
        className="edit-toolbar"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="edit-toolbar-inner">
          <p className="edit-toolbar-hint">Edits autosave in this browser. Use **double asterisks** for bold.</p>
          <div className="edit-toolbar-actions">
            <button type="button" className="btn-ghost-toolbar" onClick={resetToDefault}>
              Reset to default
            </button>
            <button
              type="button"
              className="btn-download"
              disabled={pdfBusy}
              onClick={() => void runDownload()}
            >
              {pdfBusy ? 'Generating…' : 'Download PDF'}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="edit-split" ref={pdfRef}>
        <motion.div
          className="edit-form-col"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <section className="form-section">
            <h3>Header</h3>
            <label>
              Full name
              <input
                value={data.name}
                onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
              />
            </label>
            <label>
              Tagline
              <input
                value={data.tagline}
                onChange={(e) => setData((p) => ({ ...p, tagline: e.target.value }))}
              />
            </label>
            <label>
              Location
              <input
                value={data.contact.location}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    contact: { ...p.contact, location: e.target.value },
                  }))
                }
              />
            </label>
            <label>
              Phone
              <input
                value={data.contact.phone}
                onChange={(e) =>
                  setData((p) => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))
                }
              />
            </label>
            <label>
              Email
              <input
                value={data.contact.email}
                onChange={(e) =>
                  setData((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))
                }
              />
            </label>
            <label>
              LinkedIn URL
              <input
                value={data.contact.linkedinUrl}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    contact: { ...p.contact, linkedinUrl: e.target.value },
                  }))
                }
              />
            </label>
            <label>
              LinkedIn label (shown on resume)
              <input
                value={data.contact.linkedinLabel}
                onChange={(e) =>
                  setData((p) => ({
                    ...p,
                    contact: { ...p.contact, linkedinLabel: e.target.value },
                  }))
                }
              />
            </label>
          </section>

          <section className="form-section">
            <h3>Summary</h3>
            <label>
              Professional summary
              <textarea
                rows={6}
                value={data.summary}
                onChange={(e) => setData((p) => ({ ...p, summary: e.target.value }))}
              />
            </label>
          </section>

          <section className="form-section">
            <div className="form-section-head">
              <h3>Skills</h3>
              <button type="button" className="btn-small" onClick={addSkill}>
                + Add row
              </button>
            </div>
            {data.skills.map((row, i) => (
              <div className="repeat-block" key={i}>
                <label>
                  Label
                  <input value={row.label} onChange={(e) => updateSkill(i, { label: e.target.value })} />
                </label>
                <label>
                  Value
                  <input value={row.value} onChange={(e) => updateSkill(i, { value: e.target.value })} />
                </label>
                <button type="button" className="btn-small danger" onClick={() => removeSkill(i)}>
                  Remove
                </button>
              </div>
            ))}
          </section>

          <section className="form-section">
            <div className="form-section-head">
              <h3>Experience</h3>
              <button type="button" className="btn-small" onClick={addExp}>
                + Add role
              </button>
            </div>
            {data.experience.map((exp) => (
              <div className="repeat-block large" key={exp.id}>
                <label>
                  Company
                  <input
                    value={exp.company}
                    onChange={(e) => updateExp(exp.id, { company: e.target.value })}
                  />
                </label>
                <label>
                  Dates
                  <input value={exp.dates} onChange={(e) => updateExp(exp.id, { dates: e.target.value })} />
                </label>
                <label>
                  Role
                  <input value={exp.role} onChange={(e) => updateExp(exp.id, { role: e.target.value })} />
                </label>
                <label>
                  Bullets (one per line, **bold** supported)
                  <textarea
                    rows={5}
                    value={bulletsToText(exp.bullets)}
                    onChange={(e) => setExpBullets(exp.id, e.target.value)}
                  />
                </label>
                <button type="button" className="btn-small danger" onClick={() => removeExp(exp.id)}>
                  Remove role
                </button>
              </div>
            ))}
          </section>

          <section className="form-section">
            <div className="form-section-head">
              <h3>Projects</h3>
              <button type="button" className="btn-small" onClick={addProj}>
                + Add project
              </button>
            </div>
            {data.projects.map((proj) => (
              <div className="repeat-block large" key={proj.id}>
                <label>
                  Title
                  <input
                    value={proj.title}
                    onChange={(e) => updateProj(proj.id, { title: e.target.value })}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProj(proj.id, { description: e.target.value })}
                  />
                </label>
                <label>
                  Bullets (one per line)
                  <textarea
                    rows={4}
                    value={bulletsToText(proj.bullets)}
                    onChange={(e) => setProjBullets(proj.id, e.target.value)}
                  />
                </label>
                <button type="button" className="btn-small danger" onClick={() => removeProj(proj.id)}>
                  Remove project
                </button>
              </div>
            ))}
          </section>

          <section className="form-section">
            <h3>Education</h3>
            {data.education.map((line, i) => (
              <div className="repeat-inline" key={i}>
                <label>
                  Line {i + 1} left
                  <input
                    value={line.left}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        education: p.education.map((l, j) =>
                          j === i ? { ...l, left: e.target.value } : l,
                        ),
                      }))
                    }
                  />
                </label>
                <label>
                  Line {i + 1} right
                  <input
                    value={line.right}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        education: p.education.map((l, j) =>
                          j === i ? { ...l, right: e.target.value } : l,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
            ))}
            <button
              type="button"
              className="btn-small"
              onClick={() =>
                setData((p) => ({
                  ...p,
                  education: [...p.education, { left: '', right: '' }],
                }))
              }
            >
              + Add education line
            </button>
          </section>

          <section className="form-section">
            <h3>Certifications</h3>
            <label>
              One certification per line
              <textarea rows={4} value={certText} onChange={(e) => setCerts(e.target.value)} />
            </label>
          </section>
        </motion.div>

        <div className="edit-preview-col">
          <p className="preview-label">Live preview / PDF source</p>
          <div className="preview-scroll">
            <ResumeDocument data={data} id="resume-document" />
          </div>
        </div>
      </div>
    </div>
  )
}
