import React, { forwardRef } from 'react';
import { 
  ArrowRight, 
  Clock, 
  MousePointerClick, 
  Check, 
  Bookmark, 
  Share2, 
  MessageCircle, 
  TrendingUp,
  AlertTriangle,
  Target,
  Quote,
  UserPlus,
  Ban,
  Fingerprint,
  Skull, 
  XCircle,
  Bell,
  Zap,
  Gift 
} from 'lucide-react';

interface SlideRendererProps {
  slideIndex: number;
  scale?: number;
}

export const SLIDE_WIDTH = 1080;
export const SLIDE_HEIGHT = 1350;

// Inlined Noise Texture to prevent CORS issues during export
const NOISE_SVG_DATA = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E";

const NOISE_STYLE: React.CSSProperties = {
  backgroundImage: `url("${NOISE_SVG_DATA}")`,
  opacity: 0.15,
  mixBlendMode: 'overlay',
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 1
};

// Reusable Components
const BrandLogo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-2xl border-2 ${dark ? 'border-brand-paper bg-brand-green text-brand-paper' : 'border-brand-green bg-brand-paper text-brand-green'}`}>
      W
    </div>
  </div>
);

const SlideNumber = ({ current, total = 6, dark = false }: { current: number, total?: number, dark?: boolean }) => (
  <div className={`absolute bottom-12 right-12 text-6xl font-display font-bold opacity-30 ${dark ? 'text-brand-paper' : 'text-brand-green'}`}>
    {String(current).padStart(2, '0')}
  </div>
);

// Secondary background visual
const BackgroundIcon = ({ icon: Icon, className = "" }: { icon: any, className?: string }) => (
  <div className={`absolute opacity-[0.04] pointer-events-none ${className}`}>
    <Icon size={900} strokeWidth={0.5} />
  </div>
);

const SlideRenderer = forwardRef<HTMLDivElement, SlideRendererProps>(({ slideIndex, scale = 1 }, ref) => {
  
  const baseStyle: React.CSSProperties = {
    width: `${SLIDE_WIDTH}px`,
    height: `${SLIDE_HEIGHT}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    flexShrink: 0,
    overflow: 'hidden',
    backgroundColor: '#1B4D3E', // Default fallback color
  };

  const renderContent = () => {
    switch (slideIndex) {
      // --------------------------
      // SLIDE 0: CAPA (ERRO FATAL - SVG TEXT FIX)
      // --------------------------
      case 0:
        return (
          <div className="w-full h-full bg-brand-green flex flex-col p-16 relative overflow-hidden border-[1px] border-brand-paper/10">
             {/* Texture & Background */}
             <div style={NOISE_STYLE}></div>
             <BackgroundIcon icon={Skull} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-paper opacity-[0.05]" />
             
             {/* Top Bar */}
             <div className="absolute top-16 left-0 w-full px-16 flex justify-between items-center z-10">
                <div className="flex items-center gap-3 bg-brand-paper/10 backdrop-blur-md px-4 py-2 rounded-full border border-brand-paper/20">
                   <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-brand-paper uppercase tracking-widest text-sm font-bold">Urgente</span>
                </div>
                <BrandLogo dark={true} />
             </div>
             
             <div className="z-10 mt-24 relative flex-1 flex flex-col justify-center items-center text-center w-full">
                <p className="font-serif italic text-brand-paper/80 text-4xl mb-6 tracking-wide relative z-20">
                  Você está cometendo este
                </p>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* TEXTO ERRO - Standard HTML is fine for filled text */}
                  <h1 className="font-display font-bold text-[280px] leading-[0.8] tracking-tighter uppercase text-brand-paper relative z-10">
                    ERRO
                  </h1>
                  
                  {/* TEXTO FATAL - REPLACED WITH SVG FOR STABILITY */}
                  {/* SVG guarantees the stroke sits exactly where we want and doesn't rely on flaky WebkitTextStroke */}
                  <div className="relative z-10 w-full h-[300px] -mt-10 flex justify-center">
                    <svg width="1000" height="300" viewBox="0 0 1000 300" className="overflow-visible">
                      <text 
                        x="50%" 
                        y="230" 
                        textAnchor="middle" 
                        fill="transparent" 
                        stroke="#F4F1EA" 
                        strokeWidth="4" 
                        className="font-display font-bold uppercase tracking-tighter"
                        style={{ fontSize: '280px' }}
                      >
                        FATAL
                      </text>
                    </svg>
                  </div>
                  
                  {/* Visual Element: X behind text */}
                  <XCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 mix-blend-multiply opacity-40 z-0" size={500} strokeWidth={1} />
                </div>
                
                <div className="mt-12 max-w-2xl bg-brand-paper text-brand-green p-6 transform -rotate-1 shadow-2xl relative z-20">
                   <p className="text-2xl font-bold uppercase leading-snug tracking-wide">
                     Seu site pode estar <span className="underline decoration-4 decoration-red-500/50">expulsando clientes</span> em vez de atrair.
                   </p>
                </div>
             </div>

             <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
                <p className="text-brand-paper/40 text-sm uppercase tracking-[0.3em]">Arrasta pro lado</p>
             </div>
          </div>
        );

      // --------------------------
      // SLIDE 1: O GANCHO (3 SEGUNDOS)
      // --------------------------
      case 1:
        return (
          <div className="w-full h-full bg-paper flex flex-col p-16 relative overflow-hidden">
            <BackgroundIcon icon={Clock} className="right-[-150px] top-1/2 -translate-y-1/2 text-brand-green opacity-[0.04]" />

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              
              <p className="font-serif italic text-brand-green text-5xl mb-4">Você tem apenas</p>
              
              <div className="relative inline-block mb-12">
                 <span className="font-display font-bold text-brand-green text-[400px] leading-none tracking-tighter block">3</span>
                 <div className="absolute bottom-16 -right-32 bg-brand-paper border-2 border-brand-green px-4 py-1 z-10 origin-left rotate-[-90deg]">
                   <span className="font-display font-bold text-brand-green text-7xl uppercase tracking-widest whitespace-nowrap">
                     Segundos
                   </span>
                 </div>
              </div>

              <div className="bg-brand-green text-brand-paper p-12 shadow-[15px_15px_0px_rgba(27,77,62,0.2)] max-w-3xl border border-brand-green transform rotate-1">
                 <p className="font-sans font-medium text-3xl leading-relaxed">
                   É o tempo que o visitante leva para decidir se te dá dinheiro ou fecha a aba. <strong className="font-bold border-b-2 border-brand-paper">Não jogue esse tempo fora.</strong>
                 </p>
              </div>
            </div>

            <SlideNumber current={2} />
          </div>
        );

      // --------------------------
      // SLIDE 2: DICA 1 (GENÉRICO)
      // --------------------------
      case 2:
        return (
          <div className="w-full h-full bg-brand-green flex flex-col p-16 relative overflow-hidden">
             <div style={NOISE_STYLE}></div>
             <BackgroundIcon icon={Target} className="-left-20 bottom-0 text-brand-paper opacity-[0.05]" />

             <div className="z-10 h-full flex flex-col justify-center">
               <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-1 bg-brand-paper"></div>
                 <span className="text-brand-paper uppercase tracking-widest text-xl font-bold">
                   Erro Comum #01
                 </span>
               </div>

               <h2 className="font-display font-bold text-brand-paper text-[130px] leading-[0.9] uppercase mb-16 relative z-10">
                 1. PARE DE SER<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-paper to-brand-greenLight">GENÉRICO</span>
               </h2>

               <div className="relative border-l border-brand-paper/30 pl-12 py-4">
                  <Ban size={60} className="absolute left-0 top-0 -translate-x-1/2 bg-brand-green p-2 text-brand-paper border border-brand-paper rounded-full" />
                  
                  <p className="text-brand-paper text-4xl font-serif italic mb-8 opacity-90">
                    "Se você fala com todo mundo, não fala com ninguém."
                  </p>
                  
                  <div className="bg-brand-paper text-brand-green p-8 shadow-xl inline-block transform rotate-1 max-w-2xl">
                     <p className="text-xl uppercase tracking-widest font-bold mb-2 opacity-60">Responda Agora:</p>
                     <p className="text-4xl font-display font-bold">
                       "O que você faz e<br/>para quem?"
                     </p>
                  </div>
               </div>
             </div>

             <SlideNumber current={3} dark={true} />
          </div>
        );

      // --------------------------
      // SLIDE 3: DICA 2 (BOTÃO INVISÍVEL)
      // --------------------------
      case 3:
        return (
          <div className="w-full h-full bg-paper flex flex-col p-16 relative overflow-hidden">
            <BackgroundIcon icon={MousePointerClick} className="right-[-150px] top-1/2 -translate-y-1/2 text-brand-green opacity-[0.04]" />
            
            <div className="z-10 h-full flex flex-col justify-center">
               <h2 className="font-display font-bold text-brand-green text-[120px] leading-[0.85] uppercase tracking-tight mb-16">
                 2. O Botão<br/>Invisível
               </h2>

               <div className="grid gap-12">
                  <p className="text-brand-green font-light text-4xl leading-snug max-w-3xl">
                    O maior erro é não dizer o que o cliente deve fazer. Ele não vai adivinhar.
                  </p>

                  <div className="space-y-6">
                     <p className="text-brand-green font-bold uppercase tracking-widest text-sm">Exemplo de CTA Óbvio:</p>
                     
                     {/* Button Simulation */}
                     <div className="bg-brand-green text-brand-paper px-12 py-8 rounded-none shadow-[10px_10px_0px_#111] inline-flex items-center gap-6 transform hover:translate-y-1 hover:shadow-none transition-all w-fit border-2 border-brand-black">
                        <span className="font-display font-bold text-4xl uppercase">Quero Desenrolar Meu Site</span>
                        <MousePointerClick size={48} fill="currentColor" />
                     </div>
                  </div>
               </div>
            </div>

            <SlideNumber current={4} />
          </div>
        );

      // --------------------------
      // SLIDE 4: DICA 3 (PODER DO SIM)
      // --------------------------
      case 4:
        return (
          <div className="w-full h-full bg-brand-green flex flex-col p-16 relative overflow-hidden">
             <div style={NOISE_STYLE}></div>
             <BackgroundIcon icon={Check} className="-right-20 -top-20 text-brand-paper opacity-[0.05]" />
             
             <div className="z-10 flex-1 flex flex-col justify-center">
                <div className="w-24 h-24 border-2 border-brand-paper rounded-full flex items-center justify-center text-brand-paper mb-12">
                   <span className="font-display font-bold text-5xl">3</span>
                </div>

                <h2 className="font-display font-bold text-brand-paper text-[110px] leading-[0.9] uppercase mb-12 max-w-4xl">
                  O Poder de um<br/>
                  único "SIM"
                </h2>

                <div className="flex gap-12 items-start">
                   <div className="w-1 bg-brand-paper/20 h-64"></div>
                   <div className="flex flex-col gap-8 max-w-3xl">
                      <p className="text-brand-paper text-4xl font-light leading-snug">
                        Você não precisa de mil provas sociais falsas.
                      </p>
                      
                      <div className="bg-brand-paper/10 p-10 backdrop-blur-sm border border-brand-paper/20">
                         <div className="flex items-center gap-4 mb-6">
                            <Fingerprint size={32} className="text-brand-paper" />
                            <span className="font-bold text-brand-paper uppercase tracking-widest text-sm">A Verdade</span>
                         </div>
                         <p className="font-serif italic text-3xl text-brand-paper leading-relaxed">
                           "Um depoimento real e forte quebra qualquer objeção de quem está em dúvida."
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             <SlideNumber current={5} dark={true} />
          </div>
        );

      // --------------------------
      // SLIDE 5: CTA FINAL (FIXED LAYOUT & SVG TEXT)
      // --------------------------
      case 5:
        return (
          <div className="w-full h-full bg-brand-green flex flex-col p-16 relative overflow-hidden">
             <div style={NOISE_STYLE}></div>
             <BackgroundIcon icon={Bell} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-paper opacity-[0.05]" />
             
             <div className="absolute top-16 left-0 w-full flex justify-center z-20">
                <div className="flex items-center gap-2 bg-brand-paper/10 px-6 py-3 rounded-full border border-brand-paper/10 backdrop-blur-sm">
                   <Gift size={20} className="text-brand-paper" />
                   <span className="text-brand-paper uppercase tracking-[0.2em] text-sm font-bold">O Que você ganha</span>
                </div>
             </div>

             <div className="z-10 flex-1 flex flex-col justify-center items-center text-center mt-10 w-full">
                
                {/* 
                   Fixed typography structure to prevent wrapping glitches. 
                   Split into explicit blocks instead of relying on span wrapping.
                */}
                <h2 className="font-display font-bold text-brand-paper text-[120px] leading-[0.9] uppercase mb-20 tracking-tight w-full flex flex-col items-center">
                  <span className="block">Não seja o</span>
                  
                  {/* SVG Text Replacement for Stroke Effect */}
                  <div className="h-[130px] w-full flex justify-center relative -mt-4">
                    <svg width="1000" height="150" viewBox="0 0 1000 150" className="overflow-visible">
                       <text 
                        x="50%" 
                        y="110" 
                        textAnchor="middle" 
                        fill="transparent" 
                        stroke="#F4F1EA" 
                        strokeWidth="3" 
                        className="font-display font-bold uppercase tracking-tight"
                        style={{ fontSize: '120px' }}
                      >
                        Último a saber.
                      </text>
                    </svg>
                  </div>
                </h2>

                <div className="flex flex-col gap-12 items-start text-left mb-24 max-w-2xl relative z-10">
                   
                   <div className="flex items-start gap-8 group">
                      <div className="mt-2 w-4 h-4 shrink-0 rounded-full bg-brand-paper shadow-[0_0_15px_rgba(244,241,234,0.8)]"></div>
                      <div>
                        <h3 className="font-display text-5xl text-brand-paper font-bold uppercase mb-2">Dicas Diárias</h3>
                        <p className="font-serif text-3xl text-brand-paper/70 italic font-light leading-relaxed">
                           Conteúdo todo dia pra você não travar na hora de criar.
                        </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-8 group">
                      <div className="mt-2 w-4 h-4 shrink-0 rounded-full bg-brand-paper shadow-[0_0_15px_rgba(244,241,234,0.8)]"></div>
                      <div>
                        <h3 className="font-display text-5xl text-brand-paper font-bold uppercase mb-2">Estratégias Reais</h3>
                        <p className="font-serif text-3xl text-brand-paper/70 italic font-light leading-relaxed">
                           Zero teoria. Apenas o que funciona no campo de batalha.
                        </p>
                      </div>
                   </div>

                </div>

                <div className="w-full absolute bottom-0 left-0 bg-brand-paper px-16 py-12 flex items-center justify-between border-t border-brand-green/20 z-20">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full border-2 border-brand-green flex items-center justify-center bg-brand-green text-brand-paper font-display font-bold text-3xl">
                         W
                      </div>
                      <div className="text-left">
                         <p className="text-brand-green font-display font-bold text-4xl leading-none mb-1">@webdesenrola</p>
                         <p className="text-brand-green/60 uppercase tracking-widest text-sm font-bold">Desenrola seu negócio</p>
                      </div>
                   </div>

                   <div className="bg-brand-green text-brand-paper px-10 py-5 rounded-lg flex items-center gap-3 shadow-lg cursor-pointer transform hover:scale-105 transition-transform">
                      <span className="font-bold uppercase tracking-widest text-xl">Seguir</span>
                      <UserPlus size={24} />
                   </div>
                </div>
             </div>
             
             <div className="absolute bottom-40 right-16 text-brand-paper/20 font-bold text-4xl font-display z-10">
                06
             </div>
          </div>
        );

      default:
        return <div>Slide not found</div>;
    }
  };

  return (
    <div 
      ref={ref}
      style={baseStyle} 
      className="shadow-2xl origin-top-left relative" // Added relative for positioning context
    >
      {renderContent()}
    </div>
  );
});

SlideRenderer.displayName = 'SlideRenderer';

export default SlideRenderer;