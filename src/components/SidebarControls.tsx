import React, { useState } from 'react';
import { 
  CanvasElement, 
  TextElement, 
  CodeElement, 
  MetricElement, 
  BadgeElement, 
  BentoElement, 
  ImageElement, 
  BulletListElement, 
  AuthorCardElement,
  Slide,
  DomainType
} from '../types';
import { DOMAIN_PALETTES } from '../templates';
import { SAMPLE_ASSETS } from '../utils/sampleAssets';
import { 
  Type, 
  Code2, 
  Sliders, 
  PlusSquare, 
  Image as ImageIcon, 
  ListOrdered, 
  UserCheck, 
  Trash2, 
  Copy, 
  Layers, 
  Palette, 
  LayoutGrid, 
  Sparkles,
  Maximize2,
  AlignCenter,
  Upload
} from 'lucide-react';

interface SidebarProps {
  selectedElement: CanvasElement | null;
  onUpdateElement: (updated: CanvasElement) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onAddElement: (type: CanvasElement['type'], extra?: Partial<CanvasElement>) => void;
  onApplyLayout: (layoutType: 'hook' | 'code' | 'evidence' | 'bento' | 'outro') => void;
  currentSlide: Slide;
  onUpdateSlide: (updatedSlide: Partial<Slide>) => void;
  onApplyPalette: (domain: DomainType, allSlides: boolean) => void;
  currentDomain: DomainType;
  brandName: string;
}

export const SidebarControls: React.FC<SidebarProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onAddElement,
  onApplyLayout,
  currentSlide,
  onUpdateSlide,
  onApplyPalette,
  currentDomain,
  brandName,
}) => {
  const [activeTab, setActiveTab] = useState<'inspect' | 'insert' | 'layouts' | 'palette'>('insert');

  // If an element is clicked, auto switch to inspect tab so user can immediately tune it
  React.useEffect(() => {
    if (selectedElement) {
      setActiveTab('inspect');
    }
  }, [selectedElement?.id]);

  const handleCenterElement = () => {
    if (!selectedElement) return;
    const newX = Math.round((1080 - selectedElement.width) / 2);
    onUpdateElement({ ...selectedElement, x: newX });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onAddElement('image', {
        src: result,
        width: 920,
        height: 520,
        x: 80,
        y: 260,
        borderRadius: 16,
        borderColor: '#30363D',
        borderWidth: 1,
        objectFit: 'contain',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-80 md:w-88 bg-slate-900 border-r border-slate-800 flex flex-col h-full z-20 text-slate-200 select-none">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 p-1 gap-1">
        <button
          onClick={() => setActiveTab('insert')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'insert'
              ? 'bg-slate-800 text-sky-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <PlusSquare size={14} /> Elements
        </button>

        <button
          onClick={() => setActiveTab('layouts')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'layouts'
              ? 'bg-slate-800 text-sky-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <LayoutGrid size={14} /> Layouts
        </button>

        <button
          onClick={() => setActiveTab('palette')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'palette'
              ? 'bg-slate-800 text-sky-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Palette size={14} /> Palettes
        </button>

        <button
          onClick={() => setActiveTab('inspect')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'inspect'
              ? 'bg-slate-800 text-sky-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sliders size={14} /> Style {selectedElement && '•'}
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ================= TAB 1: INSERT ELEMENTS ================= */}
        {activeTab === 'insert' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Editorial Building Blocks
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Pre-styled minimalist components adhering to the 1080×1350 grid.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddElement('text')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-sky-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <Type size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Text Headline</span>
                </button>

                <button
                  onClick={() => onAddElement('code')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-emerald-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <Code2 size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Code Terminal</span>
                </button>

                <button
                  onClick={() => onAddElement('metric')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <Sliders size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Metric Card</span>
                </button>

                <button
                  onClick={() => onAddElement('bento')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-purple-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <LayoutGrid size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Bento Concept</span>
                </button>

                <button
                  onClick={() => onAddElement('badge')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-sky-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <PlusSquare size={18} className="text-sky-300 group-hover:scale-110 transition-transform" />
                  <span>Category Tag</span>
                </button>

                <button
                  onClick={() => onAddElement('bullet_list')}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 hover:border-blue-500/50 text-slate-200 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <ListOrdered size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Numbered List</span>
                </button>
              </div>
            </div>

            {/* Visual Screenshot / Charts section */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Output & Visual Evidence
              </h4>
              <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-dashed border-slate-700 hover:border-sky-500 bg-slate-800/40 text-xs font-medium text-slate-300 cursor-pointer transition-colors">
                  <Upload size={14} className="text-sky-400" />
                  <span>Upload Your Screenshot / Chart</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="text-[11px] text-slate-400 font-semibold uppercase mt-3 mb-1">
                  Or Insert Clean Preset Diagrams:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() =>
                      onAddElement('image', {
                        src: SAMPLE_ASSETS.confusionMatrix,
                        caption: 'Confusion Matrix Heatmap',
                      })
                    }
                    className="text-left text-[11px] p-2 bg-slate-800/60 border border-slate-700/50 rounded hover:bg-slate-800 hover:border-emerald-500/40 text-slate-300 transition-colors"
                  >
                    📊 Confusion Matrix
                  </button>
                  <button
                    onClick={() =>
                      onAddElement('image', {
                        src: SAMPLE_ASSETS.sqlExecutionPlan,
                        caption: 'EXPLAIN ANALYZE Tree',
                      })
                    }
                    className="text-left text-[11px] p-2 bg-slate-800/60 border border-slate-700/50 rounded hover:bg-slate-800 hover:border-sky-500/40 text-slate-300 transition-colors"
                  >
                    ⚡ SQL Plan Tree
                  </button>
                  <button
                    onClick={() =>
                      onAddElement('image', {
                        src: SAMPLE_ASSETS.powerBiSchema,
                        caption: 'Star Schema Model View',
                      })
                    }
                    className="text-left text-[11px] p-2 bg-slate-800/60 border border-slate-700/50 rounded hover:bg-slate-800 hover:border-amber-500/40 text-slate-300 transition-colors"
                  >
                    ⭐ Star Schema
                  </button>
                  <button
                    onClick={() =>
                      onAddElement('image', {
                        src: SAMPLE_ASSETS.powerBiDashboard,
                        caption: 'Executive BI Cockpit',
                      })
                    }
                    className="text-left text-[11px] p-2 bg-slate-800/60 border border-slate-700/50 rounded hover:bg-slate-800 hover:border-amber-500/40 text-slate-300 transition-colors"
                  >
                    📈 Executive Cockpit
                  </button>
                </div>
              </div>
            </div>

            {/* Author Profile card */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Brand Outro Component
              </h4>
              <button
                onClick={() => onAddElement('author_card')}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-sky-400 text-xs font-semibold text-slate-200 transition-colors"
              >
                <UserCheck size={16} className="text-sky-400" />
                <span>Insert "Code With K" Profile Card</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: 5 MASTER WIREFRAME LAYOUTS ================= */}
        {activeTab === 'layouts' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                4+1 Master Architectures
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Reset current slide with exact wireframe layouts ready for technical feeds:
              </p>

              <div className="space-y-2">
                {/* Layout 1 */}
                <div
                  onClick={() => onApplyLayout('hook')}
                  className="p-3 bg-slate-800/70 border border-slate-700/80 hover:border-sky-500 rounded-lg cursor-pointer transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-400 font-mono">LAYOUT 1</span>
                    <span className="text-[10px] bg-sky-500/10 text-sky-300 px-1.5 py-0.5 rounded font-mono">Hook</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    The High-Authority Hook (Slide 1)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Category Tag pill + Huge 3-line bold title + Subtitle + Bento Dual-Metric Cards.
                  </div>
                </div>

                {/* Layout 2 */}
                <div
                  onClick={() => onApplyLayout('code')}
                  className="p-3 bg-slate-800/70 border border-slate-700/80 hover:border-emerald-500 rounded-lg cursor-pointer transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-400 font-mono">LAYOUT 2</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Code</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    Code Split Layout (Code + Context)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Step headline + Dark Mac/Linux terminal window + Key Takeaway Bento pill.
                  </div>
                </div>

                {/* Layout 3 */}
                <div
                  onClick={() => onApplyLayout('evidence')}
                  className="p-3 bg-slate-800/70 border border-slate-700/80 hover:border-amber-500 rounded-lg cursor-pointer transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-400 font-mono">LAYOUT 3</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded font-mono">Visuals</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    Output & Visual Evidence (Visual + Metrics)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Headline + 1px subtle bordered chart/screenshot container + 2 Side-by-side KPI boxes.
                  </div>
                </div>

                {/* Layout 4 */}
                <div
                  onClick={() => onApplyLayout('bento')}
                  className="p-3 bg-slate-800/70 border border-slate-700/80 hover:border-purple-500 rounded-lg cursor-pointer transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-400 font-mono">LAYOUT 4</span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded font-mono">Bento</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                    Bento Concept / Key Takeaways
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Box A: Core Definition Problem + Box B: Technical Fix + Box C: Engineering Trade-off Cost.
                  </div>
                </div>

                {/* Layout 5 */}
                <div
                  onClick={() => onApplyLayout('outro')}
                  className="p-3 bg-slate-800/70 border border-slate-700/80 hover:border-blue-500 rounded-lg cursor-pointer transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-400 font-mono">LAYOUT 5</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded font-mono">Outro</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                    The High-Conversion Outro (Slide End)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    # That's a wrap + What was covered bullet list + Author brand card + Bookmark & Comment CTAs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DAILY/WEEKLY COLOR MATRIX ================= */}
        {activeTab === 'palette' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Domain Palette Matrix
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Neutral base with domain-specific accent color rules:
              </p>

              <div className="space-y-3">
                {Object.values(DOMAIN_PALETTES).map((pal) => {
                  const isCurrent = pal.id === currentDomain;
                  return (
                    <div
                      key={pal.id}
                      className={`p-3 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-slate-800 border-sky-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: pal.accent }}
                          />
                          <span className="text-xs font-bold text-slate-100">{pal.name}</span>
                        </div>
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${pal.accent}15`,
                            color: pal.accent,
                          }}
                        >
                          {pal.accent}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 mb-2">
                        <span className="text-slate-500 font-medium">Use for:</span> {pal.accentUsage}
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          onClick={() => onApplyPalette(pal.id, false)}
                          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium border border-slate-700 transition-colors"
                        >
                          This Slide
                        </button>
                        <button
                          onClick={() => onApplyPalette(pal.id, true)}
                          className="flex-1 py-1.5 px-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          All Slides
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: INSPECT & ELEMENT STYLING ================= */}
        {activeTab === 'inspect' && (
          <div className="space-y-5">
            {/* If NO element is selected, show Slide-level settings */}
            {!selectedElement ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-lg text-xs text-slate-400">
                  Select an element on canvas to inspect, or edit current slide settings below:
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                    Slide Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentSlide.background}
                      onChange={(e) => onUpdateSlide({ background: e.target.value })}
                      className="w-10 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentSlide.background}
                      onChange={(e) => onUpdateSlide({ background: e.target.value })}
                      className="flex-1 py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                    />
                  </div>
                  {/* Preset neutral chips */}
                  <div className="flex gap-2 mt-2">
                    {['#0D1117', '#0B0F19', '#141414', '#0F172A', '#030712', '#18181B'].map((bg) => (
                      <button
                        key={bg}
                        onClick={() => onUpdateSlide({ background: bg })}
                        className="w-6 h-6 rounded border border-slate-700 transition-transform hover:scale-110"
                        style={{ backgroundColor: bg }}
                        title={bg}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                    Slide Internal Title
                  </label>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => onUpdateSlide({ title: e.target.value })}
                    className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                  />
                </div>

                {/* Header Rule Controls */}
                <div className="pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Header Rule Settings
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Category Tag Pill</label>
                      <input
                        type="text"
                        value={currentSlide.header?.category || ''}
                        onChange={(e) =>
                          onUpdateSlide({
                            header: {
                              category: e.target.value,
                              brandName: currentSlide.header?.brandName || brandName,
                              showIndex: currentSlide.header?.showIndex ?? true,
                              visible: true,
                            },
                          })
                        }
                        placeholder="e.g. ML STUDY // ARCHITECTURE"
                        className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Rule Controls */}
                <div className="pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Footer Rule Settings
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Topic Subtitle</label>
                      <input
                        type="text"
                        value={currentSlide.footer?.topicTitle || ''}
                        onChange={(e) =>
                          onUpdateSlide({
                            footer: {
                              topicTitle: e.target.value,
                              handle: currentSlide.footer?.handle || '',
                              visible: true,
                            },
                          })
                        }
                        placeholder="Topic summary or swipe CTA"
                        className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* When ELEMENT is selected, render deep styling controls */
              <div className="space-y-4">
                {/* Element Header & Actions */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-400 font-mono uppercase">
                      {selectedElement.type}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {selectedElement.width}×{selectedElement.height}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCenterElement}
                      title="Center horizontally"
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded"
                    >
                      <AlignCenter size={14} />
                    </button>
                    <button
                      onClick={() => onDuplicateElement(selectedElement.id)}
                      title="Duplicate element"
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteElement(selectedElement.id)}
                      title="Delete element"
                      className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Common Dimension / Position inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">X pos (px)</label>
                    <input
                      type="number"
                      value={selectedElement.x}
                      onChange={(e) => onUpdateElement({ ...selectedElement, x: Number(e.target.value) })}
                      className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Y pos (px)</label>
                    <input
                      type="number"
                      value={selectedElement.y}
                      onChange={(e) => onUpdateElement({ ...selectedElement, y: Number(e.target.value) })}
                      className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Width</label>
                    <input
                      type="number"
                      value={selectedElement.width}
                      onChange={(e) => onUpdateElement({ ...selectedElement, width: Number(e.target.value) })}
                      className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Height</label>
                    <input
                      type="number"
                      value={selectedElement.height}
                      onChange={(e) => onUpdateElement({ ...selectedElement, height: Number(e.target.value) })}
                      className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                {/* ================= SPECIFIC ELEMENT TYPE CONTROLS ================= */}

                {/* 1. TEXT CONTROLS */}
                {selectedElement.type === 'text' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Text Content
                      </label>
                      <textarea
                        rows={4}
                        value={(selectedElement as TextElement).content}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, content: e.target.value } as TextElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Font Size</label>
                        <input
                          type="number"
                          value={(selectedElement as TextElement).fontSize}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              fontSize: Number(e.target.value),
                            } as TextElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Color</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={(selectedElement as TextElement).color}
                            onChange={(e) =>
                              onUpdateElement({
                                ...selectedElement,
                                color: e.target.value,
                              } as TextElement)
                            }
                            className="w-8 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={(selectedElement as TextElement).color}
                            onChange={(e) =>
                              onUpdateElement({
                                ...selectedElement,
                                color: e.target.value,
                              } as TextElement)
                            }
                            className="w-full py-1 px-1.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Font Family</label>
                      <select
                        value={(selectedElement as TextElement).fontFamily}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            fontFamily: e.target.value as any,
                          } as TextElement)
                        }
                        className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      >
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Headings)</option>
                        <option value="Inter">Inter (Clean Editorial Body)</option>
                        <option value="JetBrains Mono">JetBrains Mono (Code/Metrics)</option>
                        <option value="Fira Code">Fira Code (Monospace)</option>
                        <option value="system-ui">System Default</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Font Weight</label>
                        <select
                          value={(selectedElement as TextElement).fontWeight}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              fontWeight: Number(e.target.value),
                            } as TextElement)
                          }
                          className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                        >
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">Semibold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="800">Extra Bold (800)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Align</label>
                        <select
                          value={(selectedElement as TextElement).textAlign}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              textAlign: e.target.value as any,
                            } as TextElement)
                          }
                          className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CODE CONTROLS */}
                {selectedElement.type === 'code' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Code Snippet
                      </label>
                      <textarea
                        rows={7}
                        value={(selectedElement as CodeElement).code}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, code: e.target.value } as CodeElement)
                        }
                        className="w-full py-1.5 px-2 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Language</label>
                        <input
                          type="text"
                          value={(selectedElement as CodeElement).language}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              language: e.target.value,
                            } as CodeElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Font Size</label>
                        <input
                          type="number"
                          value={(selectedElement as CodeElement).fontSize}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              fontSize: Number(e.target.value),
                            } as CodeElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Tab File Name</label>
                      <input
                        type="text"
                        value={(selectedElement as CodeElement).fileName || ''}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            fileName: e.target.value,
                          } as CodeElement)
                        }
                        placeholder="e.g. losses/focal_loss.py"
                        className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(selectedElement as CodeElement).windowControls}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              windowControls: e.target.checked,
                            } as CodeElement)
                          }
                          className="rounded border-slate-700"
                        />
                        <span>Mac 3-Dots Window Controls</span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(selectedElement as CodeElement).showLineNumbers}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              showLineNumbers: e.target.checked,
                            } as CodeElement)
                          }
                          className="rounded border-slate-700"
                        />
                        <span>Show Line Numbers</span>
                      </label>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Theme</label>
                      <select
                        value={(selectedElement as CodeElement).theme}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            theme: e.target.value as any,
                          } as CodeElement)
                        }
                        className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      >
                        <option value="dark">Charcoal Dark (#161B22)</option>
                        <option value="midnight">Deep Midnight (#0B0F19)</option>
                        <option value="slate">Slate Blue (#0F172A)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 3. METRIC CONTROLS */}
                {selectedElement.type === 'metric' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Metric Label (Uppercase)
                      </label>
                      <input
                        type="text"
                        value={(selectedElement as MetricElement).label}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, label: e.target.value } as MetricElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Display Value
                      </label>
                      <input
                        type="text"
                        value={(selectedElement as MetricElement).value}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, value: e.target.value } as MetricElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-sm font-mono font-bold text-sky-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        Subtext / Context Note
                      </label>
                      <input
                        type="text"
                        value={(selectedElement as MetricElement).subtext || ''}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, subtext: e.target.value } as MetricElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(selectedElement as MetricElement).accentColor}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              accentColor: e.target.value,
                            } as MetricElement)
                          }
                          className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={(selectedElement as MetricElement).accentColor}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              accentColor: e.target.value,
                            } as MetricElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BENTO CONTROLS */}
                {selectedElement.type === 'bento' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Tag Pill</label>
                      <input
                        type="text"
                        value={(selectedElement as BentoElement).tag}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, tag: e.target.value } as BentoElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={(selectedElement as BentoElement).title}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, title: e.target.value } as BentoElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={(selectedElement as BentoElement).description}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, description: e.target.value } as BentoElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Bullet Items (1 per line)</label>
                      <textarea
                        rows={3}
                        value={(selectedElement as BentoElement).items?.join('\n') || ''}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            items: e.target.value.split('\n').filter(Boolean),
                          } as BentoElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Variant Type</label>
                      <select
                        value={(selectedElement as BentoElement).variant}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            variant: e.target.value as any,
                          } as BentoElement)
                        }
                        className="w-full py-1.5 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      >
                        <option value="optimization">[✓] Optimization / Fix</option>
                        <option value="problem">[!] Problem / Bottleneck</option>
                        <option value="cost">[!] Engineering Trade-off</option>
                        <option value="general">General Definition</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 5. IMAGE CONTROLS */}
                {selectedElement.type === 'image' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Image Source URL / Data URI
                      </label>
                      <input
                        type="text"
                        value={(selectedElement as ImageElement).src}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, src: e.target.value } as ImageElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Caption / Tip
                      </label>
                      <input
                        type="text"
                        value={(selectedElement as ImageElement).caption || ''}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, caption: e.target.value } as ImageElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Border Radius</label>
                        <input
                          type="number"
                          value={(selectedElement as ImageElement).borderRadius}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              borderRadius: Number(e.target.value),
                            } as ImageElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Object Fit</label>
                        <select
                          value={(selectedElement as ImageElement).objectFit}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              objectFit: e.target.value as any,
                            } as ImageElement)
                          }
                          className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200"
                        >
                          <option value="contain">Contain (No Crop)</option>
                          <option value="cover">Cover (Fill)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. BADGE CONTROLS */}
                {selectedElement.type === 'badge' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={(selectedElement as BadgeElement).text}
                        onChange={(e) =>
                          onUpdateElement({ ...selectedElement, text: e.target.value } as BadgeElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono font-bold text-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Text Color</label>
                        <input
                          type="color"
                          value={(selectedElement as BadgeElement).textColor}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              textColor: e.target.value,
                            } as BadgeElement)
                          }
                          className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Border Color</label>
                        <input
                          type="color"
                          value={(selectedElement as BadgeElement).borderColor}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              borderColor: e.target.value,
                            } as BadgeElement)
                          }
                          className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. BULLET LIST CONTROLS */}
                {selectedElement.type === 'bullet_list' && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={(selectedElement as BulletListElement).title || ''}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            title: e.target.value,
                          } as BulletListElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs font-bold text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        List Items (1 per line)
                      </label>
                      <textarea
                        rows={6}
                        value={(selectedElement as BulletListElement).items.join('\n')}
                        onChange={(e) =>
                          onUpdateElement({
                            ...selectedElement,
                            items: e.target.value.split('\n').filter(Boolean),
                          } as BulletListElement)
                        }
                        className="w-full py-1.5 px-2.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
