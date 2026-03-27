import html2pdf from 'html2pdf.js'

export async function downloadResumePdf(element: HTMLElement, baseFilename: string): Promise<void> {
  element.classList.add('pdf-capture')
  const now = new Date()
  const dateStamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  const opt = {
    margin: 0,
    filename: `${baseFilename}_${dateStamp}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as const },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
    },
  }

  try {
    await html2pdf().set(opt).from(element).save()
  } finally {
    element.classList.remove('pdf-capture')
  }
}
