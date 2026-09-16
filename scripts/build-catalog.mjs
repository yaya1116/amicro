import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
const names = JSON.parse(readFileSync('src/data/zh-TW.json', 'utf8'));
const uiverse = JSON.parse(readFileSync('src/data/uiverse.json', 'utf8'));
function objects(file) {
  const sf = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const items = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const obj = {};
      for (const p of node.properties) {
        if (ts.isPropertyAssignment(p) && ts.isStringLiteral(p.initializer)) obj[p.name.getText(sf)] = p.initializer.text;
      }
      if ((obj.id || obj.kebabName) && (obj.description || obj.interactionType || obj.kebabName)) items.push(obj);
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return items;
}
const specs = [
  ['buttons.tsx', 'buttons', '按鈕互動', '讓點擊多一點回饋。移入、點擊或輕觸，試試不同的狀態變化。'],
  ['cards.ts', 'cards', '卡片與輪播', '把資訊整理成有層次的卡片。移入預覽區，觀察展開的節奏與空間感。'],
  ['loaders.ts', 'loaders', '載入動效', '用細緻的節奏陪伴等待，適合資料載入、進度回饋與空白狀態。'],
  ['textAnimations.ts', 'text', '文字動態', '讓文字在恰好的時刻登場。點擊預覽可以重新播放。'],
  ['monoCharts.ts', 'charts', '數據圖表', '讓數據更容易閱讀，以圖形、層次與互動呈現資訊。'],
  ['ditherCharts.ts', 'dither', '網點圖表', '為數據加入細緻網點紋理，適合具有個性的儀表板與作品展示。'],
  ['cssAnimationsData.ts', 'lab', '互動實驗', '探索更有趣的介面回饋。移入或點擊預覽，體驗動態細節。'],
];
const entries = specs.flatMap(([file, category, categoryLabel, description]) => objects(`src/data/${file}`).map(item => {
  const original = item.label || item.name;
  const id = category === 'buttons' ? `btn-${item.id}` : category === 'cards' ? item.interactionType : category === 'loaders' ? item.kebabName : item.id;
  if (!names[original]) throw new Error(`Missing translation: ${original}`);
  return { id, original, name: names[original], category, categoryLabel, description, interaction: item.interactionType || item.category || category };
}));
entries.push({ id: 'dither-book', original: 'Dither Book', name: '立體翻頁手冊', category: 'cards', categoryLabel: '卡片與輪播', description: '翻動紙張，試試立體書頁的光影與空間層次。', interaction: '3d' });
entries.push(...uiverse.map(({ markup, css, ...item }) => item));
if (new Set(entries.map(e => e.id)).size !== entries.length) throw new Error('Duplicate component IDs');
writeFileSync('src/data/catalog.json', JSON.stringify(entries, null, 2) + '\n');
console.log(`Generated ${entries.length} localized components.`);
