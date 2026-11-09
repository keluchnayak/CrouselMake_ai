import React from 'react';
import { Slide } from '../types';
import { Plus, Copy, Trash2, ArrowLeft, ArrowRight, Layers, Eye } from 'lucide-react';

interface SlideNavigatorProps {
  slides: Slide[];
  activeSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (from: number, to: number) => void;
  onOpenPreview: () => void;
  accentColor: string;
}

export const SlideNavigator: React.FC<SlideNavigatorProps> = ({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
  onOpenPreview,
  accentColor,
}) => {
  return (
    <footer className="h-32 bg-slate-950 border-t border-slate-800 flex items-center px-6 gap-6 overflow-x-auto select-none z-20">
      {/* Slide Counter Info */}
      <div className="hidden sm:flex flex-col justify-center min-w-[130px] border-r border-slate-800 pr-5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono">
          <Layers size={14} className="text-sky-400" />
          <span>{slides.length} SLIDES</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1 font-mono">
          Slide {activeSlideIndex + 1} of {slides.length}
        </div>
        <button
          onClick={onOpenPreview}
          className="mt-2 py-1 px-2.5 rounded bg-slate-900 border border-slate-700/80 hover:border-sky-500/60 text-slate-300 hover:text-sky-300 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye size={12} />
          <span>Feed Simulator</span>
        </button>
      </div>

      {/* Filmstrip of Slide Thumbnails */}
      <div className="flex items-center gap-3.5 flex-1 overflow-x-auto py-2">
        {slides.map((s, idx) => {
          const isActive = idx === activeSlideIndex;
          const slideNum = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={s.id}
              onClick={() => onSelectSlide(idx)}
              className={`group relative w-20 h-24 rounded-lg cursor-pointer flex flex-col justify-between p-2 box-border transition-all flex-shrink-0 ${
                isActive
                  ? 'ring-2 ring-sky-400 shadow-lg shadow-sky-500/10 scale-105'
                  : 'border border-slate-800 hover:border-slate-700 hover:scale-[1.02] opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: s.background }}
            >
              {/* Top Row: Index Badge & Layout Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-300 bg-black/40 px-1 py-0.5 rounded">
                  {slideNum}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase truncate max-w-[45px]">
                  {s.layoutType || 'slide'}
                </span>
              </div>

              {/* Mini Content Mock */}
              <div className="flex flex-col gap-1 my-auto pointer-events-none opacity-60">
                <div className="w-12 h-1.5 bg-slate-300/40 rounded-full" />
                <div className="w-8 h-1 bg-slate-400/30 rounded-full" />
                <div
                  className="w-10 h-2 rounded mt-1"
                  style={{ backgroundColor: `${accentColor}40` }}
                />
              </div>

              {/* Slide Title */}
              <div className="text-[9px] text-slate-300 font-medium truncate">
                {s.title}
              </div>

              {/* Action Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 p-1 transition-opacity">
                {idx > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, idx - 1);
                    }}
                    title="Move slide left"
                    className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                  >
                    <ArrowLeft size={11} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSlide(idx);
                  }}
                  title="Duplicate slide"
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                >
                  <Copy size={11} />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSlide(idx);
                    }}
                    title="Delete slide"
                    className="p-1 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
                {idx < slides.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, idx + 1);
                    }}
                    title="Move slide right"
                    className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                  >
                    <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* New Slide Button */}
        <button
          onClick={onAddSlide}
          className="w-20 h-24 rounded-lg border border-dashed border-slate-700 hover:border-sky-400 bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-sky-300 flex flex-col items-center justify-center gap-1.5 transition-all flex-shrink-0 cursor-pointer group"
        >
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-semibold">New Slide</span>
        </button>
      </div>
    </footer>
  );
};
