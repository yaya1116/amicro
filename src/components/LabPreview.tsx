import React from 'react';

// Import Motion kit components
import { Dock } from './css-animations/Dock';

// Import Whimsical animations
import { KineticTensionCapsule } from './css-animations/whimsical/KineticTensionCapsule';
import { MatrixGridLoader } from './css-animations/whimsical/MatrixGridLoader';
import { AppleRadialSpinner, PulseOrbitDots } from './css-animations/whimsical/AppleLoaders';

// Import Concept Trios 1
import {
  BookmarkCornerPeel, ShutterSlide, StickyNotePeel, ReceiptTapePrint
} from './css-animations/whimsical/ConceptTrios1';

// Import Concept Trios 2
import {
  StrokeWaveform, PyramidBlockBuild, ScrollCanvasUnroll
} from './css-animations/whimsical/ConceptTrios2';

// Import Concept Trios 3
import {
  DropletSquish, SegmentedLinkStretch, RotatingLouvers,
  SlinkyCoil, SquashStretchSphere, CardDeckCascade, GearToothStep
} from './css-animations/whimsical/ConceptTrios3';

// Import Yui Pure CSS Physics Experiments
import {
  NeonSignDraw, SuddenBrake, RollingTumble, PageTurnCurl,
  ShutterStepBlocks, InertiaSkidStop
} from './css-animations/whimsical/YuiPhysicsExperiments';

// Import Redesigned Physics Trios (Replacements)
import {
  CardStackPeel, ElasticTagSnap, SplitGateReveal, OrigamiEnvelopeUnfold,
  SmartCardDispenser, CircuitTraceDraw, HexagonLatticeDraw, PrismBlockStack,
  ModularTileSnap, RollerBlindDrop, RibbonBannerSlide, GeometricIrisShutter,
  PendulumBubbleLevel, KineticTickingMetronome, NestedOrbitalGimbal,
  DualMagnetDipole, CompassNeedleDeflect
} from './css-animations/whimsical/RedesignedPhysicsTrios';

// Import Redesigned UI Trios (Replacements)
import {
  SegmentedArcMeter, SegmentedStepperDots, CardGlancePreview,
  VerticalWheelCounter, PerspectiveLayoutSwitcher, BookmarkSavePill
} from './css-animations/yui-components/RedesignedUiTrios';

// Import Authentic Whimsical & Physics Variations
import {
  BlindPull, GelatinWobble, DominoChain, MagneticDisks
} from './css-animations/whimsical/WhimsicalVariations';

// Import UI Kit Trios
import {
  FilterTagPill, SubmenuFlyout, MagneticIconButton, MorphActionPill,
  SegmentedStepBar
} from './css-animations/yui-components/UiKitTrios';

// Import 19 UI Micro-Components
import {
  CategorySelect, HoverLinkCard, PlusMinusToggle, LightDarkMorphToggle,
  ProgressStepper, MultiTabCloseBar, DatePositionSelector
} from './css-animations/yui-components/YuiUiKit1';

import {
  ContextMenuEditDelete, DownloadAnimatedIcons, SegmentedABTabs
} from './css-animations/yui-components/YuiUiKit2';


export default function LabPreview({ id, theme = "light" }: { id: string; theme?: "light" | "dark" }) {
const previewLoopTrigger = 0;

    switch (id) {
      case 'dock':
        return (
          <div className="w-full flex items-center justify-center py-2 origin-center">
            <Dock theme={theme} />
          </div>
        );

      // ROW 1: CARD & RIBBON PEEL (3 VARIATIONS)
      case 'anim-card-peel':
        return <div key={`cp-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><CardStackPeel loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-bookmark-corner':
        return <div key={`bmc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><BookmarkCornerPeel loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-elastic-tag':
        return <div key={`et-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ElasticTagSnap loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 2: SPLIT GATES & SHUTTERS (3 VARIATIONS)
      case 'anim-split-gate':
        return <div key={`sg-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SplitGateReveal loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-shutter-slide':
        return <div key={`ss-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ShutterSlide loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-origami-envelope':
        return <div key={`oe-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><OrigamiEnvelopeUnfold loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 3: DISPENSERS & CARDS (3 VARIATIONS)
      case 'anim-card-dispenser':
        return <div key={`cd-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SmartCardDispenser loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-sticky-note':
        return <div key={`sn-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><StickyNotePeel loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-receipt-tape':
        return <div key={`rt-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ReceiptTapePrint loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 4: CIRCUIT & LATTICE DRAWING (3 VARIATIONS)
      case 'anim-circuit-trace':
        return <div key={`ct-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><CircuitTraceDraw loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-hex-lattice':
        return <div key={`hl-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><HexagonLatticeDraw loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-stroke-waveform':
        return <div key={`sw-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><StrokeWaveform loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 5: PRISM & MODULAR BLOCKS (3 VARIATIONS)
      case 'anim-prism-stack':
        return <div key={`ps-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><PrismBlockStack loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-modular-tile':
        return <div key={`mt-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ModularTileSnap loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-pyramid-build':
        return <div key={`pb-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><PyramidBlockBuild loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 6: ROLLERS & SCROLLS (3 VARIATIONS)
      case 'anim-roller-blind':
        return <div key={`rb-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><RollerBlindDrop loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-scroll-canvas':
        return <div key={`sc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ScrollCanvasUnroll loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-ribbon-banner':
        return <div key={`rbs-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><RibbonBannerSlide loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 7: ELASTICITY & MORPHING (3 VARIATIONS)
      case 'anim-tension-capsule':
        return <div key={`tc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><KineticTensionCapsule loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-droplet-squish':
        return <div key={`ds-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><DropletSquish loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-segmented-link':
        return <div key={`sl-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SegmentedLinkStretch loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 8: BLINDS & IRIS SHUTTERS (3 VARIATIONS)
      case 'anim-blind-pull':
        return <div key={`bp-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><BlindPull loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-rotating-louvers':
        return <div key={`rl-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><RotatingLouvers loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-iris-shutter':
        return <div key={`is-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><GeometricIrisShutter loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 9: BUBBLE LEVELS & METRONOMES (3 VARIATIONS)
      case 'anim-bubble-level':
        return <div key={`bl-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><PendulumBubbleLevel loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-kinetic-metronome':
        return <div key={`km-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><KineticTickingMetronome loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-orbital-gimbal':
        return <div key={`og-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><NestedOrbitalGimbal loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 10: HARMONIC SPRINGS (3 VARIATIONS)
      case 'anim-gelatin-wobble':
        return <div key={`gw-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><GelatinWobble loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-slinky-coil':
        return <div key={`sc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SlinkyCoil loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-squash-sphere':
        return <div key={`sqs-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SquashStretchSphere loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 11: CASCADES & DOMINOES (3 VARIATIONS)
      case 'anim-domino-chain':
        return <div key={`dc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><DominoChain loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-card-cascade':
        return <div key={`cdc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><CardDeckCascade loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-gear-step':
        return <div key={`gs-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><GearToothStep loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 12: MAGNETICS & COMPASS (3 VARIATIONS)
      case 'anim-magnetic-disks':
        return <div key={`md-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><MagneticDisks loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-dual-magnet':
        return <div key={`dmd-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><DualMagnetDipole loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-compass-deflect':
        return <div key={`cnd-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><CompassNeedleDeflect loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 13: KINETIC SPEED & INERTIA (3 VARIATIONS) - NEW
      case 'anim-sudden-brake':
        return <div key={`sb-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><SuddenBrake loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-rolling-tumble':
        return <div key={`rtb-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><RollingTumble loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-inertia-skid':
        return <div key={`iss-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><InertiaSkidStop loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 14: NEON & PAGE MECHANICS (3 VARIATIONS) - NEW
      case 'anim-neon-sign':
        return <div key={`ns-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><NeonSignDraw loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-page-turn':
        return <div key={`ptc-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><PageTurnCurl loop={true} trigger="hover" theme={theme} /></div>;
      case 'anim-shutter-blocks':
        return <div key={`ssb-${previewLoopTrigger}`} className="w-full h-full flex items-center justify-center"><ShutterStepBlocks loop={true} trigger="hover" theme={theme} /></div>;

      // ROW 15: LOADERS & SPINNERS (3 VARIATIONS)
      case 'anim-matrix-loader':
        return <MatrixGridLoader theme={theme} />;
      case 'anim-apple-spinner':
        return <AppleRadialSpinner theme={theme} />;
      case 'anim-pulse-dots':
        return <PulseOrbitDots theme={theme} />;

      // ROW 16: SELECTS & MENUS (3 VARIATIONS)
      case 'yui-category-select':
        return <CategorySelect theme={theme} />;
      case 'yui-filter-tag-pill':
        return <FilterTagPill theme={theme} />;
      case 'yui-submenu-flyout':
        return <SubmenuFlyout theme={theme} />;

      // ROW 17: BUTTONS & LINKS (3 VARIATIONS)
      case 'yui-hover-link':
        return <HoverLinkCard theme={theme} />;
      case 'yui-magnetic-icon-btn':
        return <MagneticIconButton theme={theme} />;
      case 'yui-morph-action-pill':
        return <MorphActionPill theme={theme} />;

      // ROW 18: TOGGLES & MODIFIERS (3 VARIATIONS)
      case 'yui-plus-minus-toggle':
        return <PlusMinusToggle theme={theme} />;
      case 'yui-light-dark-toggle':
        return <LightDarkMorphToggle theme={theme} />;
      case 'yui-ab-tabs':
        return <SegmentedABTabs theme={theme} />;

      // ROW 19: PROGRESS & STEPPERS (3 VARIATIONS)
      case 'yui-progress-stepper':
        return <ProgressStepper theme={theme} />;
      case 'yui-segmented-arc-meter':
        return <SegmentedArcMeter theme={theme} />;
      case 'yui-segmented-step-bar':
        return <SegmentedStepBar theme={theme} />;

      // ROW 20: TABS & STEPPERS (3 VARIATIONS)
      case 'yui-multi-tab-close':
        return <MultiTabCloseBar theme={theme} />;
      case 'yui-date-position':
        return <DatePositionSelector theme={theme} />;
      case 'yui-stepper-dots':
        return <SegmentedStepperDots theme={theme} />;

      // ROW 21: ACTION FEEDBACK & GLANCES (3 VARIATIONS)
      case 'yui-context-menu':
        return <ContextMenuEditDelete theme={theme} />;
      case 'yui-glance-preview':
        return <CardGlancePreview theme={theme} />;
      case 'yui-download-icons':
        return <DownloadAnimatedIcons theme={theme} />;

      // ROW 22: CONTROLS & SWITCHERS (3 VARIATIONS)
      case 'yui-wheel-counter':
        return <VerticalWheelCounter theme={theme} />;
      case 'yui-perspective-layout':
        return <PerspectiveLayoutSwitcher theme={theme} />;
      case 'yui-save-pill':
        return <BookmarkSavePill theme={theme} />;

      default:
        return null;
    }
}
