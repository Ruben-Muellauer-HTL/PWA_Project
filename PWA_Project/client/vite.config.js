import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.js';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  server: {
    port: 8080,
  },
  preview: {
    port: 4173,
    proxy: {
      '/tours': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '^/images/.*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '^/staticImages/.*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({
      manifest,
      includeAssets: ['**/*.{js,css,html,jpg,ico,png,ttf,woff2,sass}'],
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'custom-sw.js',
      // workbox: {
      //   mode: 'development',
      //   runtimeCaching: [
      //     {
      //       urlPattern: '/tours',
      //       handler: 'NetworkFirst',
      //       options: {
      //         cacheName: 'tours-cache',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: /.*images\/*.*.jpg/,
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'card-images',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 60 * 60 * 24 * 1,
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: /.*images\/slideshow\/*.*.jpg/,
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'slideshow-images',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 60 * 60 * 24 * 1,
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  build: {
    outDir: '../server/client',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
