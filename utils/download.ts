import { toPng } from 'html-to-image';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../components/SlideRenderer';

// Helper to fetch Google Fonts CSS manually
const getGoogleFontCSS = async (): Promise<string> => {
  try {
    // Select the specific Google Fonts link
    const link = document.querySelector('link[href*="fonts.googleapis.com"]');
    if (link && link instanceof HTMLLinkElement) {
      const response = await fetch(link.href);
      if (response.ok) {
        return await response.text();
      }
    }
  } catch (e) {
    console.warn("Failed to fetch Google Fonts CSS manually", e);
  }
  return '';
};

export const downloadSlide = async (ref: HTMLElement, filename: string) => {
  if (ref) {
    let styleTag: HTMLStyleElement | null = null;
    
    try {
      // 1. Manually fetch and inject fonts into the element being captured.
      // This bypasses html-to-image's attempt to read external stylesheets which causes CORS errors.
      const fontCss = await getGoogleFontCSS();
      if (fontCss) {
        styleTag = document.createElement('style');
        styleTag.innerHTML = fontCss;
        ref.appendChild(styleTag);
      }

      // 2. Wait for fonts to be ready in the main document
      try {
          await document.fonts.ready;
      } catch (e) {
          // ignore if document.fonts is not supported
      }
      
      // Small delay to ensure styles are applied in the DOM before capture
      await new Promise(resolve => setTimeout(resolve, 500));

      // 3. Capture the image
      const dataUrl = await toPng(ref, { 
        quality: 1.0, 
        pixelRatio: 1, 
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        cacheBust: true, // Force new resource load
        skipFonts: true, // CRITICAL: Tells library to not try fetching external fonts (fixes CORS/trim errors)
        style: {
          visibility: 'visible',
          opacity: '1', // Ensure captured clone is fully opaque
          position: 'static',
          transform: 'none', 
          transformOrigin: 'top left',
          margin: '0',
          padding: '0',
          fontFamily: "'Inter', sans-serif"
        }
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading slide:', err);
      alert("Houve um erro ao gerar a imagem. Tente novamente.");
    } finally {
      // Clean up the injected style tag
      if (styleTag && ref.contains(styleTag)) {
        ref.removeChild(styleTag);
      }
    }
  }
};