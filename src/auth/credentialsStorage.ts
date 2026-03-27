/** Stored expected login; seeded on first visit so values live in localStorage. */
export const CREDS_STORAGE_KEY = 'portfolio-static-creds'
export const AUTH_SESSION_KEY = 'portfolio-auth-session'

export type StoredCredentials = {
  username: string
  password: string
}

/** Defaults used when nothing is stored yet or storage is unreadable. */
export const DEFAULT_SIGN_IN: StoredCredentials = {
  username: 'chattarajkoushik@gmail.com',
  password: 'Jagadalla@722146',
}

/** In-memory session if localStorage throws (private mode / blocked storage). */
let sessionMemory = false

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export function ensureCredentialsInStorage(): StoredCredentials {
  try {
    const raw = safeGetItem(CREDS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (
        parsed &&
        typeof parsed === 'object' &&
        'username' in parsed &&
        'password' in parsed &&
        typeof (parsed as StoredCredentials).username === 'string' &&
        typeof (parsed as StoredCredentials).password === 'string'
      ) {
        const c = parsed as StoredCredentials
        return {
          username: c.username.trim(),
          password: c.password.trim(),
        }
      }
    }
  } catch {
    /* fall through to seed */
  }
  const json = JSON.stringify(DEFAULT_SIGN_IN)
  safeSetItem(CREDS_STORAGE_KEY, json)
  return DEFAULT_SIGN_IN
}

/** Clear saved username/password so next read re-seeds defaults (fixes bad edits). */
export function resetStoredCredentialsToDefault(): void {
  safeRemoveItem(CREDS_STORAGE_KEY)
  ensureCredentialsInStorage()
}

export function readSessionAuthenticated(): boolean {
  try {
    if (localStorage.getItem(AUTH_SESSION_KEY) === '1') return true
  } catch {
    /* storage blocked */
  }
  return sessionMemory
}

export function setSessionAuthenticated(value: boolean): void {
  sessionMemory = value
  try {
    if (value) localStorage.setItem(AUTH_SESSION_KEY, '1')
    else localStorage.removeItem(AUTH_SESSION_KEY)
  } catch {
    /* session may still live in memory for this tab */
  }
}
