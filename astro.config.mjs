import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

const site =
  typeof process.env.PUBLIC_CANONICAL_ORIGIN === 'string' &&
  process.env.PUBLIC_CANONICAL_ORIGIN.startsWith('http')
    ? process.env.PUBLIC_CANONICAL_ORIGIN.replace(/\/$/, '')
    : 'https://isle-cheats.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/',
    '/support/': '/contact/',
    '/privacy/': '/privacy-policy/',
    '/products/the-isle-hwid-spoofer/': '/products/hwid-spoofer/',
    '/products/ugc-account-recovery/': '/products/ugc/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_CANONICAL_ORIGIN': JSON.stringify(site),
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
