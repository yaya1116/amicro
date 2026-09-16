import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Bookmark, Code2, Copy, Moon, MousePointer2, Play, RotateCcw, ShieldCheck, Sun } from 'lucide-react';
import { type CatalogItem, type Theme } from '../../config/catalog';
import { loadSource, type SourceFile } from '../../utils/source';
import { Stage, Waiting } from './Preview';

interface DetailProps {
  item: CatalogItem; theme: Theme; copy: (text: string) => Promise<void>;
  navigate: (path: string) => void; saved: boolean; toggleSaved: () => void;
}

export function Detail({ item, theme, copy, navigate, saved, toggleSaved }: DetailProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [files, setFiles] = useState<SourceFile[]>([]);
  const [sourceError, setSourceError] = useState(false);
  const [selected, setSelected] = useState(0);
  const [revision, setRevision] = useState(0);
  const [previewTheme, setPreviewTheme] = useState(theme);
  useEffect(() => {
    if (tab !== 'code') return;
    const controller = new AbortController();
    setSourceError(false);
    loadSource(item.id, controller.signal).then(setFiles).catch(error => { if (error.name !== 'AbortError') setSourceError(true); });
    return () => controller.abort();
  }, [item.id, tab]);
  return <section className="detail-page">
    <button className="back-button" onClick={() => navigate(`/library/${item.category}`)}><ArrowLeft size={16} /> 回到{item.categoryLabel}</button>
    <div className="detail-heading"><div><span className="eyebrow">{item.categoryLabel}</span><h1>{item.name}</h1><p>{item.description}</p></div>
      <button className={`button button-outline ${saved ? 'saved' : ''}`} onClick={toggleSaved}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? '已收藏' : '加入收藏'}</button>
    </div>
    <div className="detail-workspace"><div className="detail-toolbar">
      <div className="detail-tabs" aria-label="元件內容">
        <button aria-pressed={tab === 'preview'} onClick={() => setTab('preview')}><Play size={15} />預覽</button>
        <button aria-pressed={tab === 'code'} onClick={() => setTab('code')}><Code2 size={16} />程式碼</button>
      </div>
      {tab === 'preview' ? <div className="detail-actions"><button title="切換預覽背景" aria-label="切換預覽背景" onClick={() => setPreviewTheme(t => t === 'light' ? 'dark' : 'light')}>{previewTheme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button><button title="重播動效" aria-label="重播動效" onClick={() => setRevision(n => n + 1)}><RotateCcw size={17} /></button></div>
        : <button className="copy-source" disabled={!files[selected]} onClick={() => copy(files[selected].content)}><Copy size={16} />複製這個檔案</button>}
    </div>
      {tab === 'preview' ? <div className={`detail-stage-theme ${previewTheme === 'dark' ? 'dark' : ''}`} data-preview-theme={previewTheme}><Stage key={`${item.id}-${revision}`} item={item} theme={previewTheme} enlarged /></div>
        : <div className="source-panel">{sourceError ? <p>原始碼暫時無法載入，請重新整理後再試。</p> : files.length ? <><label className="file-select">檔案 <select value={selected} onChange={e => setSelected(Number(e.target.value))}>{files.map((file, i) => <option value={i} key={file.path}>{file.path}</option>)}</select></label><pre><code>{files[selected]?.content}</code></pre></> : <Waiting />}</div>}
    </div>
    {item.origin && <div className="source-credit"><span className="source-credit-label">開源來源</span><strong>{item.origin}</strong>{item.author && <span>作者 @{item.author}</span>}{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">查看原始檔案 <ArrowUpRight size={14} /></a>}</div>}
    <div className="detail-notes"><article><Code2 size={20} /><h3>直接帶進專案</h3><p>元件與引用的本機檔案都列在程式碼分頁，請保留相對路徑。</p><button className="text-link" onClick={() => navigate('/guide')}>查看使用指南 <ArrowUpRight size={15} /></button></article><article><MousePointer2 size={20} /><h3>動手試試看</h3><p>移入、點擊或輕觸預覽。使用右上角按鈕切換背景、重新播放。</p></article><article><ShieldCheck size={20} /><h3>自由使用，好好保留</h3><p>使用元件時請一併保留附帶的 MIT 授權聲明。</p><button className="text-link" onClick={() => navigate('/license')}>使用授權 <ArrowUpRight size={15} /></button></article></div>
  </section>;
}
