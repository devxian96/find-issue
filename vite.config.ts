import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { rmSync } from 'fs';
import { join } from 'path';
import electron from 'vite-plugin-electron';
import pkg from './package.json';

rmSync(join(__dirname, 'dist'), { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		electron({
			main: {
				entry: 'electron/main/index.ts',
				vite: {
					build: {
						sourcemap: false,
						outDir: 'dist/electron/main',
					},
				},
			},
			preload: {
				input: {
					// You can configure multiple preload scripts here
					index: join(__dirname, 'electron/preload/index.ts'),
				},
				vite: {
					build: {
						// For debug
						sourcemap: 'inline',
						outDir: 'dist/electron/preload',
					},
				},
			},
			// Enables use of Node.js API in the Electron-Renderer
			renderer: {},
		}),
	],
	server: {
		host: pkg.env.VITE_DEV_SERVER_HOST,
		port: pkg.env.VITE_DEV_SERVER_PORT,
	},
});
