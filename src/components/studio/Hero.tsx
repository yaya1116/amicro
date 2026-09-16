import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MousePointer2 } from 'lucide-react';

export function Hero({ browse }: { browse: () => void }) {
  const [liked, setLiked] = useState(false);
  const reduced = useReducedMotion();
  return <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow"><span className="live-dot" /> 給靈感一點推力</div>
      <h1>把靈感，<br />變成<span>互動。</span><i className="heading-star">✳</i></h1>
      <p>為每一次點擊，設計剛剛好的回應。<br />探索、試玩、複製，把喜歡的動效帶進你的作品。</p>
      <button className="button button-black" onClick={browse}>探索元件庫 <ArrowDown size={17} /></button>
      <div className="hero-footnote"><span>React</span><i /><span>Motion</span><i /><span>繁體中文說明</span></div>
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
