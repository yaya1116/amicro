import { Grid2X2, MousePointer2, Layers, Type, LoaderCircle, BarChart3, Box, Sparkles, ListChecks, SlidersHorizontal, MessageSquareText } from 'lucide-react';
import catalog from '../data/catalog.json';

export interface CatalogItem {
  id: string; original: string; name: string; category: string; categoryLabel: string;
  description: string; interaction: string; origin?: string; author?: string; sourceUrl?: string;
}
export type Theme = 'light' | 'dark';
export const categories = [
  { id: 'all', name: '全部元件', icon: Grid2X2 },
  { id: 'buttons', name: '按鈕互動', icon: MousePointer2 },
  { id: 'cards', name: '卡片與輪播', icon: Layers },
  { id: 'forms', name: '表單輸入', icon: ListChecks },
  { id: 'controls', name: '選擇控制', icon: SlidersHorizontal },
  { id: 'feedback', name: '提示與回饋', icon: MessageSquareText },
  { id: 'text', name: '文字動態', icon: Type },
  { id: 'loaders', name: '載入動效', icon: LoaderCircle },
  { id: 'charts', name: '數據圖表', icon: BarChart3 },
  { id: 'dither', name: '網點圖表', icon: Box },
  { id: 'lab', name: '互動實驗', icon: Sparkles },
];
export const featured = ['btn-1', 'card-arc-5', 'pulse-dots', 'txt-stagger', 'anim-elastic-tag', 'mono-rounded-donut', 'btn-33', 'card-cover-flow', 'yui-morph-action-pill', 'dither-revenue', 'txt-shimmer', 'anim-origami-envelope'];
export { catalog };
