import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const DEFAULT_ORIGIN = 'https://isle-cheats.com';
const SITEMAP_ORIGIN = (() => {
  const raw = process.env.PUBLIC_CANONICAL_ORIGIN ?? DEFAULT_ORIGIN;
  return raw.startsWith('http') ? raw.replace(/\/$/, '') : DEFAULT_ORIGIN;
})();

/** @returns {{ source: string, outDir: string }} */
function resolveSitemapPaths() {
  const candidates = [
    { source: path.join(dist, 'sitemap-0.xml'), outDir: dist },
    { source: path.join(dist, 'client', 'sitemap-0.xml'), outDir: path.join(dist, 'client') },
  ];
  for (const c of candidates) {
    if (fs.existsSync(c.source)) return c;
  }
  return null;
}

const resolved = resolveSitemapPaths();
if (!resolved) {
  console.error(
    'finalize-sitemap: sitemap-0.xml not found under dist/ or dist/client/ — run astro build first.',
  );
  process.exit(1);
}

const { source, outDir } = resolved;

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap-0.xml contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const formatted = formatUrlset(raw);
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITEMAP_ORIGIN}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(source, formatted, 'utf8');

const relOut = path.relative(root, path.join(outDir, 'sitemap.xml'));
console.log(`Sitemap finalized: ${urlCount} URLs → ${relOut}`);

const robotsBody = `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${SITEMAP_ORIGIN}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsBody, 'utf8');
console.log(`dist/robots.txt written (Sitemap includes ${SITEMAP_ORIGIN})`);
