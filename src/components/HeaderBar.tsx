import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Download, 
  FileText, 
  Grid, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Eye, 
  LayoutTemplate,
  FileCode,
  FolderOpen,
  Save,
  Check
} from 'lucide-react';
import { DomainType } from '../types';

interface HeaderBarProps {
  brandName: string;
  projectTitle: string;
  onUpdateTitle: (title: string) => void;
  selectedTemplateKey: string;
  onSelectTemplate: (key: string) => void;
  showSafeZone: boolean;
  onToggleSafeZone: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoomScale: number;
  onSetZoom: (scale: number) => void;
  onAutoFitZoom: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  onOpenPreview: () => void;
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
  isExportingPDF: boolean;
  exportProgress?: { current: number; total: number } | null;
  accentColor: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  brandName,
  projectTitle,
  onUpdateTitle,
  selectedTemplateKey,
  onSelectTemplate,
  showSafeZone,
  onToggleSafeZone,
  showGrid,
  onToggleGrid,
  zoomScale,
  onSetZoom,
  onAutoFitZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onExportPNG,
  onExportPDF,
  onOpenPreview,
  onExportJSON,
  onImportJSON,
  isExportingPDF,
  exportProgress,
  accentColor,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
    }
  };

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30 select-none">
      {/* Left: Brand signature + Title Input */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-extrabold text-white tracking-tight font-jakarta">
            {brandName}
          </span>
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded font-mono"
            style={{
              backgroundColor: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            Studio
          </span>
        </div>

        <div className="h-4 w-px bg-slate-800 hidden md:block" />

        <input
          type="text"
          value={projectTitle}
          onChange={(e) => onUpdateTitle(e.target.value)}
          placeholder="Untitled Carousel"
          className="hidden md:block text-xs font-medium text-slate-300 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-sky-500 px-1.5 py-0.5 focus:outline-none max-w-xs transition-colors"
        />
      </div>

      {/* Center: Template Blueprint Selector */}
      <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
        <LayoutTemplate size={14} className="text-sky-400" />
        <span className="text-[11px] font-semibold text-slate-400">Blueprint:</span>
        <select
          value={selectedTemplateKey}
          onChange={(e) => onSelectTemplate(e.target.value)}
          className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer pr-2"
        >
          <option value="mlDeepDive" className="bg-slate-900 text-slate-100">
            Machine Learning (Focal Loss Deep Dive)
          </option>
          <option value="sqlOptimization" className="bg-slate-900 text-slate-100">
            SQL Optimization (SARGable Query Teardown)
          </option>
          <option value="powerBiStory" className="bg-slate-900 text-slate-100">
            Power BI Analytics (Executive Cockpit & DAX)
          </option>
          <option value="dailyLearnings" className="bg-slate-900 text-slate-100">
            Daily Notes (Data Science Fundamentals)
          </option>
        </select>
      </div>

      {/* Right: Tools & Actions */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center border border-slate-800 rounded-lg p-0.5 bg-slate-900">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCw size={14} />
          </button>
        </div>

        {/* View Toggles (Margins / Grid / Zoom) */}
        <div className="flex items-center border border-slate-800 rounded-lg p-0.5 bg-slate-900">
          <button
            onClick={onToggleSafeZone}
            title="Toggle 80px LinkedIn Mobile Safe Margins"
            className={`p-1.5 rounded transition-colors text-xs font-medium flex items-center gap-1 ${
              showSafeZone
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck size={14} />
            <span className="hidden xl:inline text-[11px]">80px Margin</span>
          </button>

          <button
            onClick={onToggleGrid}
            title="Toggle alignment grid"
            className={`p-1.5 rounded transition-colors ${
              showGrid
                ? 'bg-sky-500/20 text-sky-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Grid size={14} />
          </button>

          <button
            onClick={onAutoFitZoom}
            title="Fit Canvas to Screen"
            className="px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded"
          >
            {Math.round(zoomScale * 100)}%
          </button>
        </div>

        {/* Feed Simulator Preview Button */}
        <button
          onClick={onOpenPreview}
          title="Open LinkedIn Feed Simulator"
          className="hidden md:flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Eye size={14} className="text-sky-400" />
          <span>Feed Preview</span>
        </button>

        {/* Project JSON Save / Load */}
        <button
          onClick={onExportJSON}
          title="Backup project as JSON"
          className="hidden sm:flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
        >
          <Save size={13} />
          <span className="text-[11px]">JSON</span>
        </button>

        <label
          title="Import project JSON"
          className="hidden sm:flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
        >
          <FolderOpen size={13} />
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* PNG Export */}
        <button
          onClick={onExportPNG}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-800 hover:border-sky-500/60 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-sky-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <Download size={14} className="text-sky-400" />
          <span className="hidden sm:inline">PNG</span>
        </button>

        {/* PDF Multi-Slide Carousel Export */}
        <button
          onClick={onExportPDF}
          disabled={isExportingPDF}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-sky-500/20 disabled:opacity-60"
        >
          <FileText size={14} />
          <span>
            {isExportingPDF
              ? `Exporting (${exportProgress?.current}/${exportProgress?.total})...`
              : 'Export Carousel PDF'}
          </span>
        </button>
      </div>
    </header>
  );
};
