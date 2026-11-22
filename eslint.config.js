import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**', 'src/content/cheatsheets/**']
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs['flat/recommended'],
	...eslintPluginSvelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		},
		rules: {
			// In Astro projects, SvelteKit's resolve() is not used
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/require-each-key': 'off',
			'svelte/prefer-writable-derived': 'off',
			'svelte/prefer-svelte-reactivity': 'off'
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'no-useless-assignment': 'off'
		}
	}
];
