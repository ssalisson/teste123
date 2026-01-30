import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Layers, Monitor, CheckCircle2 } from 'lucide-react';
import SlideRenderer, { SLIDE_WIDTH, SLIDE_HEIGHT } from './components/SlideRenderer';
import { SLIDES_DATA } from './types';
import { downloadSlide } from './utils/download';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(0.3); // Initial scale for preview
  const [isReady, setIsReady] = useState(false);
  
  // Refs for the visible preview slides
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for the hidden full-resolution slides (for export)
  const exportRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;
        
        // Calculate scale to fit nicely with some padding
        const scaleHeight = (containerHeight - 40) / SLIDE_HEIGHT;
        const scaleWidth = (containerWidth - 40) / SLIDE_WIDTH;
        
        // Use the smaller scale to ensure it fits entirely
        const newScale = Math.min(scaleHeight, scaleWidth, 0.6); 
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    // Check for fonts ready
    document.fonts.ready.then(() => {
      setIsReady(true);
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  };

  // Modified to download from the EXPORT refs (full scale), not the preview refs
  const downloadCurrent = async () => {
    const ref = exportRefs.current[currentSlide];
    if (ref) {
      await downloadSlide(ref, `webdesenrola-slide-${currentSlide + 1}.png`);
    }
  };

  const downloadAll = async () => {
    // Sequential download
    for (let i = 0; i < SLIDES_DATA.length; i++) {
        const ref = exportRefs.current[i];
        if (ref) {
            await downloadSlide(ref, `webdesenrola-slide-${i + 1}.png`);
            // Small buffer to prevent browser hiccups
            await new Promise(r => setTimeout(r, 500)); 
        }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-200 overflow-hidden font-sans">
      
      {/* 
        HIDDEN EXPORT LAYER 
        CRITICAL FIX: 
        1. Removed 'visibility: hidden' which caused browsers to skip painting the content (resulting in blank images).
        2. Removed 'top: -10000px' which sometimes causes layout issues.
        3. Used 'opacity: 0' + 'z-index: -50' + 'fixed' to keep it in the DOM render tree but invisible to user.
        4. Added 'pointer-events-none' to prevent interaction.
        5. ADDED 'minWidth: 1080px' to prevent browser from squashing layout if viewport is small.
      */}
      <div style={{ 
          position: 'fixed', 
          left: '0', 
          top: '0', 
          zIndex: -50,
          opacity: 0,
          pointerEvents: 'none',
          display: 'flex', // Ensure items are laid out
          flexDirection: 'column',
          minWidth: '1080px' // FORCE WIDTH so text wraps correctly regardless of screen size
      }}>
        {SLIDES_DATA.map((slide, index) => (
          <div key={`export-${slide.id}`} style={{ marginBottom: '20px' }}>
             <SlideRenderer 
                ref={(el) => (exportRefs.current[index] = el)} 
                slideIndex={index} 
                scale={1} // FORCE SCALE 1 for perfect export
             />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center border border-brand-paper/20">
            <Layers className="text-brand-paper" size={18} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-gray-100">Web<span className="text-brand-greenLight">Desenrola</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
           {isReady ? (
             <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                <CheckCircle2 size={14} /> Sistema Pronto
             </div>
           ) : (
             <div className="text-xs text-yellow-500 animate-pulse">Carregando fontes...</div>
           )}

           <button 
            onClick={downloadAll}
            disabled={!isReady}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Download size={16} /> Baixar Todos
           </button>
           <button 
            onClick={downloadCurrent}
            disabled={!isReady}
            className="bg-brand-paper hover:bg-white text-brand-green px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-paper/10"
           >
             <Download size={16} /> Baixar Atual
           </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Thumbnails) */}
        <aside className="w-72 border-r border-gray-800 bg-gray-900 overflow-y-auto hidden lg:block shrink-0">
          <div className="p-6 space-y-4">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Lâminas ({SLIDES_DATA.length})</h3>
             {SLIDES_DATA.map((slide, idx) => (
               <button
                 key={slide.id}
                 onClick={() => setCurrentSlide(idx)}
                 className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative ${
                   currentSlide === idx 
                     ? 'bg-brand-green/20 border-brand-green/40 text-brand-paper' 
                     : 'bg-gray-800/40 border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                 }`}
               >
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-bold opacity-60 tracking-wider">SLIDE {idx + 1}</span>
                   {currentSlide === idx && <div className="w-1.5 h-1.5 rounded-full bg-brand-greenLight shadow-[0_0_8px_rgba(74,122,106,0.8)]"></div>}
                 </div>
                 <div className="font-medium text-sm leading-snug">{slide.title}</div>
               </button>
             ))}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-gray-950 relative flex flex-col">
           
           {/* Viewport */}
           <div ref={containerRef} className="flex-1 flex items-center justify-center relative overflow-hidden p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950">
              
              <div 
                style={{ 
                    width: SLIDE_WIDTH * scale, 
                    height: SLIDE_HEIGHT * scale,
                    position: 'relative',
                    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)' 
                }}
                className="border border-gray-800"
              >
                 {SLIDES_DATA.map((slide, index) => (
                    <div 
                        key={slide.id}
                        className={`absolute top-0 left-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                    >
                        {/* 
                           PREVIEW RENDERER
                           This is scaled using CSS transform for display.
                           We DO NOT download this one.
                        */}
                        <SlideRenderer 
                            ref={(el) => (previewRefs.current[index] = el)} 
                            slideIndex={index} 
                            scale={scale} 
                        />
                    </div>
                 ))}
              </div>

           </div>

           {/* Mobile/Tablet Controls */}
           <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-8 shrink-0">
              <button 
                onClick={handlePrev}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="text-center">
                 <span className="block text-white font-bold tracking-widest text-sm mb-1">{currentSlide + 1} / {SLIDES_DATA.length}</span>
                 <span className="text-xs text-gray-500 uppercase tracking-wider">{SLIDES_DATA[currentSlide].title}</span>
              </div>

              <button 
                onClick={handleNext}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700"
              >
                <ChevronRight size={20} />
              </button>
           </div>

        </main>
      </div>
    </div>
  );
}