import React, { useRef, useState, useEffect } from 'react';
import { Slide, CanvasElement } from '../types';
import { ElementRenderer } from './ElementRenderer';

interface SlideCanvasProps {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (updated: CanvasElement) => void;
  onDeleteElement?: (id: string) => void;
  scale: number;
  showSafeZone: boolean;
  showGrid: boolean;
  brandName: string;
  handle: string;
}

type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  slideIndex,
  totalSlides,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  scale,
  showSafeZone,
  showGrid,
  brandName,
  handle,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [dragState, setDragState] = useState<{
    id: string;
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
  } | null>(null);

  // Resizing state
  const [resizeState, setResizeState] = useState<{
    id: string;
    handle: ResizeHandle;
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    elemW: number;
    elemH: number;
  } | null>(null);

  // Keyboard navigation / nudging
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedElementId) return;

      // Do not capture if user is typing in an input or textarea
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement
      ) {
        return;
      }

      const currentElem = slide.elements.find((el) => el.id === selectedElementId);
      if (!currentElem) return;

      const step = e.shiftKey ? 10 : 1;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        onUpdateElement({ ...currentElem, y: currentElem.y - step });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        onUpdateElement({ ...currentElem, y: currentElem.y + step });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onUpdateElement({ ...currentElem, x: currentElem.x - step });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onUpdateElement({ ...currentElem, x: currentElem.x + step });
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (onDeleteElement) {
          e.preventDefault();
          onDeleteElement(selectedElementId);
        }
      } else if (e.key === 'Escape') {
        onSelectElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, slide.elements, onUpdateElement, onDeleteElement, onSelectElement]);

  // Pointer Down for Dragging an Element
  const handleElementPointerDown = (e: React.PointerEvent, elem: CanvasElement) => {
    e.stopPropagation();
    onSelectElement(elem.id);

    setDragState({
      id: elem.id,
      startX: e.clientX,
      startY: e.clientY,
      elemX: elem.x,
      elemY: elem.y,
    });

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Pointer Down for Resizing
  const handleResizePointerDown = (
    e: React.PointerEvent,
    handle: ResizeHandle,
    elem: CanvasElement
  ) => {
    e.stopPropagation();
    setResizeState({
      id: elem.id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      elemX: elem.x,
      elemY: elem.y,
      elemW: elem.width,
      elemH: elem.height,
    });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Pointer Move (handles both drag and resize)
  const handleCanvasPointerMove = (e: React.PointerEvent) => {
    if (dragState) {
      const dx = (e.clientX - dragState.startX) / scale;
      const dy = (e.clientY - dragState.startY) / scale;

      const currentElem = slide.elements.find((el) => el.id === dragState.id);
      if (!currentElem) return;

      onUpdateElement({
        ...currentElem,
        x: Math.round(dragState.elemX + dx),
        y: Math.round(dragState.elemY + dy),
      });
      return;
    }

    if (resizeState) {
      const dx = (e.clientX - resizeState.startX) / scale;
      const dy = (e.clientY - resizeState.startY) / scale;

      const currentElem = slide.elements.find((el) => el.id === resizeState.id);
      if (!currentElem) return;

      let newX = resizeState.elemX;
      let newY = resizeState.elemY;
      let newW = resizeState.elemW;
      let newH = resizeState.elemH;

      const minW = 60;
      const minH = 30;

      // Handle calculations
      if (resizeState.handle.includes('e')) {
        newW = Math.max(minW, Math.round(resizeState.elemW + dx));
      }
      if (resizeState.handle.includes('s')) {
        newH = Math.max(minH, Math.round(resizeState.elemH + dy));
      }
      if (resizeState.handle.includes('w')) {
        const potentialW = Math.max(minW, Math.round(resizeState.elemW - dx));
        newX = Math.round(resizeState.elemX + (resizeState.elemW - potentialW));
        newW = potentialW;
      }
      if (resizeState.handle.includes('n')) {
        const potentialH = Math.max(minH, Math.round(resizeState.elemH - dy));
        newY = Math.round(resizeState.elemY + (resizeState.elemH - potentialH));
        newH = potentialH;
      }

      onUpdateElement({
        ...currentElem,
        x: newX,
        y: newY,
        width: newW,
        height: newH,
      });
    }
  };

  const handleCanvasPointerUp = () => {
    setDragState(null);
    setResizeState(null);
  };

  const formattedSlideNum = String(slideIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalSlides).padStart(2, '0');

  return (
    <div
      style={{
        width: `${1080 * scale}px`,
        height: `${1350 * scale}px`,
        position: 'relative',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        backgroundColor: slide.background,
        borderRadius: '8px',
        userSelect: 'none',
      }}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
      onClick={() => onSelectElement(null)}
    >
      <div
        ref={canvasRef}
        id="carousel-canvas"
        style={{
          width: '1080px',
          height: '1350px',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          backgroundColor: slide.background,
          overflow: 'hidden',
        }}
      >
        {/* Subtle Grid overlay (optional toggle) */}
        {showGrid && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}

        {/* 80px LinkedIn Safe Zone Margin Overlay */}
        {showSafeZone && (
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: '80px',
              width: '920px',
              height: '1190px',
              border: '1.5px dashed rgba(56, 189, 248, 0.35)',
              pointerEvents: 'none',
              zIndex: 9000,
              borderRadius: '4px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 6,
                left: 10,
                fontSize: '11px',
                color: 'rgba(56, 189, 248, 0.7)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              80px SAFE MARGIN [920 × 1190 PX ACTIVE AREA]
            </div>
          </div>
        )}

        {/* HEADER RULE (Every Slide) */}
        {slide.header?.visible !== false && (
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
              pointerEvents: 'none',
            }}
          >
            {/* Category tag pill */}
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '1.2px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                }}
              />
              {slide.header?.category || 'DATA SYSTEMS'}
            </div>

            {/* Brand Signature + Slide index [03/07] */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  letterSpacing: '-0.3px',
                }}
              >
                {slide.header?.brandName || brandName}
              </span>
              {slide.header?.showIndex !== false && (
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#64748B',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  [{formattedSlideNum}/{formattedTotal}]
                </span>
              )}
            </div>
          </div>
        )}

        {/* FOOTER RULE (Every Slide) */}
        {slide.footer?.visible !== false && (
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
              zIndex: 50,
              pointerEvents: 'none',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '14px',
            }}
          >
            {/* Topic Title */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748B',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#38BDF8' }}>✦</span>
              <span>{slide.footer?.topicTitle || slide.title}</span>
            </div>

            {/* Micro handle */}
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#64748B',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {slide.footer?.handle || handle}
            </div>
          </div>
        )}

        {/* Slide Elements */}
        {slide.elements.map((el) => {
          const isSelected = el.id === selectedElementId;

          return (
            <div
              key={el.id}
              onPointerDown={(e) => handleElementPointerDown(e, el)}
              style={{
                position: 'absolute',
                left: `${el.x}px`,
                top: `${el.y}px`,
                width: `${el.width}px`,
                height: `${el.height}px`,
                cursor: dragState?.id === el.id ? 'grabbing' : 'grab',
                outline: isSelected ? '2px solid #38BDF8' : 'none',
                outlineOffset: '2px',
                zIndex: isSelected ? 100 : el.zIndex || 10,
                transition: dragState?.id === el.id ? 'none' : 'outline-color 0.15s ease',
              }}
            >
              <ElementRenderer element={el} isSelected={isSelected} />

              {/* Selection & Resizing Bounding Box */}
              {isSelected && (
                <>
                  {/* Top-Left */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'nw', el)}
                    style={{ ...handleStyle, top: -5, left: -5, cursor: 'nwse-resize' }}
                  />
                  {/* Top */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'n', el)}
                    style={{ ...handleStyle, top: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' }}
                  />
                  {/* Top-Right */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'ne', el)}
                    style={{ ...handleStyle, top: -5, right: -5, cursor: 'nesw-resize' }}
                  />
                  {/* Right */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'e', el)}
                    style={{ ...handleStyle, top: '50%', right: -5, transform: 'translateY(-50%)', cursor: 'ew-resize' }}
                  />
                  {/* Bottom-Right */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'se', el)}
                    style={{ ...handleStyle, bottom: -5, right: -5, cursor: 'nwse-resize' }}
                  />
                  {/* Bottom */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 's', el)}
                    style={{ ...handleStyle, bottom: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' }}
                  />
                  {/* Bottom-Left */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'sw', el)}
                    style={{ ...handleStyle, bottom: -5, left: -5, cursor: 'nesw-resize' }}
                  />
                  {/* Left */}
                  <div
                    onPointerDown={(e) => handleResizePointerDown(e, 'w', el)}
                    style={{ ...handleStyle, top: '50%', left: -5, transform: 'translateY(-50%)', cursor: 'ew-resize' }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const handleStyle: React.CSSProperties = {
  position: 'absolute',
  width: '10px',
  height: '10px',
  backgroundColor: '#38BDF8',
  border: '1.5px solid #0B0F19',
  borderRadius: '2px',
  zIndex: 101,
  boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
};
