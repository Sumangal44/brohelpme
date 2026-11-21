// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://kathamaladc.in',
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [svelte(), sitemap()],
	vite: {
		plugins: [tailwindcss()]
	}
});
