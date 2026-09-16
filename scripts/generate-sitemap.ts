import { writeFileSync } from 'node:fs';
import catalog from '../src/data/catalog.json';

const origin = process.env.SITE_URL;
if (!origin) throw new Error('請先設定 SITE_URL 為正式網站的 HTTPS 網域。');
const url = new URL(origin);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
  throw new Error('SITE_URL 必須是 HTTPS 根網域，例如 https://example.com。');
}
const routes = ['/', '/library', '/guide', '/pricing', '/license',
  ...new Set(catalog.map(item => `/library/${item.category}`)),
  ...catalog.map(item => `/components/${item.id}`)];
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(route => `  <url><loc>${url.origin}${route}</loc></url>`).join('\n') + '\n</urlset>\n';
writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`);
console.log(`已建立 ${routes.length} 個網址的 sitemap。`);
