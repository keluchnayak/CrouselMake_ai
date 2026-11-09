export type ElementType =
  | 'text'
  | 'badge'
  | 'code'
  | 'metric'
  | 'image'
  | 'bento'
  | 'bullet_list'
  | 'author_card';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity?: number;
  zIndex?: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  fontWeight: number | string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'JetBrains Mono' | 'Fira Code' | 'system-ui';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  isMonospace?: boolean;
}

export interface BadgeElement extends BaseElement {
  type: 'badge';
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  fontSize: number;
  iconName?: string;
}

export interface CodeElement extends BaseElement {
  type: 'code';
  code: string;
  language: string;
  theme: 'dark' | 'midnight' | 'slate' | 'light';
  fontSize: number;
  windowControls?: boolean;
  fileName?: string;
  showLineNumbers?: boolean;
  accentBorder?: boolean;
  accentBorderColor?: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  caption?: string;
  borderRadius: number;
  borderColor: string;
  borderWidth: number;
  objectFit: 'cover' | 'contain';
}

export interface MetricElement extends BaseElement {
  type: 'metric';
  label: string;
  value: string;
  subtext?: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface BentoElement extends BaseElement {
  type: 'bento';
  variant: 'problem' | 'optimization' | 'cost' | 'general';
  tag: string;
  title: string;
  description: string;
  items?: string[];
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

export interface BulletListElement extends BaseElement {
  type: 'bullet_list';
  title?: string;
  items: string[];
  numbered?: boolean;
  accentColor: string;
  textColor: string;
  bgColor?: string;
  borderColor?: string;
  fontSize: number;
}

export interface AuthorCardElement extends BaseElement {
  type: 'author_card';
  name: string;
  handle: string;
  tagline: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  avatarText?: string;
}

export type CanvasElement =
  | TextElement
  | BadgeElement
  | CodeElement
  | ImageElement
  | MetricElement
  | BentoElement
  | BulletListElement
  | AuthorCardElement;

export interface SlideHeader {
  category: string;
  brandName: string;
  showIndex: boolean;
  visible: boolean;
}

export interface SlideFooter {
  topicTitle: string;
  handle: string;
  ctaText?: string;
  visible: boolean;
}

export interface Slide {
  id: string;
  title: string;
  background: string;
  layoutType?: 'hook' | 'code' | 'evidence' | 'bento' | 'outro' | 'custom';
  header?: SlideHeader;
  footer?: SlideFooter;
  elements: CanvasElement[];
}

export type DomainType = 'ml' | 'sql' | 'powerbi' | 'notes' | 'custom';

export interface DomainPalette {
  id: DomainType;
  name: string;
  baseBg: string;
  surfaceBg: string;
  border: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  accentUsage: string;
}

export interface CarouselProject {
  id: string;
  title: string;
  brandName: string;
  domain: DomainType;
  accentColor: string;
  handle: string;
  slides: Slide[];
}
