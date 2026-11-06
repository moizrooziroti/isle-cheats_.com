import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://isle-cheats.com',
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
      'import.meta.env.PUBLIC_CANONICAL_ORIGIN': JSON.stringify(
        process.env.PUBLIC_CANONICAL_ORIGIN ??
          'https://isle-cheats-com.moizrooziroti.workers.dev',
      ),
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
