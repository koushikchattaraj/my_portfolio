/** Works on LAN over HTTP too (`randomUUID` is limited to secure contexts in browsers). */
export function newId(): string {
  const c = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined
  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID()
  }
  return `_${Math.random().toString(36).slice(2, 11)}${Date.now().toString(36)}`
}
