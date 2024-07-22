import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import pwa from '@vite-pwa/astro'
import auth from 'auth-astro'
// import sentry from '@sentry/astro'

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  security: {
    checkOrigin: true,
  },
  experimental: {
    directRenderScript: true,
    clientPrerender: true,
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  integrations: [
    vue({
      jsx: true,
      devtools: true,
    }),
    mdx(),
    sitemap(),
    partytown({
      config: {
        debug: true,
      },
    }),
    pwa({
      mode: 'development',
      registerType: 'autoUpdate',
      pwaAssets: {
        config: true,
      },
      manifest: {
        theme_color: '#ffffff',
      },
      workbox: {
        sourcemap: true,
        navigateFallback: '/',
        navigateFallbackDenylist: [/^\/api/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
    auth(),
    // sentry({
    //   dsn: '',
    //   sourceMapsUploadOptions: {
    //     project: '',
    //     authToken: process.env.SENTRY_AUTH_TOKEN,
    //   },
    // }),
  ],
  vite: {
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@/': 'src/',
      },
    },
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
  i18n: {
    defaultLocale: 'zh-cmn-Hans',
    locales: ['zh-cmn-Hans'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
})
