import { useEffect, useRef } from 'react';
import elements from '../data/uiverse.json';

const byId = new Map(elements.map(element => [element.id, element]));

export default function UiversePreview({ id, theme }: { id: string; theme: 'light' | 'dark' }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const root = node.shadowRoot ?? node.attachShadow({ mode: 'open' });
    const element = byId.get(id);
    if (!element) return;
    root.innerHTML = `<style>
      :host { display:grid; place-items:center; width:100%; height:100%; color:${theme === 'dark' ? '#fff' : '#111'}; color-scheme:${theme}; }
      .yaya-uiverse-stage { display:flex; align-items:center; justify-content:center; width:100%; min-height:180px; font-family:Inter,ui-sans-serif,system-ui,sans-serif; }
      *, *::before, *::after { box-sizing:border-box; }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; } }
      ${element.css}
    </style><div class="yaya-uiverse-stage">${element.markup}</div>`;
    const preventSubmit = (event: Event) => event.preventDefault();
    root.addEventListener('submit', preventSubmit);
    return () => root.removeEventListener('submit', preventSubmit);
  }, [id, theme]);
  return <div ref={host} className="uiverse-host" aria-label={byId.get(id)?.name || 'Uiverse 元件預覽'} />;
}
