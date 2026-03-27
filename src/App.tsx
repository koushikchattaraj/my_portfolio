import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import './App.css'
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
    <div className="app-shell">
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
          <span className="app-brand-mark" aria-hidden />
          KC
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
    </div>
  )
}
