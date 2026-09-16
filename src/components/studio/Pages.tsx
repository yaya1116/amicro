import { ArrowRight, ArrowUpRight, Check, Clock3, Copy, PackageCheck, Plus, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import { site } from '../../config/site';

export function ProductPage({ navigate }: { navigate: (path: string) => void }) {
  const open = Boolean(site.checkoutUrl);
  return <section className="content-page pricing-page">
    <div className="eyebrow">少一點整理，多一點完成</div><h1>喜歡的動效，<br /><span>今天就放進作品。</span></h1>
    <p className="page-intro">先免費試玩，再用一杯飲料的價格，省下整理、安裝與反覆查資料的時間。</p>
    <div className="value-strip" aria-label="即用包的主要價值"><span><Clock3 />省下整理時間</span><span><PackageCheck />下載後直接開始</span><span><WandSparkles />中文指南與修改提示</span></div>
    <div className="pricing-grid">
      <article className="plan-card"><span className="plan-tag">先確認適不適合你</span><h2>靈感元件庫</h2><div className="plan-price">免費<span>不用註冊，也不用留下信用卡</span></div><p>先動手試玩，確定這些互動真的適合你的作品。</p>
        <ul><li><Check />完整元件動效預覽</li><li><Check />繁體中文分類與說明</li><li><Check />程式碼查看與複製</li><li><Check />個人靈感收藏</li></ul>
        <button className="button button-outline" onClick={() => navigate('/library')}>先免費試玩 <ArrowRight size={17} /></button>
      </article>
      <article className="plan-card plan-pro"><div className="plan-top"><span className="plan-tag">想少走一點整理的路</span><Sparkles size={22} /></div><h2>{site.productName}</h2>
        <div className="price-line"><div className="plan-price">{site.productPrice}<span>一次買斷，不是訂閱</span></div><span className="price-anchor">約一杯飲料</span></div>
        <p>免費版給你靈感；即用包把零散步驟整理好，讓你更快做出完成品。</p>
        <ul><li><Check />整理好的 React 範例專案</li><li><Check />繁體中文安裝與修改指南</li><li><Check />改文字、配色與節奏的 AI 提示詞</li><li><Check />可直接拆用的頁面搭配範例</li></ul>
        <div className="portaly-note"><ShieldCheck /><div><strong>透過 Portaly 安全結帳</strong><span>付款方式、商品內容與交付說明，請以 Portaly 商品頁為準。</span></div></div>
        {open ? <a className="button button-white" href={site.checkoutUrl!} target="_blank" rel="noopener noreferrer">用 NT$99 省下整理時間 <ArrowUpRight size={17} /></a> : <button className="button button-white" disabled>即將開放購買</button>}
        <small>{open ? '新分頁開啟 Portaly；付款後依商品頁說明取得內容' : '金流設定中；免費元件仍可完整試玩與使用。'}</small>
      </article>
    </div>
    <section className="decision-section"><div><span className="eyebrow">你買的不是更多檔案</span><h2>你買的是少查幾篇教學，<br />少踩幾次安裝的坑。</h2></div><div className="decision-list"><p><strong>適合你，如果</strong><span>你會 React、想快速加入動效，不想再花時間整理散落的檔案。</span></p><p><strong>先用免費版，如果</strong><span>你只是想找靈感、慢慢研究，或目前還沒有要做的專案。</span></p></div></section>
    <div className="faq"><h2>你可能也想知道</h2>
      <details><summary>需要會寫程式才能使用嗎？<Plus size={18} /></summary><p>瀏覽與試玩不需要寫程式。將元件放進作品時，需要 React 專案環境；使用指南會說明安裝與整合方式。</p></details>
      <details><summary>免費元件可以用在商業專案嗎？<Plus size={18} /></summary><p>元件程式碼依 MIT 授權提供，使用與散布時請保留隨附的著作權及授權聲明。圖像、品牌與外部素材需另外確認各自的使用權。</p></details>
      <details><summary>付款完成後，如何取得商品？<Plus size={18} /></summary><p>請依 Portaly 商品頁的交付說明領取，並保留結帳時填寫的信箱與購買憑證。</p></details>
      <details><summary>買了之後還需要付月費嗎？<Plus size={18} /></summary><p>不需要。這是一次買斷的數位商品，不會每月自動扣款；實際販售內容仍以 Portaly 商品頁標示為準。</p></details>
      <details><summary>即用包和免費元件差在哪裡？<Plus size={18} /></summary><p>免費元件適合逐一探索與研究；即用包提供整理好的專案、中文指南、修改提示與搭配範例，價值在於幫你節省整合時間。</p></details>
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
