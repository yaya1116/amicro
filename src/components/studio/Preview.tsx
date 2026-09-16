import React, { lazy, Suspense, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { LoaderCircle } from 'lucide-react';
import type { CatalogItem, Theme } from '../../config/catalog';

const ComponentPreview = lazy(() => import('../ComponentPreview'));
const LabPreview = lazy(() => import('../LabPreview'));
const UiversePreview = lazy(() => import('../UiversePreview'));

export function Waiting() {
  return <span className="preview-loading"><LoaderCircle size={20} />載入預覽中</span>;
}

class PreviewBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <p className="preview-loading">預覽暫時無法載入，請重新整理。</p> : this.props.children;
  }
}

export function Stage({ item, theme, enlarged = false }: { item: CatalogItem; theme: Theme; enlarged?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '100px' });
  const [active, setActive] = useState(false);
  const fullForm = item.origin === 'Uiverse' && item.interaction === 'forms';
  return <div ref={ref} className={`component-stage stage-${item.category} ${fullForm ? 'stage-full-form' : ''} ${enlarged ? 'stage-large' : ''}`}
    onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} onFocus={() => setActive(true)}
    onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(false); }} onTouchStart={() => setActive(true)}>
    {visible && <PreviewBoundary key={item.id}><Suspense fallback={<Waiting />}>
      <div className="preview-content">{item.origin === 'Uiverse'
        ? <UiversePreview id={item.id} theme={theme} />
        : item.category === 'lab'
        ? <LabPreview id={item.id} theme={theme} />
        : <ComponentPreview id={item.id} theme={theme} active={enlarged || active} />}</div>
    </Suspense></PreviewBoundary>}
  </div>;
}
