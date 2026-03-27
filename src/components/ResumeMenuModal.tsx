import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useId } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onView: () => void
  onUpdate: () => void
  onDownload: () => void
  /** When false, "Update resume" is hidden (use header Login / Update instead). */
  showUpdate?: boolean
}

export function ResumeMenuModal({
  open,
  onClose,
  onView,
  onUpdate,
  onDownload,
  showUpdate = true,
}: Props) {
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
          className="resume-menu-backdrop"
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
            className="resume-menu-modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(ev) => ev.stopPropagation()}
          >
            <h2 id={titleId} className="resume-menu-title">
              Resume
            </h2>
            <p className="resume-menu-desc">
              {showUpdate
                ? 'View, update, or download your résumé.'
                : 'View or download your résumé. Use Login in the header to edit.'}
            </p>
            <div className="resume-menu-actions">
              <button
                type="button"
                className="resume-menu-btn resume-menu-btn--primary"
                onClick={() => {
                  finishClose()
                  onView()
                }}
              >
                View resume
              </button>
              {showUpdate ? (
                <button
                  type="button"
                  className="resume-menu-btn resume-menu-btn--primary"
                  onClick={() => {
                    finishClose()
                    onUpdate()
                  }}
                >
                  Update resume
                </button>
              ) : null}
              <button
                type="button"
                className="resume-menu-btn resume-menu-btn--secondary"
                onClick={() => {
                  finishClose()
                  onDownload()
                }}
              >
                Download resume
              </button>
            </div>
            <button type="button" className="resume-menu-cancel" onClick={finishClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
