import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function walkHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const htmlFiles = walkHtml(distDir);
const routes = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(distDir, f).replace(/\\/g, '/');
    if (rel === 'index.html') return '/';
    return '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  })
);

const titles = new Map();
const metas = new Map();
const h1s = new Map();
const errors = [];
let totalSchemas = 0;
let totalImagesChecked = 0;

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const route = rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) errors.push(`[NO TITLE] ${route}`);
  else if (titles.has(title)) errors.push(`[DUP TITLE] ${route} == ${titles.get(title)}`);
  else titles.set(title, route);

  const metaMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const meta = metaMatch ? metaMatch[1].trim() : '';
  if (!meta) errors.push(`[NO META] ${route}`);
  else if (metas.has(meta)) errors.push(`[DUP META] ${route} == ${metas.get(meta)}`);
  else metas.set(meta, route);

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length !== 1) errors.push(`[H1 COUNT=${h1Matches.length}] ${route}`);
  else {
    const h1 = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
    if (h1s.has(h1)) errors.push(`[DUP H1] ${route} == ${h1s.get(h1)}`);
    else h1s.set(h1, route);
  }

  if (!/<link\s+rel="canonical"\s+href="https:\/\/[^"]+"/i.test(html)) {
    errors.push(`[NO CANONICAL] ${route}`);
  }

  const ldMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (ldMatches.length === 0) errors.push(`[NO JSON-LD] ${route}`);
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
      totalSchemas++;
    } catch {
      errors.push(`[INVALID JSON-LD] ${route}`);
    }
  }

  // Check internal links
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const target = m[1].replace(/\/+$/, '') || '/';
    if (target.endsWith('.svg') || target.endsWith('.xml') || target.endsWith('.css') || target.endsWith('.webp')) continue;
    if (!routes.has(target)) errors.push(`[BROKEN LINK] ${route} -> ${target}`);
  }

  // Check images: exist in dist, WebP format, width/height/alt present
  for (const m of html.matchAll(/<img\s+([^>]+)>/gi)) {
    totalImagesChecked++;
    const attrs = m[1];
    const srcM = attrs.match(/src="([^"]+)"/);
    if (!srcM) { errors.push(`[IMG NO SRC] ${route}`); continue; }
    const src = srcM[1];
    if (!src.endsWith('.webp')) errors.push(`[IMG NOT WEBP] ${route}: ${src}`);
    const diskPath = path.join(distDir, src.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) errors.push(`[IMG MISSING] ${route}: ${src}`);
    if (!/alt="[^"]+"/.test(attrs)) errors.push(`[IMG NO ALT] ${route}: ${src}`);
    if (!/width="\d+"/.test(attrs) || !/height="\d+"/.test(attrs)) errors.push(`[IMG NO DIMS] ${route}: ${src}`);
  }
}

const sitemapExists = fs.existsSync(path.join(distDir, 'sitemap-index.xml'));
const robotsExists = fs.existsSync(path.join(distDir, 'robots.txt'));
if (!sitemapExists) errors.push('[MISSING sitemap-index.xml]');
if (!robotsExists) errors.push('[MISSING robots.txt]');

console.log('=== ARKAN APPLIANCES REPAIR — SEO & BUILD AUDIT ===');
console.log('Total static HTML pages built:', htmlFiles.length);
console.log('Unique Titles:', titles.size, '| Unique Metas:', metas.size, '| Unique H1s:', h1s.size);
console.log('Valid JSON-LD schemas:', totalSchemas, '| WebP images verified:', totalImagesChecked);
console.log('Sitemap:', sitemapExists ? 'OK' : 'MISSING', '| Robots.txt:', robotsExists ? 'OK' : 'MISSING');
console.log('TOTAL ERRORS:', errors.length);
if (errors.length) {
  errors.slice(0, 30).forEach((e) => console.error(e));
  process.exit(1);
}
