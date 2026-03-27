import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useId } from 'react'
import type { ResumeData } from '../types/resume'
import { ResumeDocument } from './ResumeDocument'

type Props = {
  open: boolean
  data: ResumeData
  onClose: () => void
}

export function ViewResumeModal({ open, data, onClose }: Props) {
  const titleId = useId()

  const finishClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finishClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, finishClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="view-resume-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={finishClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="view-resume-dialog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28 }}
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="view-resume-header">
              <h2 id={titleId} className="view-resume-heading">
                Résumé preview
              </h2>
              <button type="button" className="view-resume-close" onClick={finishClose}>
                Close
              </button>
            </div>
            <div className="view-resume-scroll">
              <ResumeDocument data={data} id="resume-document-view-modal" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
