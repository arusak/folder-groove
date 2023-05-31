import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const { SSL_PRIVATE_KEY_PATH, SSL_PUBLIC_KEY_PATH } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [svelte(),
      VitePWA({
        strategies: 'generateSW',
        srcDir: 'src',
        registerType: 'autoUpdate',
        manifest: {
          name: 'Groove Folders',
          short_name: 'Groove Folders',
          start_url: '/groove/',
          display: 'standalone',
          theme_color: '#f5ba22',
          background_color: '#f5ba22',
          icons: [
            {
              src: 'icon192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable any'
            },
            {
              src: 'icon512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable any'
            },
            {
              src: 'icon192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icon512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        injectRegister: 'auto',
        devOptions: {
          enabled: true,
          type: 'module',
        },
      })],
    server: {
      port: 3000,
      https: {
        key: SSL_PRIVATE_KEY_PATH && readFileSync(SSL_PRIVATE_KEY_PATH),
        cert: SSL_PUBLIC_KEY_PATH && readFileSync(SSL_PUBLIC_KEY_PATH),
      },
    },

    build: {
      outDir: 'build',
      sourcemap: 'inline',
    },
    preview: {
      port: 8080,
    },
  };
});
