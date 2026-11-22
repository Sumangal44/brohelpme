// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://brohelpme.netlify.app/',
	output: 'static',
	redirects: {
		'/quickref': '/brohelpme'
	},
	integrations: [svelte(), sitemap()],
	vite: {
		plugins: [tailwindcss()]
	}
});
