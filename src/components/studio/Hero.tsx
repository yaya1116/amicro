import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Check, MousePointer2 } from 'lucide-react';

export function Hero({ browse, pricing }: { browse: () => void; pricing: () => void }) {
  const [liked, setLiked] = useState(false);
  const reduced = useReducedMotion();
  return <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow"><span className="live-dot" /> 給靈感一點推力</div>
      <h1>把靈感，<br />變成<span>互動。</span><i className="heading-star">✳</i></h1>
      <p>少花時間從零開始，多留一點時間做好作品。<br />先免費試玩 332 個動效，再決定要不要帶走即用包。</p>
      <div className="hero-actions"><button className="button button-black" onClick={browse}>先免費試玩 <ArrowDown size={17} /></button><button className="hero-price-link" onClick={pricing}>看 NT$99 即用包 <ArrowUpRight size={15} /></button></div>
      <div className="hero-footnote"><span><Check size={11} />免登入</span><i /><span>React + Motion</span><i /><span>繁體中文</span></div>
    </div>
    <div className="hero-playground" aria-label="互動設計預覽">
      <span className="playground-label">靈感實驗室 <span>001 — ∞</span></span>
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <motion.div className="floating-note" animate={reduced ? {} : { y: [0, -9, 0], rotate: [-7, -4, -7] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="tiny-label">一點細節，很有感。</span><div className="note-shapes"><span /><span /><span /></div>
        <div className="note-caption">小互動，大不同。<ArrowUpRight size={18} /></div>
      </motion.div>
      <motion.div className="chat-bubble" animate={reduced ? {} : { y: [0, 7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><span className="chat-avatar">y</span>這個動效，也太順了吧！<span>✦</span></motion.div>
      <motion.button className={`hero-like ${liked ? 'is-liked' : ''}`} whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }} onClick={() => setLiked(!liked)} aria-pressed={liked}><span>{liked ? '♥' : '♡'}</span>{liked ? '靈感收到了！' : '點我，感受一下'}</motion.button>
      <div className="cursor-sticker"><MousePointer2 fill="currentColor" size={34} /><span>你的下一個好點子</span></div>
      <div className="playground-footer"><span><span className="white-dot" /> LIVE PLAYGROUND</span><span>動手試試 ↗</span></div>
    </div>
  </section>;
}
