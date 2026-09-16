import { ArrowRight, ArrowUpRight, Check, Copy, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { site } from '../../config/site';

export function ProductPage({ navigate }: { navigate: (path: string) => void }) {
  const open = Boolean(site.checkoutUrl);
  return <section className="content-page pricing-page">
    <div className="eyebrow">從靈感，到完成作品</div><h1>你的下一步，<br /><span>再多一點可能。</span></h1>
    <p className="page-intro">從元件探索開始，找到適合你現在的創作方式。</p>
    <div className="pricing-grid">
      <article className="plan-card"><span className="plan-tag">開始探索</span><h2>靈感元件庫</h2><div className="plan-price">免費<span>持續探索</span></div><p>試玩互動，找到讓作品更有感的那一個細節。</p>
        <ul><li><Check />完整元件動效預覽</li><li><Check />繁體中文分類與說明</li><li><Check />程式碼查看與複製</li><li><Check />個人靈感收藏</li></ul>
        <button className="button button-outline" onClick={() => navigate('/library')}>開始挑選元件 <ArrowRight size={17} /></button>
      </article>
      <article className="plan-card plan-pro"><div className="plan-top"><span className="plan-tag">進一步創作</span><Sparkles size={22} /></div><h2>{site.productName}</h2>
        <div className="plan-price">{site.productPrice || '準備中'}<span>{site.productPrice ? '方案詳情以商品頁為準' : '內容與價格即將公開'}</span></div>
        <p>想把動效帶進完整專案？實作資源將在這裡與你見面。</p>
        <div className="portaly-note"><ShieldCheck /><div><strong>透過 Portaly 安全結帳</strong><span>付款方式、商品內容與交付說明，請以 Portaly 商品頁為準。</span></div></div>
        {open ? <a className="button button-white" href={site.checkoutUrl!} target="_blank" rel="noopener noreferrer">查看商品與購買 <ArrowUpRight size={17} /></a> : <button className="button button-white" disabled>尚未開放購買</button>}
        <small>{open ? '將在新分頁開啟 Portaly 商品頁' : '先逛逛免費元件，找到你的下一個靈感。'}</small>
      </article>
    </div>
    <div className="faq"><h2>你可能也想知道</h2>
      <details><summary>需要會寫程式才能使用嗎？<Plus size={18} /></summary><p>瀏覽與試玩不需要寫程式。將元件放進作品時，需要 React 專案環境；使用指南會說明安裝與整合方式。</p></details>
      <details><summary>免費元件可以用在商業專案嗎？<Plus size={18} /></summary><p>元件程式碼依 MIT 授權提供，使用與散布時請保留隨附的著作權及授權聲明。圖像、品牌與外部素材需另外確認各自的使用權。</p></details>
      <details><summary>付款完成後，如何取得商品？<Plus size={18} /></summary><p>請依 Portaly 商品頁的交付說明領取，並保留結帳時填寫的信箱與購買憑證。</p></details>
    </div>
  </section>;
}

export function Guide({ copy }: { copy: (text: string) => Promise<void> }) {
  const steps = [
    { title: '找到喜歡的互動', text: '在元件庫切換分類、搜尋效果，或把靈感加入收藏。每個預覽都可以直接操作。', code: null },
    { title: '安裝必要套件', text: '在已設定 Tailwind CSS 的 React 專案中安裝下列套件。圖表元件另需 Recharts。', code: 'npm install motion lucide-react recharts' },
    { title: '查看原始碼，放進專案', text: '開啟元件的「程式碼」分頁。按照檔案清單保留相對路徑，逐一複製元件與引用的檔案，接著匯入並調整文字、配色與節奏。', code: null },
  ];
  return <section className="content-page guide-page"><div className="eyebrow">讓靈感落地</div><h1>三步，把動效<br /><span>放進你的作品。</span></h1><p className="page-intro">以 React、Motion 與 Tailwind CSS 為基礎，從一個小互動開始。</p>
    {steps.map((step, i) => <article className="guide-step" key={step.title}><span className="step-number">0{i + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p>{step.code && <div className="command"><code>{step.code}</code><button aria-label="複製安裝指令" onClick={() => copy(step.code!)}><Copy size={17} /></button></div>}</div></article>)}
    <aside className="guide-tip"><Sparkles /><div><h3>讓動效服務內容</h3><p>用短促的回饋確認操作，用有節奏的進場引導閱讀。記得為偏好減少動態效果的使用者提供靜態替代。</p></div></aside>
  </section>;
}
