import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://api.bilibili.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				headers: {
					Referer: 'https://www.bilibili.com/',
				},
			},
		},
	},
})
