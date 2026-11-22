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
	shell: 'bash',
	'shell script': 'bash',
	sh: 'bash',
	console: 'bash',
	terminal: 'bash',
	cmd: 'bat',
	dos: 'bat',
	js: 'javascript',
	ts: 'typescript',
	cs: 'csharp',
	rs: 'rust',
	py: 'python',
	ml: 'ocaml',
	golang: 'go',
	'c++': 'cpp',
	text: 'text',
	txt: 'text',
	plain: 'text',
	plaintext: 'text',
	katex: 'latex',
	mcfunction: 'text',
	mongosh: 'javascript',
	gitignore: 'ini',
	zig: 'zig'
};

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-light', 'github-dark'],
			langs: [
				'bash',
				'c',
				'cpp',
				'csharp',
				'css',
				'dart',
				'diff',
				'dockerfile',
				'go',
				'graphql',
				'groovy',
				'html',
				'ini',
				'java',
				'javascript',
				'json',
				'kotlin',
				'latex',
				'lisp',
				'lua',
				'make',
				'markdown',
				'matlab',
				'nginx',
				'nim',
				'nix',
				'ocaml',
				'perl',
				'php',
				'powershell',
				'pug',
				'python',
				'r',
				'regex',
				'ruby',
				'rust',
				'scala',
				'scss',
				'sql',
				'swift',
				'toml',
				'typescript',
				'vhdl',
				'vim',
				'xml',
				'yaml',
				'bat',
				'zig'
			]
		});
	}
	return highlighterPromise;
}

async function highlightSnippet(
	highlighter: Highlighter,
	code: string,
	rawLang: string
): Promise<string> {
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
		const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${escaped}</code></pre>`;
	}
}

function extractHexColor(bg?: string): string {
	if (!bg) return '#4f46e5';
	const match = bg.match(/#(?:[0-9a-fA-F]{3,8})/);
	if (match) return match[0];
	if (bg.includes('green') || bg.includes('emerald')) return '#10b981';
	if (bg.includes('blue') || bg.includes('sky')) return '#0ea5e9';
	if (bg.includes('purple') || bg.includes('indigo')) return '#6366f1';
	if (bg.includes('pink') || bg.includes('rose')) return '#f43f5e';
	if (bg.includes('orange') || bg.includes('amber')) return '#f59e0b';
	if (bg.includes('yellow')) return '#eab308';
	if (bg.includes('red')) return '#ef4444';
	return '#4f46e5';
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

	// Comprehensive tech icon aliases
	const aliasMap: Record<string, string> = {
		js: 'javascript',
		ts: 'typescript',
		py: 'python',
		sh: 'bash',
		golang: 'go',
		rb: 'ruby',
		md: 'markdown',
		yml: 'yaml',
		postgres: 'postgres',
		k8s: 'kubernetes',
		actions: 'github-actions',
		nc: 'netcat',
		resolutions: 'resolution',
		'socket-io': 'style',
		'windows-cmd': 'windows',
		'windows-shortcuts': 'windows',
		'chrome-devtools': 'chrome',
		'react-test-library': 'react',
		'html-char': 'html',
		css3: 'css3',
		fastapi: 'fastapi',
		flask: 'flask',
		matplotlib: 'python',
		tensorflow: 'tensorflow',
		gemma4: 'gemini-cli',
		chmod: 'chmod',
		'http-status-code': 'link',
		'conventional-commits': 'git',
		systemd: 'alpine-linux',
		ssh: 'ssh',
		screen: 'tmux',
		find: 'grep',
		awk: 'grep',
		lsof: 'netstat',
		networkports: 'netstat',
		'table-plus': 'postgres',
		'sequel-pro': 'mysql',
		putty: 'ssh',
		telnet: 'netcat',
		taskset: 'bash',
		htmx: 'htmx',
		n8n: 'hook',
		'color-picker': 'colorscreen',
		'code-editor-ios': 'vscode',
		'bear-notes': 'obsidian',
		roam: 'obsidian',
		notion: 'notion',
		superhuman: 'gmail',
		transmit: 'filezilla',
		pandoc: 'markdown',
		sdkman: 'java',
		mime: 'xml',
		'iso-639-1': 'xml',
		'ascii-code': 'xml',
		'aspect-ratio': 'resolution',
		lua: 'lua',
		origami: 'framer-x',
		kanbanmail: 'gmail',
		jest: 'jest',
		'minecraft-bedrock': 'minecraft',
		'minecraft-java': 'minecraft',
		nix: 'alpine-linux',
		'apex-legends': 'game',
		fortnite: 'game',
		'guitar-pro': 'soundcloud',
		zig: 'zig'
	};

	if (aliasMap[slug] && icons.has(`${aliasMap[slug]}.svg`)) {
		return `/icons/${aliasMap[slug]}.svg`;
	}

	return '/logo.png';
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

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

		let data: any;
		try {
			data = YAML.parse(fmMatch[1]) || {};
		} catch {
			data = {};
		}

		const title = data.title || slug.toUpperCase();
		const categories = Array.isArray(data.categories)
			? data.categories
			: [data.categories || 'Other'];
		const category = categories[0] || 'Other';
		const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
		const intro = (typeof data.intro === 'string' ? data.intro : '')
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			.trim();
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

	let data: any;
	try {
		data = YAML.parse(fmMatch[1]) || {};
	} catch {
		data = {};
	}

	const title = data.title || slug.toUpperCase();
	const categories = Array.isArray(data.categories)
		? data.categories
		: [data.categories || 'Other'];
	const category = categories[0] || 'Other';
	const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
	const intro = (typeof data.intro === 'string' ? data.intro : '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.trim();
	const background = data.background || '';
	const color = extractHexColor(background);

	const body = fmMatch[2];
	const sections: CheatsheetSection[] = [];
	const secParts = body.split(/\n(?=##\s+)/);

	let totalCards = 0;

	function processCardVariants(rawHtml: string): string {
		// 0. Protect rendered code blocks first. The syntax manual shows literal
		//    markers (e.g. `{.marker-timeline}`) inside fenced examples — those must
		//    survive verbatim, while the same markers in prose are consumed below.
		const codeBlocks: string[] = [];
		let html = rawHtml.replace(
			/<pre[\s\S]*?<\/pre>/gi,
			(match) => `@@PREBLOCK${codeBlocks.push(match) - 1}@@`
		);

		// 1. Process tables with dummy '-' headers:
		// e.g. <thead><tr><th>-</th>...</tr></thead>
		html = html.replace(
			/<table>(\s*)<thead>(\s*)<tr>(\s*(?:<th>\s*-\s*<\/th>\s*)+)<\/tr>(\s*)<\/thead>/gi,
			(_match, s1, s2, ths, s3) => {
				return `<table class="table-compact">${s1}<thead class="hidden">${s2}<tr>${ths}</tr>${s3}</thead>`;
			}
		);

		// 2. Process table variant paragraphs: {.shortcuts}, {.show-header}, {.bold-first},
		// {.left-text} and {.no-wrap}. Markers may be combined (e.g. {.show-header .shortcuts}).
		// The paragraph must follow its table within a small gap (an <hr> is allowed) and must
		// contain at least one *table* variant — otherwise it is left untouched so that markers
		// belonging to a following <ul> (e.g. {.cols-3}) can be handled by rule 10.
		const TABLE_VARIANTS = ['.shortcuts', '.show-header', '.bold-first', '.left-text', '.no-wrap'];
		html = html.replace(
			/<table([^>]*)>([\s\S]*?)<\/table>((?:(?!<table)[\s\S]){0,60}?<p>\s*\{([^}]+)\}\s*<\/p>)/gi,
			(match, attrs, tableInner, between, markerText) => {
				const classes = markerText.match(/\.[a-zA-Z0-9_-]+/g) || [];
				if (!classes.some((c: string) => TABLE_VARIANTS.includes(c))) return match;

				let inner: string = tableInner;
				const extra: string[] = [];
				if (classes.includes('.shortcuts')) {
					inner = inner.replace(/<code>(.*?)<\/code>/g, '<kbd>$1</kbd>');
					extra.push('table-shortcuts');
				}
				if (classes.includes('.show-header')) {
					// A compact table hides its (dummy) header; this variant reveals it again.
					inner = inner.replace(/<thead class="hidden">/gi, '<thead>');
					extra.push('table-show-header');
				}
				if (classes.includes('.bold-first')) extra.push('table-bold-first');
				if (classes.includes('.left-text')) extra.push('table-left-text');
				if (classes.includes('.no-wrap')) extra.push('table-no-wrap');

				const existing = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
				const cls = [...new Set([...(existing ? [existing] : []), ...extra])].join(' ');
				const newAttrs = existing
					? attrs.replace(/class="[^"]*"/, `class="${cls}"`)
					: ` class="${cls}"`;
				return `<table${newAttrs}>${inner}</table>${between.replace(/<p>\s*\{[^}]+\}\s*<\/p>/gi, '')}`;
			}
		);

		// 7. Process {.link-arrow}
		// e.g. <p><a href="...">Preview</a> {.link-arrow}</p> or <a href="...">Preview</a> {.link-arrow}
		html = html.replace(
			/<a\s+href="([^"]+)">([^<]+)<\/a>\s*\{\.link-arrow\}/gi,
			'<a href="$1" class="link-arrow-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card hover:bg-muted border border-border text-xs font-medium text-foreground hover:text-emerald-500 transition-colors shadow-xs my-1">$2 <span class="text-emerald-500 font-bold">→</span></a>'
		);
		html = html.replace(/\{\.link-arrow\}/gi, '');

		// 8. Process timeline lists: {.marker-timeline} or {.style-timeline}
		// (The list-level marker is attached by rule 9 below; only the per-item
		//  form is handled here.)
		html = html.replace(
			/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.(?:marker|style)-timeline\}\s*<\/p>/gi,
			'<ul class="list-timeline">$1</ul>'
		);
		html = html.replace(
			/<li([^>]*)>([\s\S]*?)\{\.(?:marker|style)-timeline\}<\/li>/gi,
			'<li$1 class="list-timeline-item">$2</li>'
		);
		html = html.replace(/<p>\s*\{\.(?:marker|style)-timeline\}\s*<\/p>/gi, '');

		// 9. List variants — generalised. A marker paragraph following a <ul> may
		//    combine any number of classes in any order, e.g.
		//    <ul>…</ul><p>{.marker-none .cols-3}</p> (283 occurrences in content)
		//    → <ul class="list-none-marker list-cols-3">.
		const LIST_CLASS_MAP: Record<string, string> = {
			'.marker-none': 'list-none-marker',
			'.marker-round': 'list-round-marker',
			'.marker-timeline': 'list-timeline',
			'.style-timeline': 'list-timeline',
			'.icon-list': 'icon-list'
		};
		const toListClasses = (classes: string[]): string[] => {
			const out: string[] = [];
			for (const c of classes) {
				if (LIST_CLASS_MAP[c]) out.push(LIST_CLASS_MAP[c]);
				const cols = /^\.cols-([1-9])$/.exec(c);
				if (cols && Number(cols[1]) >= 2) out.push(`list-cols-${cols[1]}`);
			}
			return [...new Set(out)];
		};
		const hasListVariant = (classes: string[]) =>
			classes.some((c) => c in LIST_CLASS_MAP || /^\.cols-[1-9]$/.test(c));

		html = html.replace(
			/<ul([^>]*)>([\s\S]*?)<\/ul>((?:(?!<ul|<table)[\s\S]){0,60}?<p>\s*\{([^}]+)\}\s*<\/p>)/gi,
			(match, ulAttrs, inner, between, markerText) => {
				const classes = markerText.match(/\.[a-zA-Z0-9_-]+/g) || [];
				if (!hasListVariant(classes)) return match;
				const extra = toListClasses(classes);
				if (!extra.length) return match;
				const existing = (ulAttrs.match(/class="([^"]*)"/) || [])[1] || '';
				const cls = [
					...new Set([...(existing ? existing.split(/\s+/).filter(Boolean) : []), ...extra])
				].join(' ');
				const newUlAttrs = existing
					? ulAttrs.replace(/class="[^"]*"/, `class="${cls}"`)
					: ` class="${cls}"`;
				return `<ul${newUlAttrs}>${inner}</ul>${between.replace(/<p>\s*\{[^}]+\}\s*<\/p>/gi, '')}`;
			}
		);

		// 10. Markers glued to a list item's text (`- Ansible playbooks … {.marker-round}`)
		//     belong to the whole list: move them onto the <ul>, then drop the marker.
		html = html.replace(/<ul([^>]*)>([\s\S]*?)<\/ul>/gi, (match, ulAttrs, inner) => {
			if (!/\{\s*\.[a-zA-Z0-9_-]+/.test(inner)) return match;
			const glued: string[] = [];
			const cleaned = inner.replace(
				/<li([^>]*)>([\s\S]*?)\{\s*((?:\.[a-zA-Z0-9_-]+\s*)+)\}\s*<\/li>/gi,
				(_m: string, liAttrs: string, liInner: string, markerText: string) => {
					glued.push(...(markerText.match(/\.[a-zA-Z0-9_-]+/g) || []));
					return `<li${liAttrs}>${liInner}</li>`;
				}
			);
			const extra = toListClasses(glued);
			if (!extra.length) return match;
			const existing = (ulAttrs.match(/class="([^"]*)"/) || [])[1] || '';
			const cls = [
				...new Set([...(existing ? existing.split(/\s+/).filter(Boolean) : []), ...extra])
			].join(' ');
			const newUlAttrs = existing
				? ulAttrs.replace(/class="[^"]*"/, `class="${cls}"`)
				: ` class="${cls}"`;
			return `<ul${newUlAttrs}>${cleaned}</ul>`;
		});

		// 11. Clean up any remaining leaked paragraph tags containing only {.class}
		html = html.replace(/<p>\s*\{(?:\.[a-zA-Z0-9_-]+\s*)+\}\s*<\/p>/gi, '');

		// 12. Strip leftover {.variant} markers inside headings. Only ## / ### titles are
		// parsed for variants, so a marker on h4+ (e.g. `#### Words{.left-text}`) would
		// otherwise be rendered as visible text.
		html = html.replace(
			/(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi,
			(_match, open, inner, close) =>
				open + inner.replace(/\s*\{(?:\.[a-zA-Z0-9_-]+)+\s*\}/g, '') + close
		);

		// 13. Catch-all: drop any marker still glued to prose (table cells, paragraphs,
		//     list items…) so nothing renders as literal `{.class}` text. Inline <code>
		//     is exempt — docs may legitimately show marker syntax there.
		const inlineCodes: string[] = [];
		let step = html.replace(
			/<code(?:\s[^>]*)?>[\s\S]*?<\/code>/gi,
			(match) => `@@INLINECODE${inlineCodes.push(match) - 1}@@`
		);
		step = step.replace(/\{\s*\.[a-zA-Z0-9_-]+(?:\s+\.[a-zA-Z0-9_-]+)*\s*\}/g, '');
		html = step.replace(/@@INLINECODE(\d+)@@/g, (_m, i) => inlineCodes[Number(i)]);

		// Restore the code blocks protected in step 0.
		html = html.replace(/@@PREBLOCK(\d+)@@/g, (_m, i) => codeBlocks[Number(i)]);

		return html;
	}

	for (const secPart of secParts) {
		const lines = secPart.trim().split('\n');
		const secHeader = lines[0];
		if (!secHeader.startsWith('## ')) continue;

		const rawSecTitle = secHeader.replace(/^##\s+/, '').trim();
		const secTitle = rawSecTitle.replace(/\{[^}]+\}/g, '').trim();
		const secId = slugify(secTitle) || `sec-${sections.length + 1}`;
		const secCols = rawSecTitle.includes('.cols-1') ? 1 : rawSecTitle.includes('.cols-2') ? 2 : 3;

		const cardParts = secPart.substring(secHeader.length).split(/\n(?=###\s+)/);
		const cards: CheatsheetCard[] = [];

		for (const cardPart of cardParts) {
			const trimmed = cardPart.trim();
			if (!trimmed) continue;

			const cardLines = trimmed.split('\n');
			const cardHeader = cardLines[0];
			let rawCardTitle = '';
			let cardRawBody = '';

			if (cardHeader.startsWith('### ')) {
				rawCardTitle = cardHeader.replace(/^###\s+/, '').trim();
				cardRawBody = trimmed.substring(cardHeader.length).trim();
			} else {
				const stripped = trimmed.replace(/^---\s*$/gm, '').trim();
				if (!stripped) continue;
				rawCardTitle = cards.length === 0 ? secTitle : 'Overview';
				cardRawBody = stripped;
			}

			const cardTitle = rawCardTitle.replace(/\{[^}]+\}/g, '').trim();
			const colSpan =
				rawCardTitle.includes('.col-span-3') || rawCardTitle.includes('.cols-3')
					? 3
					: rawCardTitle.includes('.col-span-2') || rawCardTitle.includes('.cols-2')
						? 2
						: 1;
			const rowSpan = rawCardTitle.includes('.row-span-3')
				? 3
				: rawCardTitle.includes('.row-span-2')
					? 2
					: 1;
			const theme = rawCardTitle.includes('.primary')
				? 'primary'
				: rawCardTitle.includes('.secondary')
					? 'secondary'
					: rawCardTitle.includes('.info')
						? 'info'
						: rawCardTitle.includes('.warning')
							? 'warning'
							: rawCardTitle.includes('.danger')
								? 'danger'
								: rawCardTitle.includes('.success')
									? 'success'
									: 'default';
			const cardId = slugify(cardTitle) || `card-${cards.length + 1}`;

			// Extract code snippets for quick search/copy
			const codeSnippets: string[] = [];
			const codeMatches = cardRawBody.matchAll(/```[\w-]*\s*([\s\S]*?)```/g);
			for (const cm of codeMatches) {
				if (cm[1]) codeSnippets.push(cm[1].trim());
			}

			// Render card body using Markdoc and Shiki
			let cardHtml: string;
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
					const isWrap = (block.lang || '').includes('.wrap') || cardRawBody.includes('.wrap');
					const safeDataCode = block.code.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

					const wrapper = `
<div class="code-block-wrapper my-2 relative group rounded-lg overflow-hidden border border-border">
	<div class="code-block-header flex items-center justify-between px-3 py-1 bg-muted/80 border-b border-border text-[11px] font-mono text-muted-foreground">
		<span class="font-medium uppercase tracking-wider text-[10px]">${cleanDisplayLang}</span>
		<button type="button" class="copy-code-btn px-2 py-0.5 rounded bg-card hover:bg-muted text-foreground text-[11px] font-sans border border-border transition-colors cursor-pointer shadow-xs" data-code="${safeDataCode}">Copy</button>
	</div>
	<div class="${isWrap ? 'wrap-code-box' : ''}">${shikiHtml}</div>
</div>`.trim();

					cardHtml = cardHtml.replace(
						`<div class="shiki-placeholder" data-id="${block.id}"></div>`,
						wrapper
					);
				}

				// Post-process variants
				cardHtml = processCardVariants(cardHtml);
			} catch {
				const escaped = cardRawBody
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
				cardHtml = `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${escaped}</code></pre>`;
			}

			cards.push({
				id: cardId,
				title: cardTitle,
				colSpan,
				rowSpan,
				theme,
				html: cardHtml,
				codeSnippets
			});
			totalCards++;
		}

		if (cards.length > 0) {
			sections.push({
				id: secId,
				title: secTitle,
				cols: secCols,
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
	return [
		'All',
		...HOMEPAGE_CATEGORIES.filter((c) => set.has(c)),
		...Array.from(set).filter((c) => !HOMEPAGE_CATEGORIES.includes(c))
	];
}
