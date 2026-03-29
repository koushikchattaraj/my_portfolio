import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/** 210mm at 96dpi — same width desktop Chrome uses for `210mm`; avoids mobile `mm` differences. */
const A4_RESUME_WIDTH_CSS_PX = Math.round((210 * 96) / 25.4)

function waitLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

/** jsPDF margin: top, left, bottom, right (mm). */
type MarginMm = [number, number, number, number]

/**
 * One A4 page only — uniform scale to fit (contain). Mobile captures are often a few %
 * taller than desktop (font metrics / subpixels); slicing becomes two pages while desktop
 * still fits one. Slight shrink is preferable to an extra sheet.
 */
function addCanvasSinglePageToA4(canvas: HTMLCanvasElement, pdf: jsPDF, margin: MarginMm): void {
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const innerW = pageW - margin[1] - margin[3]
  const innerH = pageH - margin[0] - margin[2]

  const cw = canvas.width
  const ch = canvas.height
  const imgAspect = cw / ch
  const boxAspect = innerW / innerH

  let drawW: number
  let drawH: number
  if (imgAspect >= boxAspect) {
    drawW = innerW
    drawH = innerW / imgAspect
  } else {
    drawH = innerH
    drawW = innerH * imgAspect
  }

  const x = margin[1] + (innerW - drawW) / 2
  const y = margin[0] + (innerH - drawH) / 2
  const imgData = canvas.toDataURL('image/jpeg', 0.98)
  pdf.addImage(imgData, 'JPEG', x, y, drawW, drawH)
}

type InlineSnapshot = {
  el: HTMLElement
  keys: string[]
  values: (string | null)[]
}

function snapshotInline(el: HTMLElement, keys: string[]): InlineSnapshot {
  return {
    el,
    keys,
    values: keys.map((k) => el.style.getPropertyValue(k) || null),
  }
}

function applyInline(el: HTMLElement, entries: Record<string, string>): void {
  for (const [k, v] of Object.entries(entries)) {
    el.style.setProperty(k, v)
  }
}

function restoreInline(s: InlineSnapshot): void {
  for (let i = 0; i < s.keys.length; i++) {
    const k = s.keys[i]
    const v = s.values[i]
    if (v === null || v === '') s.el.style.removeProperty(k)
    else s.el.style.setProperty(k, v)
  }
}

/**
 * Snapshot the résumé DOM with html2canvas directly (no html2pdf wrapper).
 * html2pdf clones into a wide A4 box; on mobile the clone often stayed narrow and centered,
 * producing empty left/right gutters in the raster and extra pages.
 */
export async function downloadResumePdf(element: HTMLElement, baseFilename: string): Promise<void> {
  const parent = element.parentElement
  const wPx = `${A4_RESUME_WIDTH_CSS_PX}px`

  const snapEl = snapshotInline(element, [
    'width',
    'max-width',
    'min-width',
    'box-sizing',
    'margin',
    '-webkit-text-size-adjust',
    'text-size-adjust',
  ])
  const snapPar =
    parent != null
      ? snapshotInline(parent, ['width', 'max-width', 'min-width', 'max-height', 'overflow'])
      : null

  element.classList.add('pdf-capture')
  applyInline(element, {
    'box-sizing': 'border-box',
    width: wPx,
    'max-width': wPx,
    'min-width': wPx,
    margin: '0',
    '-webkit-text-size-adjust': '100%',
    'text-size-adjust': '100%',
  })
  if (parent) {
    applyInline(parent, {
      width: wPx,
      'max-width': wPx,
      'min-width': wPx,
      'max-height': 'none',
      overflow: 'visible',
    })
  }

  await waitLayout()

  const now = new Date()
  const dateStamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  const margin: MarginMm = [0, 0, 0, 0]
  const filename = `${baseFilename}_${dateStamp}.pdf`
  const capH = Math.max(1, Math.ceil(element.scrollHeight))
  const w = A4_RESUME_WIDTH_CSS_PX

  const jsPdfOpts = {
    unit: 'mm' as const,
    format: 'a4' as const,
    orientation: 'portrait' as const,
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: w,
      height: capH,
      windowWidth: w,
      windowHeight: capH,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      onclone: (clonedDoc, cloned) => {
        const hz = '-webkit-text-size-adjust'
        const tz = 'text-size-adjust'
        clonedDoc.documentElement.style.setProperty(hz, '100%')
        clonedDoc.documentElement.style.setProperty(tz, '100%')
        if (clonedDoc.body) {
          clonedDoc.body.style.setProperty(hz, '100%')
          clonedDoc.body.style.setProperty(tz, '100%')
        }
        cloned.style.boxSizing = 'border-box'
        cloned.style.width = wPx
        cloned.style.maxWidth = wPx
        cloned.style.minWidth = wPx
        cloned.style.margin = '0'
        cloned.style.setProperty(hz, '100%')
        cloned.style.setProperty(tz, '100%')
      },
    })

    const pdf = new jsPDF(jsPdfOpts)
    addCanvasSinglePageToA4(canvas, pdf, margin)
    pdf.save(filename)
  } finally {
    element.classList.remove('pdf-capture')
    restoreInline(snapEl)
    if (snapPar) restoreInline(snapPar)
  }
}
