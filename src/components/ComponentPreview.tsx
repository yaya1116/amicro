import React from 'react';

// Mono Charts imports
import { MonoActivityHeatmap } from './mono-charts/MonoActivityHeatmap';
import { MonoRoundedLineChart } from './mono-charts/MonoRoundedLineChart';
import { MonoRoundedBarChart } from './mono-charts/MonoRoundedBarChart';
import { MonoRoundedAreaChart } from './mono-charts/MonoRoundedAreaChart';
import { MonoRoundedDonutChart } from './mono-charts/MonoRoundedDonutChart';
import { MonoRoundedComposedChart } from './mono-charts/MonoRoundedComposedChart';
import { MonoRoundedScatterChart } from './mono-charts/MonoRoundedScatterChart';
import { MonoRoundedCandlestickChart } from './mono-charts/MonoRoundedCandlestickChart';
import { MonoRoundedKpiCardChart } from './mono-charts/MonoRoundedKpiCardChart';
import { MonoRoundedPyramidChart } from './mono-charts/MonoRoundedPyramidChart';
import { MonoRoundedRadialBarGroup } from './mono-charts/MonoRoundedRadialBarGroup';
import { MonoRoundedGaugeArc } from './mono-charts/MonoRoundedGaugeArc';
import { MonoRoundedBulletChart } from './mono-charts/MonoRoundedBulletChart';
import { MonoRoundedSankeyChart } from './mono-charts/MonoRoundedSankeyChart';
import { MonoRoundedStepChart } from './mono-charts/MonoRoundedStepChart';
import { MonoRoundedStackedBarChart } from './mono-charts/MonoRoundedStackedBarChart';
import { MonoRoundedRadarChart } from './mono-charts/MonoRoundedRadarChart';
import { MonoRoundedRadialGaugeChart } from './mono-charts/MonoRoundedRadialGaugeChart';
import { MonoRoundedFunnelChart } from './mono-charts/MonoRoundedFunnelChart';
import { MonoRoundedHeatmapChart } from './mono-charts/MonoRoundedHeatmapChart';
import { MonoRoundedSparklineChart } from './mono-charts/MonoRoundedSparklineChart';
import { MonoRoundedBubbleChart } from './mono-charts/MonoRoundedBubbleChart';
import { MonoRoundedTreemapChart } from './mono-charts/MonoRoundedTreemapChart';
import { MonoRoundedStreamChart } from './mono-charts/MonoRoundedStreamChart';
import { MonoRoundedMeterChart } from './mono-charts/MonoRoundedMeterChart';
import { MonoRoundedWaterfallChart } from './mono-charts/MonoRoundedWaterfallChart';
import { MonoRoundedPolarChart } from './mono-charts/MonoRoundedPolarChart';
import { MonoRoundedRangeChart } from './mono-charts/MonoRoundedRangeChart';

// Dither Charts imports
import { DitherDonutChart } from './dither-charts/DitherDonutChart';
import { DitherGrowthChart } from './dither-charts/DitherGrowthChart';
import { DitherStackedChart } from './dither-charts/DitherStackedChart';
import { DitherFunnelChart } from './dither-charts/DitherFunnelChart';
import { ActivityHeatmap } from './dither-charts/ActivityHeatmap';
import { ServerGauge } from './dither-charts/ServerGauge';
import { TrafficBubble } from './dither-charts/TrafficBubble';
import { DeviceUsageChart } from './dither-charts/DeviceUsageChart';
import { StorageUsageChart } from './dither-charts/StorageUsageChart';
import { RevenueLineChart } from './dither-charts/RevenueLineChart';
import { UptimeChart } from './dither-charts/UptimeChart';

// Cards & Carousels imports
import { CardArc5 } from './cards/CardArc5';
import { CardArc7 } from './cards/CardArc7';
import { CardLongArc5 } from './cards/CardLongArc5';
import { CardLinearSpread } from './cards/CardLinearSpread';
import { CardCornerFan } from './cards/CardCornerFan';
import { CardStampArc } from './cards/CardStampArc';
import { CardCascadeStagger } from './cards/CardCascadeStagger';
import { CardScatterSpread } from './cards/CardScatterSpread';
import { CardWheelFan } from './cards/CardWheelFan';
import { CardCarousel } from './cards/CardCarousel';
import { CardCoverFlow } from './cards/CardCoverFlow';
import { CardTimeMachine } from './cards/CardTimeMachine';

// Buttons import
import { AnimatedButton } from './AnimatedButton';
import { buttonsData } from '../data/buttons';

// Loaders import
import { loaderGroups } from '../data/loaders';


import { AnimatedText } from './text/AnimatedText';
import { textAnimationsData } from '../data/textAnimations';
import { DitherBook } from './dither-charts/DitherBook';
import names from '../data/zh-TW.json';
export default function ComponentPreview({ id, theme = 'light', active = true }: { id: string; theme?: 'light' | 'dark'; active?: boolean }) {
  const aliases: Record<string, string> = {"dither-stacked": "dither-stacked", "dither-area": "dither-growth", "dither-activity": "activity-heatmap", "dither-server": "server-gauge", "dither-traffic": "traffic-bubble", "dither-device": "device-usage", "dither-storage": "storage-usage", "dither-revenue": "revenue-line", "dither-uptime": "uptime-chart"};
  aliases['dither-heatmap'] = 'activity-heatmap';
  aliases['dither-gauge'] = 'server-gauge';
  const chartId = aliases[id] || id;
  const stageTheme = theme;
  if (id === 'dither-book') return <DitherBook theme={theme} />;
  const text = textAnimationsData.find(item => item.id === id);
  if (text) return <AnimatedText config={text} theme={theme} />;
  if (id.startsWith('mono-activity-')) return <MonoActivityHeatmap theme={theme} accentColor={id.split('-').at(-1) as 'green' | 'blue' | 'purple'} />;

    // 1. Mono Charts
    switch (chartId) {
      case 'mono-rounded-line':
        return <MonoRoundedLineChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-bar':
        return <MonoRoundedBarChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-area':
        return <MonoRoundedAreaChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-donut':
        return <MonoRoundedDonutChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-composed':
        return <MonoRoundedComposedChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-scatter':
        return <MonoRoundedScatterChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-candlestick':
        return <MonoRoundedCandlestickChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-kpi':
        return <MonoRoundedKpiCardChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-pyramid':
        return <MonoRoundedPyramidChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-radial-group':
        return <MonoRoundedRadialBarGroup theme={stageTheme} compact={false} />;
      case 'mono-rounded-gauge-arc':
        return <MonoRoundedGaugeArc theme={stageTheme} compact={false} />;
      case 'mono-rounded-bullet':
        return <MonoRoundedBulletChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-sankey':
        return <MonoRoundedSankeyChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-step':
        return <MonoRoundedStepChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-stacked-bar':
        return <MonoRoundedStackedBarChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-radar':
        return <MonoRoundedRadarChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-radial-gauge':
        return <MonoRoundedRadialGaugeChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-funnel':
        return <MonoRoundedFunnelChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-heatmap':
        return <MonoRoundedHeatmapChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-sparkline':
        return <MonoRoundedSparklineChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-bubble':
        return <MonoRoundedBubbleChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-treemap':
        return <MonoRoundedTreemapChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-stream':
        return <MonoRoundedStreamChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-meter':
        return <MonoRoundedMeterChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-waterfall':
        return <MonoRoundedWaterfallChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-polar':
        return <MonoRoundedPolarChart theme={stageTheme} compact={false} />;
      case 'mono-rounded-range':
        return <MonoRoundedRangeChart theme={stageTheme} compact={false} />;
      case 'mono-activity-green':
        return <MonoActivityHeatmap theme={stageTheme} accentColor="green" />;
      case 'mono-activity-blue':
        return <MonoActivityHeatmap theme={stageTheme} accentColor="blue" />;
      case 'mono-activity-purple':
        return <MonoActivityHeatmap theme={stageTheme} accentColor="purple" />;

      // 2. Dither Visualizers
      case 'dither-donut':
        return <DitherDonutChart theme={stageTheme} compact={false} />;
      case 'dither-growth':
        return <DitherGrowthChart theme={stageTheme} compact={false} />;
      case 'dither-stacked':
        return <DitherStackedChart theme={stageTheme} compact={false} />;
      case 'dither-funnel':
        return <DitherFunnelChart theme={stageTheme} compact={false} />;
      case 'activity-heatmap':
        return <ActivityHeatmap theme={stageTheme} />;
      case 'server-gauge':
        return <ServerGauge theme={stageTheme} />;
      case 'traffic-bubble':
        return <TrafficBubble theme={stageTheme} />;
      case 'device-usage':
        return <DeviceUsageChart theme={stageTheme} />;
      case 'storage-usage':
        return <StorageUsageChart theme={stageTheme} />;
      case 'revenue-line':
        return <RevenueLineChart theme={stageTheme} />;
      case 'uptime-chart':
        return <UptimeChart theme={stageTheme} />;

      // 3. Cards & Carousels
      case 'card-arc-5':
      case 'c1':
        return <CardArc5 hovered={active} />;
      case 'card-arc-7':
      case 'c2':
        return <CardArc7 hovered={active} />;
      case 'card-long-arc-5':
      case 'c3':
        return <CardLongArc5 hovered={active} />;
      case 'card-linear-spread':
      case 'c4':
        return <CardLinearSpread hovered={active} />;
      case 'card-corner-fan':
      case 'c5':
        return <CardCornerFan hovered={active} />;
      case 'card-stamp-arc':
      case 'c6':
        return <CardStampArc hovered={active} />;
      case 'card-cascade-stagger':
      case 'c8':
        return <CardCascadeStagger hovered={active} />;
      case 'card-scatter-spread':
      case 'c9':
        return <CardScatterSpread hovered={active} />;
      case 'card-wheel-fan':
      case 'c10':
        return <CardWheelFan hovered={active} />;
      case 'card-carousel':
      case 'c11':
        return <CardCarousel hovered={active} />;
      case 'card-cover-flow':
      case 'c12':
        return <CardCoverFlow hovered={active} />;
      case 'card-time-machine':
      case 'c13':
        return <CardTimeMachine hovered={active} />;
      case 'card-carousel-mono':
        return <CardCarousel hovered={active} isMonochrome={true} />;
      case 'card-cover-flow-mono':
        return <CardCoverFlow hovered={active} isMonochrome={true} />;
      case 'card-time-machine-mono':
        return <CardTimeMachine hovered={active} isMonochrome={true} />;
    }

    // 4. Buttons
    const foundBtn = buttonsData.find((b) => b.id === chartId || `btn-${b.id}` === chartId);
    if (foundBtn) {
      return <AnimatedButton config={{ ...foundBtn, label: names[foundBtn.label] || foundBtn.label }} layoutMode="grid" theme={stageTheme} />;
    }

    // 5. Loaders
    for (const group of loaderGroups) {
      const foundLoader = group.loaders.find((l) => l.kebabName === chartId || l.name.toLowerCase().replace(/\s+/g, '-') === chartId);
      if (foundLoader) {
        const LoaderComponent = foundLoader.component;
        return <LoaderComponent theme={stageTheme} />;
      }
    }

  return <p>找不到這個元件的預覽。</p>;
}
