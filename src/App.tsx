import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { MotionConfig } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, ExternalLink, Menu, Moon, MousePointer2, Plus, Search, SlidersHorizontal, Sun, X } from 'lucide-react';
import { catalog, categories, featured, type Theme } from './config/catalog';
import { site } from './config/site';
import { Hero } from './components/studio/Hero';
import { Stage } from './components/studio/Preview';
import { ProductPage, Guide } from './components/studio/Pages';
import { Detail } from './components/studio/Detail';
import license from '../LICENSE?raw';

function stored<T,>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}
function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be disabled in private browsing. */ }
}
function Mark() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 5h8l5 9 5-9h8L20 21v7h-8v-7Z" fill="currentColor" /></svg>;
}
const legacy: Record<string, string> = { '/buttons': 'buttons', '/cards': 'cards', '/carousels': 'cards', '/loaders': 'loaders', '/text-animations': 'text', '/mono-charts': 'charts', '/dither-charts': 'dither', '/Anime': 'lab', '/anime': 'lab', '/3d': 'cards' };

export default function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('curated');
  const [limit, setLimit] = useState(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => stored<string>('yaya-motion-theme', 'light') === 'dark' ? 'dark' : 'light');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const value = stored<unknown>('yaya-motion-favorites', []);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && catalog.some(c => c.id === v)) : [];
  });
  const [toast, setToast] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const collectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const pop = () => { setPath(window.location.pathname.replace(/\/$/, '') || '/'); setQuery(''); setMenuOpen(false); };
    window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); save('yaya-motion-theme', theme); }, [theme]);
  useEffect(() => { save('yaya-motion-favorites', favorites); }, [favorites]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2800); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { setLimit(12); }, [query, path, sort]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus(); } if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, []);
  function navigate(next: string) {
    if (next !== path) window.history.pushState(null, '', next);
    setPath(next); setQuery(''); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function navClick(e: MouseEvent<HTMLAnchorElement>, next: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); navigate(next);
  }
  function toggleSaved(id: string) { setFavorites(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); }
  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); setToast('已複製，可以貼進你的專案了。'); }
    catch { setToast('無法使用剪貼簿，請選取程式碼後手動複製。'); }
  }
  const activeCategory = path.startsWith('/library/') ? path.split('/')[2] : legacy[path] || 'all';
  const isSaved = path === '/saved';
  const itemId = path.startsWith('/components/') ? path.split('/').at(-1) : path.split('/').length === 3 && !path.startsWith('/library/') ? path.split('/').at(-1) : undefined;
  const item = catalog.find(c => c.id === itemId);
  const isPricing = path === '/pricing' || path === '/sponsors';
  const isGuide = path === '/guide' || path === '/cli' || path === '/skills';
  const isLicense = path === '/license';
  const isCatalog = (path === '/' || path === '/library' || path.startsWith('/library/') || Boolean(legacy[path]) || isSaved) && categories.some(c => c.id === activeCategory);
  const category = categories.find(c => c.id === activeCategory);
  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    const matches = catalog.filter(c => (activeCategory === 'all' || c.category === activeCategory) && (!isSaved || favorites.includes(c.id)) && (!q || `${c.name} ${c.original} ${c.description} ${c.categoryLabel} ${c.id}`.toLocaleLowerCase().includes(q)));
    return matches.sort(sort === 'name' ? (a, b) => a.name.localeCompare(b.name, 'zh-Hant') : (a, b) => {
      const ia = featured.indexOf(a.id), ib = featured.indexOf(b.id); return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    });
  }, [activeCategory, isSaved, favorites, query, sort]);
  const pageName = item?.name || (isPricing ? '方案與購買' : isGuide ? '使用指南' : isLicense ? '使用授權' : isSaved ? '我的收藏' : category?.name || '找不到頁面');
  useEffect(() => { document.title = `${pageName} · ${site.name}`; }, [pageName]);
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">跳到主要內容</a>
    <header className="site-header">
      <a className="wordmark" href="/" onClick={e => navClick(e, '/')} aria-label={`${site.name} 首頁`}><Mark /><span>yaya<span className="wordmark-light">motion</span><i>✳</i></span></a>
      <nav className="top-nav" aria-label="主要導覽"><a href="/library" className={isCatalog ? 'active' : ''} onClick={e => navClick(e, '/library')}>探索元件</a><a href="/guide" className={isGuide ? 'active' : ''} onClick={e => navClick(e, '/guide')}>使用指南</a><a href="/pricing" className={isPricing ? 'active' : ''} onClick={e => navClick(e, '/pricing')}>方案與購買</a></nav>
      <div className="header-actions"><button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? '切換深色模式' : '切換淺色模式'}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><a className="header-cta" href="/pricing" onClick={e => navClick(e, '/pricing')}>創作加一點料 <ArrowUpRight size={15} /></a><button className="icon-button menu-toggle" aria-label={menuOpen ? '關閉選單' : '開啟選單'} aria-expanded={menuOpen} aria-controls="sidebar" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <div className="app-layout">
      {menuOpen && <button className="sidebar-scrim" aria-label="關閉選單" onClick={() => setMenuOpen(false)} />}
      <aside id="sidebar" className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top"><span className="section-kicker">你的動效工具箱</span><span className="version-badge">01</span></div>
        <nav className="category-nav" aria-label="元件分類">{categories.map(c => <a key={c.id} href={c.id === 'all' ? '/library' : `/library/${c.id}`} className={isCatalog && !isSaved && activeCategory === c.id ? 'selected' : ''} aria-current={isCatalog && !isSaved && activeCategory === c.id ? 'page' : undefined} onClick={e => navClick(e, c.id === 'all' ? '/library' : `/library/${c.id}`)}><c.icon size={17} /><span>{c.name}</span><small>{c.id === 'all' ? catalog.length : catalog.filter(i => i.category === c.id).length}</small></a>)}</nav>
        <div className="sidebar-divider" /><a className={`saved-link ${isSaved ? 'selected' : ''}`} href="/saved" onClick={e => navClick(e, '/saved')}><Bookmark size={17} /><span>我的收藏</span><small>{favorites.length}</small></a>
        <nav className="mobile-navigation" aria-label="其他頁面"><a href="/guide" onClick={e => navClick(e, '/guide')}>使用指南 <ArrowUpRight size={15} /></a><a href="/pricing" onClick={e => navClick(e, '/pricing')}>方案與購買 <ArrowUpRight size={15} /></a></nav>
        <div className="sidebar-note"><span className="note-symbol">✳</span><h3>好點子，<br />值得動起來。</h3><p>把一點小互動，<br />變成作品裡的大亮點。</p><a href="/guide" onClick={e => navClick(e, '/guide')}>從這裡開始 <ArrowUpRight size={15} /></a><div className="mini-grid" /></div>
        <div className="sidebar-bottom"><span className="live-dot" /> 為創作保留一點玩心</div>
      </aside>
      <main id="main" className="main-content" tabIndex={-1}>
        <div className="workspace-topline"><div><span className="breadcrumb-brand">YAYA MOTION</span><span>/</span><span>{pageName}</span></div><span className="edition">互動元件研究室 <span>✳</span></span></div>
        {isCatalog ? <>
          {path === '/' && <Hero browse={() => collectionRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} />}
          <section className="collection" ref={collectionRef} id="collection">
            <div className="collection-heading"><div><div className="eyebrow">{isSaved ? '留住每個好點子' : activeCategory === 'all' ? '找到你的下一個靈感' : '一點互動，更多可能'}</div><h2>{isSaved ? '我的靈感收藏' : category?.name}<span className="count-badge">{results.length}</span></h2></div>{!isSaved && <span className="collection-hint"><MousePointer2 size={14} /> 移入或點擊，動手試試</span>}</div>
            <div className="collection-controls"><label className="search-box"><Search size={19} /><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="搜尋元件、動效或靈感…" aria-label="搜尋元件" />{query ? <button aria-label="清除搜尋" onClick={() => setQuery('')}><X size={16} /></button> : <kbd>⌘ K</kbd>}</label><label className="sort-control"><SlidersHorizontal size={16} /><select value={sort} aria-label="排序方式" onChange={e => setSort(e.target.value)}><option value="curated">編輯精選</option><option value="name">名稱排序</option></select><ChevronDown size={14} /></label></div>
            {results.length ? <><div className="component-grid">{results.slice(0, limit).map((c, i) => <article className="component-card" key={c.id}>
              <div className="card-stage-wrap"><span className="card-index">{String(i + 1).padStart(2, '0')}</span><button className={`save-button ${favorites.includes(c.id) ? 'is-saved' : ''}`} aria-label={`${favorites.includes(c.id) ? '取消收藏' : '收藏'}${c.name}`} aria-pressed={favorites.includes(c.id)} onClick={() => toggleSaved(c.id)}><Bookmark size={16} fill={favorites.includes(c.id) ? 'currentColor' : 'none'} /></button><Stage item={c} theme={theme} /><span className="stage-hint">試玩一下 <MousePointer2 size={11} /></span></div>
              <a className="card-info" href={`/components/${c.id}`} onClick={e => navClick(e, `/components/${c.id}`)}><div><span className="card-category">{c.categoryLabel}</span><h3>{c.name}</h3></div><span className="card-open"><ArrowUpRight size={18} /></span></a>
            </article>)}</div>{limit < results.length && <div className="load-more"><button className="button button-outline" onClick={() => setLimit(n => n + 12)}>再找一點靈感 <Plus size={17} /></button><span>已顯示 {Math.min(limit, results.length)} / {results.length} 個元件</span></div>}</>
              : <div className="empty-state"><Search size={32} /><h3>{query ? '這個靈感，還沒找到。' : '你的靈感收藏，從這裡開始。'}</h3><p>{query ? '試試「按鈕」、「圓環」或「卡片」等關鍵字。' : '點選元件右上角的書籤，把喜歡的互動留在這裡。'}</p><button className="button button-outline" onClick={() => { setQuery(''); if (isSaved) navigate('/library'); }}>{query ? '清除搜尋' : '探索元件'}</button></div>}
          </section>
          <section className="bottom-banner"><div><span className="eyebrow">少一點從零開始，多一點自己的風格</span><h2>挑一個喜歡的，<br className="mobile-break" />開始你的下一件作品。</h2></div><a href="/guide" onClick={e => navClick(e, '/guide')}>查看使用指南 <ArrowUpRight /></a></section>
        </> : item ? <Detail key={item.id} item={item} theme={theme} copy={copy} navigate={navigate} saved={favorites.includes(item.id)} toggleSaved={() => toggleSaved(item.id)} />
          : isPricing ? <ProductPage navigate={navigate} /> : isGuide ? <Guide copy={copy} />
            : isLicense ? <section className="content-page"><span className="eyebrow">使用與開源聲明</span><h1>放心創作，<br /><span>也尊重每份貢獻。</span></h1><p className="page-intro">Yaya Motion 的介面與中文內容經重新設計，部分互動元件基於 Amicro 開源專案。相關程式碼依 MIT 授權提供；再散布時須保留原著作權與授權條款。</p><pre className="license-text">{license}</pre><a className="text-link" href="https://github.com/Subhan-code/Amicro--Micro-transitions-" target="_blank" rel="noopener noreferrer">原始開源專案 <ExternalLink size={15} /></a></section>
              : <section className="empty-state"><h1>這個頁面迷路了。</h1><p>回到元件庫，繼續找靈感吧。</p><button className="button button-black" onClick={() => navigate('/library')}>回到元件庫 <ArrowRight size={16} /></button></section>}
        <footer className="site-footer"><span><Mark /> {site.name} <small>讓好設計，動起來。</small></span><div><a href="/license" onClick={e => navClick(e, '/license')}>使用授權</a><a href="/guide" onClick={e => navClick(e, '/guide')}>使用指南</a><span>© {new Date().getFullYear()} Yaya</span></div></footer>
      </main>
    </div>
    {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
  </MotionConfig>;
}
