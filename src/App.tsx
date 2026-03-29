import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import siteLogo from './assets/logo.png'
import './App.css'
import { DoorIntro } from './components/DoorIntro'
import { EditResume } from './components/EditResume'
import { LoginModal } from './components/LoginModal'
import { Portfolio } from './components/Portfolio'
import { ResumeMenuModal } from './components/ResumeMenuModal'
import { ResumeDocument } from './components/ResumeDocument'
import { ViewResumeModal } from './components/ViewResumeModal'
import { useAuth } from './context/AuthContext'
import { useResume } from './context/ResumeContext'
import { downloadResumePdf } from './utils/downloadPdf'

type Section = 'portfolio' | 'edit'

export default function App() {
  const { isAuthenticated } = useAuth()
  const { data } = useResume()
  const [section, setSection] = useState<Section>('portfolio')
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false)
  const [viewResumeOpen, setViewResumeOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [doorIntroDone, setDoorIntroDone] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  const finishDoorIntro = useCallback(() => {
    setDoorIntroDone(true)
  }, [])

  const onShellPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = shellRef.current
    if (!el) return
    const w = window.innerWidth || 1
    const h = window.innerHeight || 1
    el.style.setProperty('--cursor-glow-x', `${(e.clientX / w) * 100}%`)
    el.style.setProperty('--cursor-glow-y', `${(e.clientY / h) * 100}%`)
  }, [])

  const onShellPointerLeave = useCallback(() => {
    const el = shellRef.current
    if (!el) return
    el.style.setProperty('--cursor-glow-x', '50%')
    el.style.setProperty('--cursor-glow-y', '38%')
  }, [])

  const safeName = data.name.replace(/[^a-zA-Z0-9]+/g, '_') || 'Resume'

  const runMenuDownload = useCallback(async () => {
    const el = document.getElementById('resume-document-pdf-source')
    if (!el) return
    await downloadResumePdf(el as HTMLElement, safeName)
  }, [safeName])

  const openResumeMenu = useCallback(() => setResumeMenuOpen(true), [])

  const openLoginFromNav = useCallback(() => setLoginModalOpen(true), [])

  const closeLoginModal = useCallback(() => setLoginModalOpen(false), [])

  /** Only wired when `showUpdate` — i.e. already signed in. */
  const handleUpdateResumeFromMenu = useCallback(() => {
    setSection('edit')
  }, [])

  return (
    <div
      ref={shellRef}
      className="app-shell"
      onPointerMove={onShellPointerMove}
      onPointerLeave={onShellPointerLeave}
    >
      <div className="pdf-source-hidden" aria-hidden>
        <ResumeDocument data={data} id="resume-document-pdf-source" />
      </div>

      <nav className="app-nav" aria-label="Primary">
        <motion.div
          className="app-brand"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={siteLogo}
            alt={data.name}
            className="app-brand-logo"
            width={36}
            height={36}
            decoding="async"
          />
        </motion.div>
        <div className="app-nav-actions">
          <button
            type="button"
            className={section === 'portfolio' ? 'nav-tab nav-tab--solo active' : 'nav-tab nav-tab--solo'}
            aria-current={section === 'portfolio' ? 'page' : undefined}
            onClick={() => setSection('portfolio')}
          >
            Portfolio
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              className={
                section === 'edit'
                  ? 'nav-tab nav-tab--solo active'
                  : 'nav-tab nav-tab--solo nav-tab--outline'
              }
              aria-current={section === 'edit' ? 'page' : undefined}
              onClick={() => setSection('edit')}
            >
              Update resume
            </button>
          ) : (
            <button
              type="button"
              className="nav-tab nav-tab--solo nav-tab--outline"
              onClick={openLoginFromNav}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <main className="app-main">
        <AnimatePresence mode="wait">
          {section === 'portfolio' ? (
            <motion.div
              key="portfolio"
              className="app-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <Portfolio onOpenResumeMenu={openResumeMenu} />
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              className="app-panel app-panel--wide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <EditResume onSignOut={() => setSection('portfolio')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ResumeMenuModal
        open={resumeMenuOpen}
        onClose={() => setResumeMenuOpen(false)}
        onView={() => setViewResumeOpen(true)}
        onUpdate={handleUpdateResumeFromMenu}
        onDownload={() => void runMenuDownload()}
        showUpdate={isAuthenticated}
      />

      <ViewResumeModal open={viewResumeOpen} data={data} onClose={() => setViewResumeOpen(false)} />

      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />

      {!doorIntroDone ? <DoorIntro onComplete={finishDoorIntro} /> : null}
    </div>
  )
}
