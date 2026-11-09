import React from 'react';
import { CanvasElement } from '../types';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Terminal,
  Bookmark,
  Share2,
  Copy
} from 'lucide-react';

interface ElementRendererProps {
  element: CanvasElement;
  isSelected?: boolean;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({ element }) => {
  switch (element.type) {
    case 'text': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            fontSize: `${element.fontSize}px`,
            fontWeight: element.fontWeight,
            fontFamily: element.fontFamily === 'Plus Jakarta Sans' ? 'Plus Jakarta Sans, sans-serif' :
                        element.fontFamily === 'JetBrains Mono' ? 'JetBrains Mono, monospace' :
                        element.fontFamily === 'Fira Code' ? 'Fira Code, monospace' :
                        'Inter, sans-serif',
            color: element.color,
            textAlign: element.textAlign,
            lineHeight: element.lineHeight || 1.25,
            letterSpacing: element.letterSpacing ? `${element.letterSpacing}px` : 'normal',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
          }}
        >
          {element.content}
        </div>
      );
    }

    case 'badge': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.bgColor,
            color: element.textColor,
            border: `1px solid ${element.borderColor}`,
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: `${element.fontSize}px`,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            fontFamily: 'JetBrains Mono, monospace',
            padding: '0 20px',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {element.text}
        </div>
      );
    }

    case 'metric': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.bgColor,
            border: `1px solid ${element.borderColor}`,
            borderRadius: '16px',
            padding: '24px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {element.label}
            </span>
            {element.trend && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: element.trend === 'up' ? '#10B981' : '#38BDF8',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {element.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {element.trendValue}
              </span>
            )}
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 800,
              color: element.accentColor,
              marginTop: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            {element.value}
          </span>
          {element.subtext && (
            <span
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#64748B',
                marginTop: '6px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {element.subtext}
            </span>
          )}
        </div>
      );
    }

    case 'code': {
      const isMidnight = element.theme === 'midnight';
      const isSlate = element.theme === 'slate';
      const bg = isMidnight ? '#0B0F19' : isSlate ? '#0F172A' : '#161B22';
      const borderColor = element.accentBorder && element.accentBorderColor 
        ? element.accentBorderColor 
        : '#30363D';

      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: bg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {element.windowControls && (
            <div
              style={{
                height: '46px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid #30363D',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                gap: '8px',
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
              {element.fileName && (
                <span
                  style={{
                    marginLeft: '12px',
                    fontSize: '14px',
                    color: '#94A3B8',
                    fontWeight: 600,
                  }}
                >
                  {element.fileName}
                </span>
              )}
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '13px',
                  color: '#64748B',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {element.language}
              </span>
            </div>
          )}

          <div
            style={{
              padding: '24px 28px',
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              gap: '16px',
            }}
          >
            {element.showLineNumbers && (
              <div
                style={{
                  color: '#484F58',
                  fontSize: `${element.fontSize}px`,
                  lineHeight: 1.55,
                  textAlign: 'right',
                  userSelect: 'none',
                  paddingRight: '12px',
                  borderRight: '1px solid #30363D',
                }}
              >
                {element.code.split('\n').map((_, i) => (
                  <div key={i}>{String(i + 1).padStart(2, '0')}</div>
                ))}
              </div>
            )}
            <pre
              style={{
                margin: 0,
                fontSize: `${element.fontSize}px`,
                color: '#E6EDF3',
                lineHeight: 1.55,
                overflow: 'hidden',
                whiteSpace: 'pre',
                fontFamily: 'inherit',
                flex: 1,
              }}
            >
              <code>{element.code}</code>
            </pre>
          </div>
        </div>
      );
    }

    case 'image': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: `${element.borderRadius}px`,
            border: `${element.borderWidth}px solid ${element.borderColor}`,
            overflow: 'hidden',
            backgroundColor: '#161B22',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img
            src={element.src}
            alt={element.caption || 'Slide screenshot'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: element.objectFit,
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </div>
      );
    }

    case 'bento': {
      const getIcon = () => {
        if (element.variant === 'problem') return <AlertTriangle size={18} color="#EF4444" />;
        if (element.variant === 'optimization') return <CheckCircle2 size={18} color={element.accentColor} />;
        return <Info size={18} color={element.accentColor} />;
      };

      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.bgColor,
            border: `1px solid ${element.borderColor}`,
            borderRadius: '16px',
            padding: '24px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '10px',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getIcon()}
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: element.accentColor,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {element.tag}
            </span>
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              lineHeight: 1.25,
            }}
          >
            {element.title}
          </div>
          <div
            style={{
              fontSize: '17px',
              fontWeight: 400,
              color: '#94A3B8',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.45,
            }}
          >
            {element.description}
          </div>

          {element.items && element.items.length > 0 && (
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {element.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: element.accentColor, fontWeight: 700 }}>•</span>
                  <span
                    style={{
                      fontSize: '15px',
                      color: '#E2E8F0',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    case 'bullet_list': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.bgColor || '#161B22',
            border: `1px solid ${element.borderColor || '#30363D'}`,
            borderRadius: '16px',
            padding: '28px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            userSelect: 'none',
          }}
        >
          {element.title && (
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: element.accentColor,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {element.title}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            {element.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span
                  style={{
                    color: element.accentColor,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    fontSize: `${element.fontSize}px`,
                  }}
                >
                  {element.numbered ? `0${idx + 1}.` : '•'}
                </span>
                <span
                  style={{
                    fontSize: `${element.fontSize}px`,
                    color: element.textColor || '#E2E8F0',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.4,
                  }}
                >
                  {item.replace(/^\d+\.\s*/, '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'author_card': {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: element.bgColor,
            border: `1px solid ${element.borderColor}`,
            borderRadius: '16px',
            padding: '30px 36px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: `2px solid ${element.accentColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
              color: element.accentColor,
              fontFamily: 'JetBrains Mono, monospace',
              flexShrink: 0,
            }}
          >
            {element.avatarText || 'CK'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                {element.name}
              </span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: element.accentColor,
                  fontFamily: 'JetBrains Mono, monospace',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  border: `1px solid ${element.borderColor}`,
                }}
              >
                {element.handle}
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#94A3B8',
                lineHeight: 1.4,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {element.tagline}
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
