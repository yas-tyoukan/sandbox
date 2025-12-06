import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [checker({ typescript: true }), tsconfigPaths()],
  base: './',
  build: {
    outDir: '../../yas-tyoukan.github.io/roboids/',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
      },
    },
  },
});
