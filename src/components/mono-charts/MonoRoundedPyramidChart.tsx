import React from 'react';

interface PyramidLevel {
  label: string;
  widthPct: number;
  opacity: number;
}

const PYRAMID_LEVELS: PyramidLevel[] = [
  { label: "決策層", widthPct: 30, opacity: 1 },
  { label: "管理層", widthPct: 50, opacity: 0.7 },
  { label: "資深成員", widthPct: 70, opacity: 0.45 },
  { label: "核心團隊", widthPct: 90, opacity: 0.25 },
];

interface MonoRoundedPyramidChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedPyramidChart({ theme = 'dark', compact = false }: MonoRoundedPyramidChartProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        compact ? 'h-[220px] sm:h-[268px]' : 'min-h-[290px]'
      } ${
        isDark
          ? 'bg-[#181818] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
          : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 text-black hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              金字塔層級
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              層級
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            4 層 <span className="text-xs font-normal opacity-70">結構化</span>
          </div>
        </div>
      </div>

      {/* Main Stage Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex flex-col items-center justify-around gap-2 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {PYRAMID_LEVELS.map((lvl, idx) => (
          <div
            key={idx}
            className="h-6 sm:h-7 rounded-xl transition-all flex items-center justify-center border hover:scale-105 cursor-pointer"
            style={{
              width: `${lvl.widthPct}%`,
              backgroundColor: isDark ? `rgba(255,255,255,${lvl.opacity})` : `rgba(9,9,11,${lvl.opacity})`,
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(9,9,11,0.2)',
              color: isDark ? (lvl.opacity > 0.6 ? '#000000' : '#FFFFFF') : (lvl.opacity > 0.6 ? '#FFFFFF' : '#000000'),
            }}
          >
            <span className="text-[10px] font-bold font-mono tracking-tight">{lvl.label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>圓角層級</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>金字塔結構</span>
      </div>
    </div>
  );
}
