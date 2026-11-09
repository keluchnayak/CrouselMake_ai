import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  CarouselProject, 
  CanvasElement, 
  Slide, 
  DomainType, 
  TextElement, 
  CodeElement, 
  MetricElement, 
  BadgeElement, 
  BentoElement, 
  BulletListElement, 
  AuthorCardElement,
  ImageElement
} from './types';
import { TEMPLATES, DOMAIN_PALETTES } from './templates';
import { SAMPLE_ASSETS } from './utils/sampleAssets';
import { HeaderBar } from './components/HeaderBar';
import { SlideCanvas } from './components/SlideCanvas';
import { SidebarControls } from './components/SidebarControls';
import { SlideNavigator } from './components/SlideNavigator';
import { PreviewModal } from './components/PreviewModal';
import { 
  exportSlideAsPNG, 
  exportAllSlidesToPDF, 
  exportProjectAsJSON 
} from './utils/exportEngine';

export const App: React.FC = () => {
  // Current project state
  const [project, setProject] = useState<CarouselProject>(TEMPLATES.mlDeepDive);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('mlDeepDive');
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [selectedElemId, setSelectedElemId] = useState<string | null>(null);

  // Viewport & canvas controls
  const [zoomScale, setZoomScale] = useState<number>(0.52);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // PDF Export feedback state
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);

  // Undo / Redo history stack
  const [history, setHistory] = useState<CarouselProject[]>([TEMPLATES.mlDeepDive]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Keep a ref to push state into history without infinite loops
  const recordHistory = useCallback((newProject: CarouselProject) => {
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, newProject];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Responsive Canvas Zoom Calculation
  const autoFitZoom = useCallback(() => {
    // Total vertical space: window height minus header (64px) and bottom navigator (128px) and paddings
    const availableHeight = window.innerHeight - 250;
    const availableWidth = window.innerWidth - 360; // Subtract sidebar width
    
    const scaleByH = availableHeight / 1350;
    const scaleByW = availableWidth / 1080;
    const calculated = Math.min(scaleByH, scaleByW);
    // Clamp between 0.35 and 0.75 for comfortable desktop / laptop viewing
    setZoomScale(Math.max(0.35, Math.min(calculated, 0.72)));
  }, []);

  useEffect(() => {
    autoFitZoom();
    window.addEventListener('resize', autoFitZoom);
    return () => window.removeEventListener('resize', autoFitZoom);
  }, [autoFitZoom]);

  const currentSlide: Slide = project.slides[activeSlideIdx] || project.slides[0];
  const selectedElement = currentSlide.elements.find((el) => el.id === selectedElemId) || null;

  // Global Keyboard Shortcuts (Undo / Redo / Deselect)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [historyIndex, history]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetState = history[historyIndex - 1];
      setProject(targetState);
      setHistoryIndex((prev) => prev - 1);
      setSelectedElemId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetState = history[historyIndex + 1];
      setProject(targetState);
      setHistoryIndex((prev) => prev + 1);
      setSelectedElemId(null);
    }
  };

  // Update Project with History
  const updateProject = (newProject: CarouselProject, saveHistory = true) => {
    setProject(newProject);
    if (saveHistory) {
      recordHistory(newProject);
    }
  };

  // ================= ELEMENT CRUD =================
  const handleUpdateElement = (updated: CanvasElement) => {
    const slides = [...project.slides];
    const elements = slides[activeSlideIdx].elements.map((el) =>
      el.id === updated.id ? updated : el
    );
    slides[activeSlideIdx] = { ...slides[activeSlideIdx], elements };
    updateProject({ ...project, slides }, false);
  };

  const handleDeleteElement = (id: string) => {
    const slides = [...project.slides];
    slides[activeSlideIdx].elements = slides[activeSlideIdx].elements.filter((e) => e.id !== id);
    updateProject({ ...project, slides });
    setSelectedElemId(null);
  };

  const handleDuplicateElement = (id: string) => {
    const elem = currentSlide.elements.find((el) => el.id === id);
    if (!elem) return;

    const duplicated = {
      ...elem,
      id: `elem-${Date.now()}`,
      x: Math.min(1080 - elem.width - 80, elem.x + 30),
      y: Math.min(1350 - elem.height - 80, elem.y + 30),
    };

    const slides = [...project.slides];
    slides[activeSlideIdx].elements = [...slides[activeSlideIdx].elements, duplicated];
    updateProject({ ...project, slides });
    setSelectedElemId(duplicated.id);
  };

  const handleAddElement = (type: CanvasElement['type'], extra: Partial<CanvasElement> = {}) => {
    const newId = `elem-${Date.now()}`;
    const domainPal = DOMAIN_PALETTES[project.domain] || DOMAIN_PALETTES.ml;

    let newElement: CanvasElement;

    if (type === 'text') {
      newElement = {
        id: newId,
        type: 'text',
        x: 80,
        y: 220,
        width: 800,
        height: 120,
        content: 'New Technical Headline',
        fontSize: 48,
        fontWeight: 800,
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        textAlign: 'left',
        ...extra,
      } as TextElement;
    } else if (type === 'code') {
      newElement = {
        id: newId,
        type: 'code',
        x: 80,
        y: 280,
        width: 920,
        height: 480,
        code: `# Code With K\ndef optimize_pipeline(df: pd.DataFrame) -> torch.Tensor:\n    """Vectorized batch preprocessing"""\n    tensor_x = torch.from_numpy(df.values)\n    return tensor_x.cuda()`,
        language: 'python',
        theme: 'dark',
        fontSize: 20,
        windowControls: true,
        fileName: 'pipeline.py',
        showLineNumbers: true,
        ...extra,
      } as CodeElement;
    } else if (type === 'metric') {
      newElement = {
        id: newId,
        type: 'metric',
        x: 80,
        y: 400,
        width: 440,
        height: 190,
        label: 'PERFORMANCE GAIN',
        value: '+84.2%',
        subtext: 'vs previous benchmark run',
        accentColor: domainPal.accent,
        bgColor: domainPal.surfaceBg,
        borderColor: domainPal.border,
        trend: 'up',
        trendValue: '+84.2%',
        ...extra,
      } as MetricElement;
    } else if (type === 'bento') {
      newElement = {
        id: newId,
        type: 'bento',
        variant: 'optimization',
        x: 80,
        y: 350,
        width: 920,
        height: 220,
        tag: 'CORE TAKEAWAY',
        title: 'Structured Optimization Principle',
        description: 'Explain the technical solution and why standard naive patterns fail on scale datasets.',
        items: ['Point 01: Zero memory overhead', 'Point 02: Hardware-accelerated execution'],
        accentColor: domainPal.accent,
        bgColor: domainPal.surfaceBg,
        borderColor: domainPal.border,
        ...extra,
      } as BentoElement;
    } else if (type === 'badge') {
      newElement = {
        id: newId,
        type: 'badge',
        x: 80,
        y: 130,
        width: 240,
        height: 44,
        text: 'KEY TAKEAWAY',
        bgColor: domainPal.surfaceBg,
        textColor: domainPal.accent,
        borderColor: domainPal.border,
        fontSize: 15,
        ...extra,
      } as BadgeElement;
    } else if (type === 'bullet_list') {
      newElement = {
        id: newId,
        type: 'bullet_list',
        x: 80,
        y: 280,
        width: 920,
        height: 340,
        title: 'KEY ENGINEERING RULES',
        items: [
          '01. Always measure baseline performance before refactoring',
          '02. Isolate memory bounds and profile I/O hotspots',
          '03. Verify production accuracy on held-out test distribution',
        ],
        numbered: true,
        accentColor: domainPal.accent,
        textColor: '#E2E8F0',
        bgColor: domainPal.surfaceBg,
        borderColor: domainPal.border,
        fontSize: 22,
        ...extra,
      } as BulletListElement;
    } else if (type === 'author_card') {
      newElement = {
        id: newId,
        type: 'author_card',
        x: 80,
        y: 650,
        width: 920,
        height: 280,
        name: project.brandName,
        handle: project.handle,
        tagline: 'Documenting my path to Data Science & Engineering Systems mastery. Raw code, practical teardowns, and architecture daily.',
        accentColor: domainPal.accent,
        bgColor: domainPal.surfaceBg,
        borderColor: domainPal.border,
        avatarText: 'CK',
        ...extra,
      } as AuthorCardElement;
    } else {
      newElement = {
        id: newId,
        type: 'image',
        x: 80,
        y: 260,
        width: 920,
        height: 520,
        src: SAMPLE_ASSETS.confusionMatrix,
        caption: 'Normalized Evaluation Visual (1px crisp border)',
        borderRadius: 16,
        borderColor: domainPal.border,
        borderWidth: 1,
        objectFit: 'contain',
        ...extra,
      } as ImageElement;
    }

    const slides = [...project.slides];
    slides[activeSlideIdx].elements = [...slides[activeSlideIdx].elements, newElement];
    updateProject({ ...project, slides });
    setSelectedElemId(newId);
  };

  // ================= 5 MASTER WIREFRAME LAYOUTS APPLIER =================
  const handleApplyLayout = (layoutType: 'hook' | 'code' | 'evidence' | 'bento' | 'outro') => {
    const domainPal = DOMAIN_PALETTES[project.domain] || DOMAIN_PALETTES.ml;
    let newElements: CanvasElement[] = [];

    if (layoutType === 'hook') {
      newElements = [
        {
          id: `b-${Date.now()}`,
          type: 'badge',
          x: 80,
          y: 130,
          width: 240,
          height: 44,
          text: 'CASE STUDY // ARCHITECTURE',
          bgColor: domainPal.surfaceBg,
          textColor: domainPal.accent,
          borderColor: domainPal.border,
          fontSize: 15,
        },
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 220,
          width: 920,
          height: 290,
          content: 'MAIN HEADLINE\nGOES HERE IN 3 LINES\nBOLD & IMPACTFUL.',
          fontSize: 72,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
          lineHeight: 1.15,
        },
        {
          id: `sub-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 540,
          width: 920,
          height: 120,
          content: 'A concrete 1-2 line summary of the problem, the dataset scale, or the core metric achieved.',
          fontSize: 27,
          fontWeight: 400,
          fontFamily: 'Inter',
          color: '#94A3B8',
          textAlign: 'left',
          lineHeight: 1.45,
        },
        {
          id: `m1-${Date.now()}`,
          type: 'metric',
          x: 80,
          y: 720,
          width: 440,
          height: 200,
          label: 'ACCURACY GAIN',
          value: '94.2%',
          subtext: 'vs standard baseline model',
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          trend: 'up',
          trendValue: '+32.4%',
        },
        {
          id: `m2-${Date.now()}`,
          type: 'metric',
          x: 560,
          y: 720,
          width: 440,
          height: 200,
          label: 'QUERY LATENCY',
          value: '-42%',
          subtext: 'Down to 180ms in Postgres',
          accentColor: '#38BDF8',
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          trend: 'down',
          trendValue: '-42%',
        },
        {
          id: `bento-${Date.now()}`,
          type: 'bento',
          variant: 'optimization',
          x: 80,
          y: 960,
          width: 920,
          height: 180,
          tag: 'CORE TAKEAWAY',
          title: 'Structured Bento Principle',
          description: 'Swipe for Architecture & Full Implementation Code.',
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
        },
      ];
    } else if (layoutType === 'code') {
      newElements = [
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 120,
          width: 920,
          height: 60,
          content: 'Step 2: Custom Optimization Function',
          fontSize: 44,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
        },
        {
          id: `sub-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 190,
          width: 920,
          height: 50,
          content: 'Context: Why standard algorithms failed on this skewed production dataset.',
          fontSize: 22,
          fontWeight: 400,
          fontFamily: 'Inter',
          color: '#94A3B8',
          textAlign: 'left',
        },
        {
          id: `code-${Date.now()}`,
          type: 'code',
          x: 80,
          y: 260,
          width: 920,
          height: 580,
          language: 'python',
          theme: 'dark',
          fontSize: 21,
          windowControls: true,
          fileName: 'custom_kernel.py',
          showLineNumbers: true,
          code: `import torch\nimport torch.nn as nn\n\nclass CustomOptimization(nn.Module):\n    def __init__(self, alpha: float = 1.0, gamma: float = 2.0):\n        super().__init__()\n        # Custom penalty hyperparameters\n        self.alpha = alpha\n        self.gamma = gamma\n\n    def forward(self, inputs, targets):\n        # Down-weight easy examples dynamically\n        loss = self.alpha * (1 - inputs) ** self.gamma * targets\n        return loss.mean()`,
        },
        {
          id: `takeaway-${Date.now()}`,
          type: 'bento',
          variant: 'optimization',
          x: 80,
          y: 880,
          width: 920,
          height: 200,
          tag: 'KEY LOGIC PILL',
          title: 'Mathematical Intuition',
          description: 'We penalize easy examples by down-weighting their contribution using the gamma factor. All gradient capacity focuses on minority edge cases.',
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
        },
      ];
    } else if (layoutType === 'evidence') {
      newElements = [
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 120,
          width: 920,
          height: 60,
          content: 'The Final Result & Business Impact',
          fontSize: 46,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
        },
        {
          id: `img-${Date.now()}`,
          type: 'image',
          x: 80,
          y: 220,
          width: 920,
          height: 550,
          src: SAMPLE_ASSETS.confusionMatrix,
          caption: 'Clean Output / Chart Screenshot (1px subtle border, no fuzzy shadows)',
          borderRadius: 16,
          borderColor: domainPal.border,
          borderWidth: 1,
          objectFit: 'contain',
        },
        {
          id: `m1-${Date.now()}`,
          type: 'metric',
          x: 80,
          y: 810,
          width: 440,
          height: 190,
          label: 'PRECISION ON CLASS 1',
          value: '84.6%',
          subtext: 'vs 52.1% baseline',
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          trend: 'up',
          trendValue: '+32.5%',
        },
        {
          id: `m2-${Date.now()}`,
          type: 'metric',
          x: 560,
          y: 810,
          width: 440,
          height: 190,
          label: 'AVG QUERY RUN TIME',
          value: '1.2s',
          subtext: 'Execution plan verified',
          accentColor: '#38BDF8',
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          trend: 'down',
          trendValue: '-88%',
        },
      ];
    } else if (layoutType === 'bento') {
      newElements = [
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 120,
          width: 920,
          height: 70,
          content: 'Core Concepts: Under The Hood',
          fontSize: 48,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
        },
        {
          id: `box-a-${Date.now()}`,
          type: 'bento',
          variant: 'problem',
          x: 80,
          y: 220,
          width: 920,
          height: 240,
          tag: 'BOX A: CORE DEFINITION',
          title: '[!] The Problem',
          description: 'Explain the fundamental bottleneck in 2 crisp, plain English lines without hiding the underlying distribution constraints.',
          items: ['Bottleneck 1: Memory saturation', 'Bottleneck 2: Sequential disk scan'],
          accentColor: '#EF4444',
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
        },
        {
          id: `box-b-${Date.now()}`,
          type: 'bento',
          variant: 'optimization',
          x: 80,
          y: 490,
          width: 440,
          height: 380,
          tag: 'BOX B: TECHNICAL FIX',
          title: '[✓] The Optimization',
          description: 'How we solved the engineering hurdle using vectorization and indexing.',
          items: ['Partition pruning on date', 'Broadcast join for dim tables', 'Covering composite index'],
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
        },
        {
          id: `box-c-${Date.now()}`,
          type: 'bento',
          variant: 'cost',
          x: 560,
          y: 490,
          width: 440,
          height: 380,
          tag: 'BOX C: TRADE-OFF',
          title: '[!] The Cost',
          description: 'The real-world trade-off required to achieve this performance boost.',
          items: ['Requires more memory', 'Slight initial compute lag', 'Strict schema maintenance'],
          accentColor: '#F59E0B',
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
        },
      ];
    } else {
      // Outro
      newElements = [
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 130,
          width: 920,
          height: 90,
          content: "That's a wrap.",
          fontSize: 68,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
        },
        {
          id: `list-${Date.now()}`,
          type: 'bullet_list',
          x: 80,
          y: 240,
          width: 920,
          height: 360,
          title: 'WHAT WAS COVERED TODAY',
          items: [
            '01. The Problem Space & Data Preprocessing',
            '02. Vectorized SQL Query Execution & Indexing',
            '03. Model Evaluation using PR-AUC and Confusion Matrix',
            '04. Production Deployment & Monitoring Rules',
          ],
          numbered: true,
          accentColor: domainPal.accent,
          textColor: '#E2E8F0',
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          fontSize: 21,
        },
        {
          id: `author-${Date.now()}`,
          type: 'author_card',
          x: 80,
          y: 640,
          width: 920,
          height: 280,
          name: project.brandName,
          handle: project.handle,
          tagline: 'Documenting my path to Data Science mastery. Projects, raw code, and practical notes daily.',
          accentColor: domainPal.accent,
          bgColor: domainPal.surfaceBg,
          borderColor: domainPal.border,
          avatarText: 'CK',
        },
        {
          id: `cta1-${Date.now()}`,
          type: 'badge',
          x: 80,
          y: 970,
          width: 440,
          height: 70,
          text: '🔖 BOOKMARK FOR LATER',
          bgColor: domainPal.surfaceBg,
          textColor: domainPal.accent,
          borderColor: domainPal.border,
          fontSize: 18,
        },
        {
          id: `cta2-${Date.now()}`,
          type: 'badge',
          x: 560,
          y: 970,
          width: 440,
          height: 70,
          text: '💬 JOIN THE DISCUSSION / REPLY',
          bgColor: domainPal.surfaceBg,
          textColor: '#38BDF8',
          borderColor: domainPal.border,
          fontSize: 18,
        },
      ];
    }

    const slides = [...project.slides];
    slides[activeSlideIdx] = {
      ...slides[activeSlideIdx],
      layoutType,
      elements: newElements,
    };
    updateProject({ ...project, slides });
    setSelectedElemId(null);
  };

  // ================= DOMAIN PALETTE APPLIER =================
  const handleApplyPalette = (domain: DomainType, allSlides: boolean) => {
    const pal = DOMAIN_PALETTES[domain];
    if (!pal) return;

    if (allSlides) {
      const slides = project.slides.map((s) => ({
        ...s,
        background: pal.baseBg,
        elements: s.elements.map((el) => {
          if (el.type === 'badge') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, textColor: pal.accent };
          }
          if (el.type === 'metric') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          if (el.type === 'bento') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          if (el.type === 'bullet_list') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          if (el.type === 'author_card') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          return el;
        }),
      }));
      updateProject({
        ...project,
        domain,
        accentColor: pal.accent,
        slides,
      });
    } else {
      const slides = [...project.slides];
      slides[activeSlideIdx] = {
        ...slides[activeSlideIdx],
        background: pal.baseBg,
        elements: slides[activeSlideIdx].elements.map((el) => {
          if (el.type === 'badge') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, textColor: pal.accent };
          }
          if (el.type === 'metric') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          if (el.type === 'bento') {
            return { ...el, bgColor: pal.surfaceBg, borderColor: pal.border, accentColor: pal.accent };
          }
          return el;
        }),
      };
      updateProject({ ...project, slides });
    }
  };

  // ================= SLIDE CRUD =================
  const handleAddSlide = () => {
    const domainPal = DOMAIN_PALETTES[project.domain] || DOMAIN_PALETTES.ml;
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: `Slide ${project.slides.length + 1}`,
      background: currentSlide.background,
      layoutType: 'custom',
      header: {
        category: currentSlide.header?.category || 'DATA SYSTEMS',
        brandName: project.brandName,
        showIndex: true,
        visible: true,
      },
      footer: {
        topicTitle: `Section ${project.slides.length + 1}`,
        handle: project.handle,
        visible: true,
      },
      elements: [
        {
          id: `h-${Date.now()}`,
          type: 'text',
          x: 80,
          y: 240,
          width: 920,
          height: 140,
          content: 'Add Your Key Insights Here.',
          fontSize: 60,
          fontWeight: 800,
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          textAlign: 'left',
        },
      ],
    };
    const updated = [...project.slides, newSlide];
    updateProject({ ...project, slides: updated });
    setActiveSlideIdx(project.slides.length);
    setSelectedElemId(null);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = project.slides[index];
    const duplicated: Slide = {
      ...target,
      id: `slide-${Date.now()}`,
      title: `${target.title} (Copy)`,
      elements: target.elements.map((el) => ({ ...el, id: `elem-${Date.now()}-${Math.random()}` })),
    };
    const updated = [...project.slides];
    updated.splice(index + 1, 0, duplicated);
    updateProject({ ...project, slides: updated });
    setActiveSlideIdx(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (project.slides.length <= 1) return;
    const updated = project.slides.filter((_, idx) => idx !== index);
    updateProject({ ...project, slides: updated });
    setActiveSlideIdx(Math.max(0, index - 1));
    setSelectedElemId(null);
  };

  const handleMoveSlide = (from: number, to: number) => {
    const updated = [...project.slides];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updateProject({ ...project, slides: updated });
    setActiveSlideIdx(to);
  };

  // ================= TEMPLATE BLUEPRINT SWITCHER =================
  const handleSelectTemplate = (key: string) => {
    if (TEMPLATES[key]) {
      setSelectedTemplateKey(key);
      setProject(TEMPLATES[key]);
      setActiveSlideIdx(0);
      setSelectedElemId(null);
      recordHistory(TEMPLATES[key]);
    }
  };

  // ================= EXPORT ACTIONS =================
  const handleExportPNG = async () => {
    try {
      const fileName = `${project.brandName}-${project.title}-Slide-${activeSlideIdx + 1}`;
      await exportSlideAsPNG('carousel-canvas', fileName);
    } catch (e) {
      alert('Could not export PNG. Check console for details.');
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      await exportAllSlidesToPDF(project, (current, total) => {
        setExportProgress({ current, total });
      });
    } catch (e) {
      console.error(e);
      alert('PDF generation encountered an issue. Check console.');
    } finally {
      setIsExportingPDF(false);
      setExportProgress(null);
    }
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.slides && Array.isArray(parsed.slides)) {
          setProject(parsed);
          setActiveSlideIdx(0);
          setSelectedElemId(null);
          recordHistory(parsed);
        } else {
          alert('Invalid carousel project file.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <HeaderBar
        brandName={project.brandName}
        projectTitle={project.title}
        onUpdateTitle={(title) => updateProject({ ...project, title })}
        selectedTemplateKey={selectedTemplateKey}
        onSelectTemplate={handleSelectTemplate}
        showSafeZone={showSafeZone}
        onToggleSafeZone={() => setShowSafeZone(!showSafeZone)}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        zoomScale={zoomScale}
        onSetZoom={setZoomScale}
        onAutoFitZoom={autoFitZoom}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onOpenPreview={() => setShowPreviewModal(true)}
        onExportJSON={() => exportProjectAsJSON(project)}
        onImportJSON={handleImportJSON}
        isExportingPDF={isExportingPDF}
        exportProgress={exportProgress}
        accentColor={project.accentColor}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Property Controls & Element Library */}
        <SidebarControls
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onDuplicateElement={handleDuplicateElement}
          onAddElement={handleAddElement}
          onApplyLayout={handleApplyLayout}
          currentSlide={currentSlide}
          onUpdateSlide={(updatedPart) => {
            const slides = [...project.slides];
            slides[activeSlideIdx] = { ...slides[activeSlideIdx], ...updatedPart };
            updateProject({ ...project, slides });
          }}
          onApplyPalette={handleApplyPalette}
          currentDomain={project.domain}
          brandName={project.brandName}
        />

        {/* Center: Scaled Slide Canvas */}
        <main className="flex-1 flex items-center justify-center bg-slate-900/90 relative overflow-auto p-8">
          <SlideCanvas
            slide={currentSlide}
            slideIndex={activeSlideIdx}
            totalSlides={project.slides.length}
            selectedElementId={selectedElemId}
            onSelectElement={setSelectedElemId}
            onUpdateElement={handleUpdateElement}
            onDeleteElement={handleDeleteElement}
            scale={zoomScale}
            showSafeZone={showSafeZone}
            showGrid={showGrid}
            brandName={project.brandName}
            handle={project.handle}
          />
        </main>
      </div>

      {/* Bottom: Multi-Slide Manager Filmstrip */}
      <SlideNavigator
        slides={project.slides}
        activeSlideIndex={activeSlideIdx}
        onSelectSlide={(idx) => {
          setActiveSlideIdx(idx);
          setSelectedElemId(null);
        }}
        onAddSlide={handleAddSlide}
        onDuplicateSlide={handleDuplicateSlide}
        onDeleteSlide={handleDeleteSlide}
        onMoveSlide={handleMoveSlide}
        onOpenPreview={() => setShowPreviewModal(true)}
        accentColor={project.accentColor}
      />

      {/* LinkedIn Mobile Feed Simulator Modal */}
      {showPreviewModal && (
        <PreviewModal
          project={project}
          initialSlideIndex={activeSlideIdx}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
};

export default App;
