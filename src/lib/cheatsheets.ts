import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import Markdoc from '@markdoc/markdoc';
import { createHighlighter, type Highlighter } from 'shiki';
import {
	type CheatsheetMeta,
	type CheatsheetCard,
	type CheatsheetSection,
	type CheatsheetDetail,
	RECOMMENDED_SLUGS,
	HOMEPAGE_CATEGORIES
} from './types';

export * from './types';

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content/cheatsheets');
const ICONS_DIR = path.resolve(process.cwd(), 'public/icons');

const LANG_MAP: Record<string, string> = {
	'shell': 'bash',
	'shell script': 'bash',
	'sh': 'bash',
	'console': 'bash',
	'terminal': 'bash',
	'cmd': 'bat',
	'dos': 'bat',
	'js': 'javascript',
	'ts': 'typescript',
	'cs': 'csharp',
	'rs': 'rust',
	'py': 'python',
	'ml': 'ocaml',
	'golang': 'go',
	'c++': 'cpp',
	'text': 'text',
	'txt': 'text',
	'plain': 'text',
	'plaintext': 'text',
	'katex': 'latex',
	'mcfunction': 'text',
	'mongosh': 'javascript',
	'gitignore': 'ini'
};

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-light', 'github-dark'],
			langs: [
				'bash', 'c', 'cpp', 'csharp', 'css', 'dart', 'diff',
				'dockerfile', 'go', 'graphql', 'groovy', 'html', 'ini',
				'java', 'javascript', 'json', 'kotlin', 'latex', 'lisp',
				'lua', 'make', 'markdown', 'matlab', 'nginx', 'nim',
				'nix', 'ocaml', 'perl', 'php', 'powershell', 'pug',
				'python', 'r', 'regex', 'ruby', 'rust', 'scala',
				'scss', 'sql', 'swift', 'toml', 'typescript',
				'vhdl', 'vim', 'xml', 'yaml', 'bat'
			]
		});
	}
	return highlighterPromise;
}

async function highlightSnippet(highlighter: Highlighter, code: string, rawLang: string): Promise<string> {
	const cleanLang = (rawLang || 'text').split(/[\s{.]/)[0].toLowerCase();
	const lang = LANG_MAP[cleanLang] || cleanLang;

	try {
		const loaded = highlighter.getLoadedLanguages();
		if (!loaded.includes(lang as any)) {
			try {
				await highlighter.loadLanguage(lang as any);
			} catch {
				// language not bundled or unknown, will use text
			}
		}

		const finalLang = highlighter.getLoadedLanguages().includes(lang as any) ? lang : 'text';
		return highlighter.codeToHtml(code, {
			lang: finalLang,
			themes: { light: 'github-light', dark: 'github-dark' }
		});
	} catch {
		const escaped = code
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		return `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${escaped}</code></pre>`;
	}
}

function extractHexColor(bg?: string): string {
	if (!bg) return '#4f46e5';
	const match = bg.match(/#(?:[0-9a-fA-F]{3,8})/);
	return match ? match[0] : '#4f46e5';
}

// Cache icon existence
let iconCache: Set<string> | null = null;
function getIconSet(): Set<string> {
	if (!iconCache) {
		try {
			iconCache = new Set(fs.readdirSync(ICONS_DIR));
		} catch {
			iconCache = new Set();
		}
	}
	return iconCache;
}

export function resolveIcon(slug: string): string {
	const icons = getIconSet();
	if (icons.has(`${slug}.svg`)) {
		return `/icons/${slug}.svg`;
	}

	// Common aliases
	const aliasMap: Record<string, string> = {
		js: 'javascript',
		ts: 'typescript',
		py: 'python',
		sh: 'bash',
		golang: 'go',
		rb: 'ruby',
		md: 'markdown',
		yml: 'yaml',
		postgres: 'postgresql',
		k8s: 'kubernetes',
		actions: 'github-actions'
	};

	if (aliasMap[slug] && icons.has(`${aliasMap[slug]}.svg`)) {
		return `/icons/${aliasMap[slug]}.svg`;
	}

	return '/logo.svg';
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

// Markdown transformer config
const markdocConfig = {
	nodes: {
		fence: {
			render: 'div',
			transform(node: any) {
				const lang = node.attributes?.language || 'code';
				const codeContent = node.attributes?.content || '';
				return new Markdoc.Tag('div', { class: 'code-block-wrapper my-2 relative group rounded-lg overflow-hidden border border-border' }, [
					new Markdoc.Tag('div', { class: 'code-block-header flex items-center justify-between px-3 py-1 bg-muted/80 border-b border-border text-[11px] font-mono text-muted-foreground' }, [
						new Markdoc.Tag('span', { class: 'font-medium uppercase tracking-wider text-[10px]' }, [lang]),
						new Markdoc.Tag('button', {
							type: 'button',
							class: 'copy-code-btn px-2 py-0.5 rounded bg-background hover:bg-muted text-foreground text-[11px] font-sans border border-border transition-colors cursor-pointer shadow-xs',
							'data-code': codeContent
						}, ['Copy'])
					]),
					new Markdoc.Tag('pre', { class: 'p-3 text-xs font-mono overflow-x-auto leading-relaxed' }, [
						new Markdoc.Tag('code', {}, [codeContent])
					])
				]);
			}
		}
	}
};

let cachedAllSheets: CheatsheetMeta[] | null = null;

export function getAllCheatsheets(): CheatsheetMeta[] {
	if (cachedAllSheets) return cachedAllSheets;

	if (!fs.existsSync(CONTENT_DIR)) {
		return [];
	}

	const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
	const sheets: CheatsheetMeta[] = [];

	for (const file of files) {
		const slug = file.replace('.md', '');
		const fullPath = path.join(CONTENT_DIR, file);
		const content = fs.readFileSync(fullPath, 'utf-8');

		const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
		if (!fmMatch) continue;

		let data: any = {};
		try {
			data = YAML.parse(fmMatch[1]) || {};
		} catch {
			data = {};
		}

		const title = data.title || slug.toUpperCase();
		const categories = Array.isArray(data.categories) ? data.categories : [data.categories || 'Other'];
		const category = categories[0] || 'Other';
		const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
		const intro = (typeof data.intro === 'string' ? data.intro : '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
		const background = data.background || '';
		const color = extractHexColor(background);

		// Count cards in markdown body
		const body = fmMatch[2];
		const cardMatches = body.match(/\n###\s+/g);
		const cardCount = cardMatches ? cardMatches.length : 1;

		sheets.push({
			slug,
			title,
			date: data.date ? String(data.date) : undefined,
			category,
			tags,
			intro: intro || `${title} quick reference cheat sheet.`,
			icon: resolveIcon(slug),
			background,
			color,
			cardCount
		});
	}

	// Sort: Recommended first, then alphabetical
	sheets.sort((a, b) => {
		const aIdx = RECOMMENDED_SLUGS.indexOf(a.slug);
		const bIdx = RECOMMENDED_SLUGS.indexOf(b.slug);
		if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
		if (aIdx !== -1) return -1;
		if (bIdx !== -1) return 1;
		return a.title.localeCompare(b.title);
	});

	cachedAllSheets = sheets;
	return sheets;
}

export async function getCheatsheet(slug: string): Promise<CheatsheetDetail | null> {
	const filePath = path.join(CONTENT_DIR, `${slug}.md`);
	if (!fs.existsSync(filePath)) {
		return null;
	}

	const highlighter = await getHighlighter();

	const content = fs.readFileSync(filePath, 'utf-8');
	const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!fmMatch) return null;

	let data: any = {};
	try {
		data = YAML.parse(fmMatch[1]) || {};
	} catch {
		data = {};
	}

	const title = data.title || slug.toUpperCase();
	const categories = Array.isArray(data.categories) ? data.categories : [data.categories || 'Other'];
	const category = categories[0] || 'Other';
	const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
	const intro = (typeof data.intro === 'string' ? data.intro : '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
	const background = data.background || '';
	const color = extractHexColor(background);

	const body = fmMatch[2];
	const sections: CheatsheetSection[] = [];
	const secParts = body.split(/\n(?=##\s+)/);

	let totalCards = 0;

	for (const secPart of secParts) {
		const lines = secPart.trim().split('\n');
		const secHeader = lines[0];
		if (!secHeader.startsWith('## ')) continue;

		const rawSecTitle = secHeader.replace(/^##\s+/, '').trim();
		const secTitle = rawSecTitle.replace(/\{[^}]+\}/, '').trim();
		const secId = slugify(secTitle) || `sec-${sections.length + 1}`;

		const cardParts = secPart.substring(secHeader.length).split(/\n(?=###\s+)/);
		const cards: CheatsheetCard[] = [];

		for (const cardPart of cardParts) {
			const cardLines = cardPart.trim().split('\n');
			const cardHeader = cardLines[0];
			if (!cardHeader.startsWith('### ')) continue;

			const rawCardTitle = cardHeader.replace(/^###\s+/, '').trim();
			const cardTitle = rawCardTitle.replace(/\{[^}]+\}/, '').trim();
			const colSpan = rawCardTitle.includes('.col-span-2') || rawCardTitle.includes('.cols-2') ? 2 : 1;
			const rowSpan = rawCardTitle.includes('.row-span-2') ? 2 : 1;
			const cardId = slugify(cardTitle) || `card-${cards.length + 1}`;

			const cardRawBody = cardPart.trim().substring(cardHeader.length).trim();

			// Extract code snippets for quick search/copy
			const codeSnippets: string[] = [];
			const codeMatches = cardRawBody.matchAll(/```[\w-]*\s*([\s\S]*?)```/g);
			for (const cm of codeMatches) {
				if (cm[1]) codeSnippets.push(cm[1].trim());
			}

			// Render card body using Markdoc and Shiki
			let cardHtml = '';
			try {
				const codeBlocks: { id: string; lang: string; code: string }[] = [];
				const ast = Markdoc.parse(cardRawBody);
				const transformed = Markdoc.transform(ast, {
					nodes: {
						fence: {
							render: 'div',
							transform(node: any) {
								const lang = node.attributes?.language || 'code';
								const codeContent = node.attributes?.content || '';
								const id = `__SHIKI_BLOCK_${codeBlocks.length}__`;
								codeBlocks.push({ id, lang, code: codeContent });
								return new Markdoc.Tag('div', { class: 'shiki-placeholder', 'data-id': id });
							}
						}
					}
				} as any);

				cardHtml = Markdoc.renderers.html(transformed);

				for (const block of codeBlocks) {
					const shikiHtml = await highlightSnippet(highlighter, block.code, block.lang);
					const cleanDisplayLang = (block.lang || 'code').split(/[\s{.]/)[0].toLowerCase();
					const safeDataCode = block.code
						.replace(/&/g, '&amp;')
						.replace(/"/g, '&quot;');

					const wrapper = `
<div class="code-block-wrapper my-2 relative group rounded-lg overflow-hidden border border-border">
	<div class="code-block-header flex items-center justify-between px-3 py-1 bg-muted/80 border-b border-border text-[11px] font-mono text-muted-foreground">
		<span class="font-medium uppercase tracking-wider text-[10px]">${cleanDisplayLang}</span>
		<button type="button" class="copy-code-btn px-2 py-0.5 rounded bg-card hover:bg-muted text-foreground text-[11px] font-sans border border-border transition-colors cursor-pointer shadow-xs" data-code="${safeDataCode}">Copy</button>
	</div>
	${shikiHtml}
</div>`.trim();

					cardHtml = cardHtml.replace(
						`<div class="shiki-placeholder" data-id="${block.id}"></div>`,
						wrapper
					);
				}
			} catch {
				const escaped = cardRawBody.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
				cardHtml = `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${escaped}</code></pre>`;
			}

			cards.push({
				id: cardId,
				title: cardTitle,
				colSpan,
				rowSpan,
				html: cardHtml,
				codeSnippets
			});
			totalCards++;
		}

		if (cards.length > 0) {
			sections.push({
				id: secId,
				title: secTitle,
				cards
			});
		}
	}

	return {
		slug,
		title,
		date: data.date ? String(data.date) : undefined,
		category,
		tags,
		intro: intro || `${title} quick reference cheat sheet.`,
		icon: resolveIcon(slug),
		background,
		color,
		cardCount: totalCards,
		sections
	};
}

export function getAllCategories(): string[] {
	const sheets = getAllCheatsheets();
	const set = new Set<string>();
	for (const s of sheets) {
		if (s.category) set.add(s.category);
	}
	return ['All', ...HOMEPAGE_CATEGORIES.filter((c) => set.has(c)), ...Array.from(set).filter((c) => !HOMEPAGE_CATEGORIES.includes(c))];
}
