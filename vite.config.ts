import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: false,
			},
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: {
			// nescessary for local font
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
