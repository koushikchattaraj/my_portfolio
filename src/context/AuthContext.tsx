import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ensureCredentialsInStorage,
  readSessionAuthenticated,
  setSessionAuthenticated,
} from '../auth/credentialsStorage'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSessionAuthenticated())

  useEffect(() => {
    ensureCredentialsInStorage()
  }, [])

  const login = useCallback((username: string, password: string) => {
    const expected = ensureCredentialsInStorage()
    const u = username.trim()
    const p = password.trim()
    const ok = u === expected.username && p === expected.password
    if (ok) {
      setSessionAuthenticated(true)
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setSessionAuthenticated(false)
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
