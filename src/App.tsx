import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import './App.css'
import { EditResume } from './components/EditResume'
import { Portfolio } from './components/Portfolio'

type Section = 'portfolio' | 'edit'

export default function App() {
  const [section, setSection] = useState<Section>('portfolio')

  return (
    <div className="app-shell">
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
        <div className="app-nav-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={section === 'portfolio'}
            className={section === 'portfolio' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setSection('portfolio')}
          >
            Portfolio
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={section === 'edit'}
            className={section === 'edit' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setSection('edit')}
          >
            Edit resume
          </button>
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
              <Portfolio onEditResume={() => setSection('edit')} />
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
              <EditResume />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
