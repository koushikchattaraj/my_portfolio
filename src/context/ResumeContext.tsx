import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultResume } from '../data/defaultResume'
import type { ResumeData } from '../types/resume'

const STORAGE_KEY = 'portfolio-resume-v1'

type ResumeContextValue = {
  data: ResumeData
  setData: (next: ResumeData | ((prev: ResumeData) => ResumeData)) => void
  resetToDefault: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

function loadInitial(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ResumeData
      if (parsed && typeof parsed.name === 'string') return parsed
    }
  } catch {
    /* ignore */
  }
  return defaultResume
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const setData = useCallback((next: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setDataState(next)
  }, [])

  const resetToDefault = useCallback(() => {
    setDataState(defaultResume)
  }, [])

  const value = useMemo(
    () => ({ data, setData, resetToDefault }),
    [data, setData, resetToDefault],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

// Hooks and provider share context; fast-refresh caveat is acceptable here.
// eslint-disable-next-line react-refresh/only-export-components
export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
