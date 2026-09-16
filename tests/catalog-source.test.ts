import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import catalog from '../src/data/catalog.json';

test('每個元件都有中文名稱、實際程式碼、可解析的相依檔案與 MIT 授權', () => {
  const manifest = JSON.parse(readFileSync('public/component-source/manifest.json', 'utf8'));
  assert.equal(new Set(catalog.map(item => item.id)).size, catalog.length);
  for (const item of catalog) {
    assert.match(item.name, /[\u3400-\u9fff]/, item.id);
    const files: string[] = manifest.components[item.id];
    assert.ok(files?.length >= 3, `${item.id}: source missing`);
    assert.ok(files.includes('LICENSE'), `${item.id}: license missing`);
    if (item.origin === 'Uiverse') {
      assert.ok(item.author && item.sourceUrl, `${item.id}: attribution missing`);
      assert.ok(files.includes('licenses/UIVERSE-MIT.txt'), `${item.id}: Uiverse license missing`);
    }
    const example = JSON.parse(readFileSync(`public/component-source/${manifest.files[files[0]]}`, 'utf8'));
    assert.match(example, /export default function Example/);
    for (const file of files) {
      const content = JSON.parse(readFileSync(`public/component-source/${manifest.files[file]}`, 'utf8'));
      assert.ok(content.length > 0, `${item.id}: empty ${file}`);
      assert.ok(!content.includes('buy.polar.sh'), `${item.id}: original checkout link`);
    }
  }
});
