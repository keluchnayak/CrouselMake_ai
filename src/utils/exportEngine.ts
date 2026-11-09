import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { CarouselProject, Slide } from '../types';

/**
 * Renders the active slide canvas into a crisp 1080x1350 PNG file
 */
export const exportSlideAsPNG = async (
  canvasId: string,
  fileName: string
): Promise<string> => {
  const node = document.getElementById(canvasId);
  if (!node) throw new Error('Canvas element not found in DOM.');

  // Temporarily reset CSS scale so the exported image is native 1080x1350
  const originalTransform = node.style.transform;
  node.style.transform = 'none';

  try {
    const dataUrl = await toPng(node, {
      width: 1080,
      height: 1350,
      pixelRatio: 1.5,
      cacheBust: true,
      skipAutoScale: true,
    });

    // Restore original transform scale immediately
    node.style.transform = originalTransform;

    // Download PNG
    const link = document.createElement('a');
    link.download = `${fileName.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
    link.href = dataUrl;
    link.click();

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
    });

    return dataUrl;
  } catch (err) {
    node.style.transform = originalTransform;
    console.error('Failed to export slide as PNG:', err);
    throw err;
  }
};

/**
 * Compiles all carousel slides into an authentic multi-page PDF formatted
 * specifically for LinkedIn document carousels (1080 x 1350, 4:5 portrait).
 */
export const exportAllSlidesToPDF = async (
  project: CarouselProject,
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  const canvasNode = document.getElementById('carousel-canvas');
  if (!canvasNode) throw new Error('Canvas element not found in DOM.');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1350],
    hotfixes: ['px_scaling'],
  });

  const total = project.slides.length;

  for (let i = 0; i < total; i++) {
    if (onProgress) onProgress(i + 1, total);

    // Wait a brief tick for render updates
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Capture the current canvas
    const originalTransform = canvasNode.style.transform;
    canvasNode.style.transform = 'none';

    try {
      const imgData = await toPng(canvasNode, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        skipAutoScale: true,
      });

      canvasNode.style.transform = originalTransform;

      if (i > 0) {
        pdf.addPage([1080, 1350], 'portrait');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, 1080, 1350, undefined, 'FAST');
    } catch (e) {
      canvasNode.style.transform = originalTransform;
      console.error(`Error rendering slide ${i + 1}:`, e);
    }
  }

  const safeFileName = `${project.brandName}-${project.title}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  pdf.save(`${safeFileName}-LinkedIn-Carousel.pdf`);

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.7 },
  });
};

/**
 * Saves current carousel project state as a JSON file
 */
export const exportProjectAsJSON = (project: CarouselProject) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute(
    'download',
    `${project.brandName}-${project.title}-project.json`.replace(/[^a-zA-Z0-9_-]/g, '_')
  );
  downloadAnchor.click();
};
