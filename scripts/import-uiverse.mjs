import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error('Usage: node scripts/import-uiverse.mjs /path/to/uiverse-galaxy');

const plan = {
  Buttons: 12,
  Cards: 4,
  Inputs: 8,
  Forms: 4,
  Checkboxes: 8,
  'Toggle-switches': 8,
  'Radio-buttons': 4,
  loaders: 8,
  Tooltips: 2,
  Notifications: 2,
};

const categoryMap = {
  Buttons: ['buttons', '按鈕互動', '可直接套用的按鈕狀態與回饋。'],
  Cards: ['cards', '卡片與輪播', '整理內容層次，加入清楚的互動回饋。'],
  Inputs: ['forms', '表單輸入', '輸入欄位已整理成可預覽、可複製的 React 元件。'],
  Forms: ['forms', '表單輸入', '表單區塊已整理成可預覽、可複製的 React 元件。'],
  Checkboxes: ['controls', '選擇控制', '適合設定、篩選與選擇流程的互動控制項。'],
  'Toggle-switches': ['controls', '選擇控制', '適合設定、篩選與選擇流程的互動控制項。'],
  'Radio-buttons': ['controls', '選擇控制', '適合設定、篩選與選擇流程的互動控制項。'],
  loaders: ['loaders', '載入動效', '用清楚的節奏回應等待與處理狀態。'],
  Tooltips: ['feedback', '提示與回饋', '在需要的時刻補充資訊，不打斷主要操作。'],
  Notifications: ['feedback', '提示與回饋', '用明確的視覺層次傳達系統狀態。'],
};

const typeNames = {
  Buttons: '動態按鈕', Cards: '互動卡片', Inputs: '浮動輸入框', Forms: '精簡表單',
  Checkboxes: '動態核取方塊', 'Toggle-switches': '切換開關', 'Radio-buttons': '單選控制',
  loaders: '節奏載入器', Tooltips: '情境提示', Notifications: '狀態通知',
};

function splitFile(folder, filename) {
  const raw = readFileSync(path.join(sourceRoot, folder, filename), 'utf8');
  const match = raw.match(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/i);
  if (!match) return null;
  const markup = raw.replace(match[0], '').trim();
  const css = match[1].trim();
  if (raw.length < 450 || raw.length > 12_000) return null;
  if (/<(?:script|iframe|object|embed|img|video|audio|link)\b/i.test(markup)) return null;
  if (/\bon\w+\s*=|javascript:|https?:\/\//i.test(markup)) return null;
  if (/@import|url\s*\(|position\s*:\s*fixed|(^|[,}\s])(?:html|body)\s*[{,]/im.test(css)) return null;
  if (!/<(?:button|input|label|div|span|svg|form)\b/i.test(markup)) return null;
  const [author, slug] = filename.replace(/\.html$/, '').split(/_(.+)/);
  return { raw, markup, css, author, slug };
}

function score(candidate) {
  const text = `${candidate.css} ${candidate.markup}`;
  let value = 0;
  if (/(#(?:0{2,3}ff|06f|2563eb|1d4ed8|3b82f6|1e40af)|blue|rgb\([^)]*255)/i.test(text)) value += 18;
  if (/#(?:000|111|0a0a0a|fff|ffffff)\b/i.test(text)) value += 9;
  if (/(transition|animation|:hover|:checked)/i.test(text)) value += 7;
  if (/<svg\b/i.test(text)) value += 3;
  value -= Math.abs(candidate.raw.length - 3200) / 700;
  return value;
}

function localize(markup) {
  const replacements = [
    [/Bubble Button/gi, '氣泡按鈕'], [/File Explorer/gi, '選擇檔案'],
    [/click to download/gi, '點擊開始下載'], [/Download/gi, '下載'],
    [/Hover!/gi, '移入試試'], [/For Free!/gi, '免費取得'],
    [/uiverse\.io/gi, 'Yaya Motion'], [/Tooltip/gi, '提示內容'],
    [/This is the article title/gi, '讓介面更有感的設計細節'],
    [/Lorem ipsum dolor sit amet consectetur adipiscing elit, donec suspendisse vulputate dictumst enim per mus imperdiet, platea non massa dictum tempus sapien\./gi, '精選實用的互動細節，讓內容清楚、操作自然，也替開發省下一段時間。'],
    [/Lorem ipsum dolor sit amet, consectetur adipisicing elit\./gi, '用簡潔層次整理資訊，讓重要內容更容易被看見。'],
    [/>\s*Category\s*</gi, '>設計靈感<'], [/>\s*Show\s*</gi, '>查看內容<'], [/>\s*See More\s*</gi, '>查看更多<'],
    [/>JUNE</gi, '>六月<'], [/GeForce RTX 4090/gi, '創作者顯示卡'],
    [/>size\s*:</gi, '>尺寸：<'], [/>color\s*:</gi, '>顏色：<'], [/>buy now</gi, '>立即選購<'],
    [/Loading users/gi, '正在載入使用者'], [/Load more/gi, '載入更多'],
    [/Date:\s*&nbsp;(?:&nbsp;)*MMYYYY/gi, '日期：YYYYMM'],
    [/Type for validate/gi, '輸入內容以驗證'], [/Full Name/gi, '姓名'],
    [/Search For AnyThink\.\./gi, '搜尋任何內容…'], [/Search\.\.\./gi, '搜尋…'],
    [/Type something\.\.\./gi, '輸入一些內容…'], [/Write a message/gi, '寫下訊息'],
    [/Signup now and get full access to our app\./gi, '立即註冊，開始使用完整功能。'],
    [/Confirm password/gi, '確認密碼'], [/Firstname/gi, '名字'], [/Lastname/gi, '姓氏'],
    [/Already have an acount \?/gi, '已經有帳號？'], [/Register/gi, '建立帳號'], [/Signin/gi, '登入'],
    [/Spotify/gi, 'Yaya Music'], [/Welcome Back, Loyd/gi, '歡迎回來'], [/Forgot password\?/gi, '忘記密碼？'],
    [/Email Address/gi, '電子郵件'], [/>Login</gi, '>登入<'],
    [/>\s*Email\s*</gi, '>電子郵件<'], [/>\s*Password\s*</gi, '>密碼<'],
    [/>\s*CheckBox\s*</gi, '>核取方塊<'], [/>\s*Check\s*</gi, '>開啟<'], [/>\s*Bluetooth\s*</gi, '>藍牙<'],
    [/>Value 1</gi, '>選項一<'], [/>Value 2</gi, '>選項二<'], [/>Value 3</gi, '>選項三<'],
    [/>Left</gi, '>靠左<'], [/>Middle</gi, '>置中<'], [/>Right</gi, '>靠右<'],
    [/>EARTH</gi, '>地球<'], [/>MARS</gi, '>火星<'], [/>MOON</gi, '>月球<'],
    [/Initializing\.\.\./gi, '準備中…'], [/Loading \.\.\./gi, '載入中…'],
    [/Show (?:Tooltip|提示內容)/gi, '查看提示'], [/I am looking for a job\. Trainee\/junior React dev\./gi, '這是補充資訊，也可以放操作說明。'], [/📍Ukraine\./gi, '📍提示位置'],
    [/3D Card/gi, '立體卡片'], [/>pink</gi, '>粉色<'], [/>blue</gi, '>藍色<'], [/>green</gi, '>綠色<'],
    [/LEVEL UP !!!/gi, '升級完成！'], [/CONGRATULATIONS !!!/gi, '恭喜完成！'], [/Level Up!/gi, '升級完成！'], [/world 1-1/gi, '第一階段'], [/Reload or click ↓/gi, '重新整理或點擊 ↓'],
    [/placeholder=(['"])Search\1/gi, 'placeholder="搜尋…"'],
    [/placeholder=(['"])Email\1/gi, 'placeholder="電子郵件"'],
    [/placeholder=(['"])Password\1/gi, 'placeholder="密碼"'],
    [/placeholder=(['"])Username\1/gi, 'placeholder="使用者名稱"'],
    [/>\s*Submit\s*</gi, '>送出<'], [/>\s*Search\s*</gi, '>搜尋<'],
    [/>\s*Loading\s*</gi, '>載入中<'], [/>\s*Login\s*</gi, '>登入<'],
    [/>\s*Sign in\s*</gi, '>登入<'], [/>\s*Continue\s*</gi, '>繼續<'],
    [/>\s*Button\s*</gi, '>開始使用<'], [/>\s*Click me\s*</gi, '>點我試試<'],
  ];
  let result = replacements.reduce((text, [pattern, value]) => text.replace(pattern, value), markup);
  if (result.includes('transition-delay:350ms') && result.includes('>U</span>')) {
    result = result.replace(/<label>[\s\S]*?<\/label>/, '<label><span style="transition-delay:0ms">使</span><span style="transition-delay:80ms">用</span><span style="transition-delay:160ms">者</span><span style="transition-delay:240ms">名</span><span style="transition-delay:320ms">稱</span></label>');
  }
  return result;
}

const output = [];
for (const [folder, count] of Object.entries(plan)) {
  const candidates = readdirSync(path.join(sourceRoot, folder))
    .filter(file => file.endsWith('.html'))
    .map(file => ({ file, ...splitFile(folder, file) }))
    .filter(item => item.markup)
    .sort((a, b) => score(b) - score(a) || a.file.localeCompare(b.file))
    .slice(0, count);
  if (candidates.length !== count) throw new Error(`${folder}: wanted ${count}, found ${candidates.length}`);
  candidates.forEach((candidate, index) => {
    const [category, categoryLabel, description] = categoryMap[folder];
    const id = `ui-${folder.toLowerCase().replace(/[^a-z]+/g, '-')}-${candidate.slug}`;
    output.push({
      id,
      original: candidate.slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
      name: `${typeNames[folder]} ${String(index + 1).padStart(2, '0')}`,
      category,
      categoryLabel,
      description,
      interaction: folder.toLowerCase(),
      origin: 'Uiverse',
      author: candidate.author,
      sourceUrl: `https://github.com/uiverse-io/galaxy/blob/main/${encodeURIComponent(folder)}/${encodeURIComponent(candidate.file)}`,
      markup: localize(candidate.markup),
      css: candidate.css,
    });
  });
}

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/uiverse.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(`Imported ${output.length} curated Uiverse components.`);
