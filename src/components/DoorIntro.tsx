import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

type Props = { onComplete: () => void }

const easeDoor = [0.22, 0.61, 0.36, 1] as const
/** Dial up for slower, more cinematic motion (doors, seam, fades, skip button stay in sync). */
const TIME_SCALE = 2.25
const doorSwingDuration = 1.12 * TIME_SCALE
/** Start fading doors / chrome while still swinging — site is already visible through the gap */
const fadeStartDelay = 0.72 * TIME_SCALE
const fadeOutDuration = 0.48 * TIME_SCALE

export function DoorIntro({ onComplete }: Props) {
  const reduced = useReducedMotion()
  const finishedRef = useRef(false)

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    onComplete()
  }, [onComplete])

  useEffect(() => {
    if (reduced === true) finish()
  }, [reduced, finish])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  if (reduced === true) return null

  const doorTransition = {
    rotateY: { duration: doorSwingDuration, ease: easeDoor },
    opacity: { duration: fadeOutDuration, delay: fadeStartDelay, ease: easeDoor },
  }

  const seamMove = { duration: doorSwingDuration, ease: easeDoor }
  const seamFade = { duration: fadeOutDuration, delay: fadeStartDelay, ease: easeDoor }

  const totalMs =
    Math.max(doorSwingDuration, fadeStartDelay + fadeOutDuration) * 1000 + 80

  return (
    <div className="door-intro-root">
      <div className="door-intro-stage" aria-hidden="true">
        <div className="door-intro-seam-wrap" aria-hidden>
          <motion.div
            className="door-intro-seam-half door-intro-seam-half--left"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: '-42vw', opacity: 0 }}
            transition={{
              x: seamMove,
              opacity: seamFade,
            }}
          />
          <motion.div
            className="door-intro-seam-half door-intro-seam-half--right"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: '42vw', opacity: 0 }}
            transition={{
              x: seamMove,
              opacity: seamFade,
            }}
          />
        </div>

        <div className="door-intro-perspective">
          <OpeningDoor
            side="left"
            animate={{ rotateY: -108, opacity: 0 }}
            transition={doorTransition}
          />
          <OpeningDoor
            side="right"
            animate={{ rotateY: 108, opacity: 0 }}
            transition={doorTransition}
            onAnimationComplete={() => finish()}
          />
        </div>
      </div>

      <motion.button
        type="button"
        className="door-intro-skip"
        onClick={finish}
        aria-label="Skip entrance animation"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: fadeStartDelay, duration: fadeOutDuration, ease: easeDoor }}
      />

      {/* Fallback if onAnimationComplete doesn’t run (e.g. tab backgrounded) */}
      <DoorIntroTimer ms={totalMs} onFire={finish} />
    </div>
  )
}

function OpeningDoor({
  side,
  animate,
  transition,
  onAnimationComplete,
}: {
  side: 'left' | 'right'
  animate: { rotateY: number; opacity: number }
  transition: {
    rotateY: { duration: number; ease: typeof easeDoor }
    opacity: { duration: number; delay: number; ease: typeof easeDoor }
  }
  onAnimationComplete?: () => void
}) {
  const origin = side === 'left' ? 'left center' : 'right center'
  return (
    <motion.div
      className={`door-intro-panel door-intro-panel--${side}`}
      initial={{ rotateY: 0, opacity: 1 }}
      animate={animate}
      transition={transition}
      style={{
        transformOrigin: origin,
        transformStyle: 'preserve-3d',
      }}
      onAnimationComplete={onAnimationComplete}
    />
  )
}

function DoorIntroTimer({ ms, onFire }: { ms: number; onFire: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onFire, ms)
    return () => window.clearTimeout(t)
  }, [ms, onFire])
  return null
}
