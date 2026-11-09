import React, { useState } from 'react';
import { CarouselProject } from '../types';
import { ElementRenderer } from './ElementRenderer';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  Smartphone
} from 'lucide-react';

interface PreviewModalProps {
  project: CarouselProject;
  initialSlideIndex?: number;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  project,
  initialSlideIndex = 0,
  onClose,
}) => {
  const [slideIdx, setSlideIdx] = useState(initialSlideIndex);
  const currentSlide = project.slides[slideIdx] || project.slides[0];

  const total = project.slides.length;
  const slideNum = String(slideIdx + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  const handlePrev = () => setSlideIdx((prev) => Math.max(0, prev - 1));
  const handleNext = () => setSlideIdx((prev) => Math.min(total - 1, prev + 1));

  // 1080 x 1350 scaled to fit a standard mobile simulation view
  // e.g. 360 x 450 (scale factor 0.333) or 380 x 475
  const mobileWidth = 380;
  const mobileHeight = 475;
  const scaleFactor = mobileWidth / 1080;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 font-mono">
            <Smartphone size={16} className="text-sky-400" />
            <span>LINKEDIN MOBILE FEED SIMULATOR</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* LinkedIn Post Chrome Mockup */}
        <div className="p-4 bg-slate-950 flex flex-col items-center overflow-y-auto max-h-[85vh]">
          <div className="w-full max-w-[400px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* LinkedIn Author Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-extrabold font-mono"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: project.accentColor,
                    border: `1.5px solid ${project.accentColor}`,
                  }}
                >
                  CK
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-100">{project.brandName}</span>
                    <span className="text-[10px] text-slate-400">• 1st</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                    Data Science & Engineering Systems • 48k followers
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Just now • 🌐</div>
                </div>
              </div>

              <MoreHorizontal size={16} className="text-slate-400" />
            </div>

            {/* Post Caption */}
            <div className="px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed">
              {project.title}. Read the breakdown below 👇 #MachineLearning #SQL #DataEngineering
            </div>

            {/* Scaled 4:5 Slide Canvas Container */}
            <div className="relative w-full flex items-center justify-center bg-black/40 overflow-hidden">
              <div
                style={{
                  width: `${mobileWidth}px`,
                  height: `${mobileHeight}px`,
                  position: 'relative',
                  backgroundColor: currentSlide.background,
                }}
              >
                <div
                  style={{
                    width: '1080px',
                    height: '1350px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: 'top left',
                    backgroundColor: currentSlide.background,
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  {currentSlide.header?.visible !== false && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '80px',
                        left: '80px',
                        width: '920px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 50,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#94A3B8',
                          letterSpacing: '1.2px',
                          fontFamily: 'JetBrains Mono, monospace',
                          textTransform: 'uppercase',
                        }}
                      >
                        {currentSlide.header?.category || 'DATA SYSTEMS'}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#64748B',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        [{slideNum}/{formattedTotal}]
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  {currentSlide.footer?.visible !== false && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '80px',
                        left: '80px',
                        width: '920px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        paddingTop: '14px',
                        zIndex: 50,
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>
                        ✦ {currentSlide.footer?.topicTitle || currentSlide.title}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#64748B',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {currentSlide.footer?.handle || project.handle}
                      </div>
                    </div>
                  )}

                  {/* Elements */}
                  {currentSlide.elements.map((el) => (
                    <div
                      key={el.id}
                      style={{
                        position: 'absolute',
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`,
                      }}
                    >
                      <ElementRenderer element={el} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {slideIdx > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              {slideIdx < total - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <ChevronRight size={18} />
                </button>
              )}

              {/* Mini Slide indicator pill on top of image */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/75 text-[10px] font-mono text-white/90">
                {slideIdx + 1} / {total}
              </div>
            </div>

            {/* LinkedIn Reaction Bar */}
            <div className="p-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-[10px]">👍 💡 1,482</span>
              </div>
              <div className="text-[10px]">94 comments • 38 reposts</div>
            </div>

            <div className="px-3 py-2 border-t border-slate-800/80 flex items-center justify-between text-slate-300 text-xs font-semibold">
              <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <ThumbsUp size={14} /> Like
              </button>
              <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <MessageSquare size={14} /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <Repeat2 size={14} /> Repost
              </button>
              <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <Send size={14} /> Send
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Paging Dots */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {project.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === slideIdx ? 'bg-sky-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Swipe or use arrows to test mobile reading rhythm
          </div>
        </div>
      </div>
    </div>
  );
};
