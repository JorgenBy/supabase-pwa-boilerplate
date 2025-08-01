import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 3000,
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [react(), viteTsconfigPaths()],
});
