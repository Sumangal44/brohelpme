<script lang="ts">
	import { CHEATSHEETS } from '../data/cheatsheets';

	let isOpen = $state(false);
	let query = $state('');
	let selectedIndex = $state(0);
	let inputElement = $state<HTMLInputElement | null>(null);

	interface SearchResult {
		id: string;
		title: string;
		subtitle: string;
		category: string;
		url: string;
		badgeClass: string;
		codeSnippet?: string;
	}

	let results = $derived.by<SearchResult[]>(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			// Show top recommended cheatsheets
			return CHEATSHEETS.slice(0, 10).map((sheet) => ({
				id: sheet.slug,
				title: sheet.title,
				subtitle: sheet.intro,
				category: sheet.category,
				url: `/${sheet.slug}`,
				badgeClass: sheet.badgeClass
			}));
		}

		const list: SearchResult[] = [];

		for (const sheet of CHEATSHEETS) {
			const sheetTitleMatch = sheet.title.toLowerCase().includes(q) || sheet.shortTitle.toLowerCase().includes(q);
			const tagMatch = sheet.tags.some((t) => t.toLowerCase().includes(q));

			if (sheetTitleMatch || tagMatch) {
				list.push({
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					badgeClass: sheet.badgeClass
				});
			}

			// Also search inside sections & items
			for (const sec of sheet.sections) {
				const secTitleMatch = sec.title.toLowerCase().includes(q);
				if (secTitleMatch) {
					list.push({
						id: `${sheet.slug}-${sec.id}`,
						title: `${sheet.shortTitle} › ${sec.title}`,
						subtitle: `Section in ${sheet.title}`,
						category: sheet.category,
						url: `/${sheet.slug}#${sec.id}`,
						badgeClass: sheet.badgeClass
					});
				}

				if (sec.items) {
					for (const item of sec.items) {
						if ((item.code && item.code.toLowerCase().includes(q)) || item.explanation.toLowerCase().includes(q)) {
							list.push({
								id: `${sheet.slug}-${sec.id}-${item.code?.slice(0, 15)}`,
								title: `${sheet.shortTitle} › ${item.explanation}`,
								subtitle: item.code ?? '',
								category: sheet.category,
								url: `/${sheet.slug}#${sec.id}`,
								badgeClass: sheet.badgeClass,
								codeSnippet: item.code
							});
						}
					}
				}
			}
		}

		return list.slice(0, 20);
	});

	$effect(() => {
		selectedIndex = 0;
	});

	function open() {
		isOpen = true;
		query = '';
		selectedIndex = 0;
		setTimeout(() => inputElement?.focus(), 50);
	}

	function close() {
		isOpen = false;
	}

	function selectItem(res: SearchResult) {
		close();
		window.location.href = res.url;
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			if (isOpen) close();
			else open();
			return;
		}

		if (e.key === '/' && !isOpen) {
			const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
			if (tag !== 'input' && tag !== 'textarea') {
				e.preventDefault();
				open();
				return;
			}
		}

		if (!isOpen) return;

		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (results.length > 0) {
				selectedIndex = (selectedIndex + 1) % results.length;
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (results.length > 0) {
				selectedIndex = (selectedIndex - 1 + results.length) % results.length;
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (results[selectedIndex]) {
				selectItem(results[selectedIndex]);
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Custom global event listener -->
<svelte:document
	onopen-command-palette={() => {
		open();
	}}
/>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<div
			class="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
		>
			<!-- Search Input Bar -->
			<div class="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
				<svg class="w-5 h-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>

				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search 20+ cheatsheets, topics, syntax, or commands..."
					class="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
				/>

				{#if query}
					<button
						type="button"
						onclick={() => (query = '')}
						class="text-xs px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 bg-zinc-800"
					>
						Clear
					</button>
				{/if}

				<button
					type="button"
					onclick={close}
					class="text-xs px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700"
				>
					ESC
				</button>
			</div>

			<!-- Results List -->
			<div class="overflow-y-auto p-2 divide-y divide-zinc-800/40">
				{#if results.length === 0}
					<div class="py-12 text-center text-zinc-500 text-sm">
						No cheatsheets or commands matching "<span class="text-zinc-300 font-medium">{query}</span>"
					</div>
				{:else}
					{#each results as item, idx}
						<button
							type="button"
							onclick={() => selectItem(item)}
							onmouseenter={() => (selectedIndex = idx)}
							class="w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 transition-colors duration-100 {idx ===
							selectedIndex
								? 'bg-zinc-800 text-white'
								: 'text-zinc-300 hover:bg-zinc-800/50'}"
						>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-0.5">
									<span class="text-xs font-semibold px-2 py-0.5 rounded border {item.badgeClass}">
										{item.category}
									</span>
									<span class="font-medium text-sm text-zinc-100 truncate">
										{item.title}
									</span>
								</div>

								{#if item.codeSnippet}
									<p class="font-mono text-xs text-sky-400 truncate bg-black/40 px-2 py-1 rounded mt-1 border border-zinc-800">
										{item.codeSnippet}
									</p>
								{:else}
									<p class="text-xs text-zinc-400 truncate">
										{item.subtitle}
									</p>
								{/if}
							</div>

							<svg class="w-4 h-4 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer helper -->
			<div class="px-4 py-2 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
				<div class="flex items-center gap-3">
					<span><kbd class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">↑↓</kbd> navigate</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">↵</kbd> select</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">esc</kbd> close</span>
				</div>
				<span class="text-zinc-600 font-mono">cheatsheets.zip</span>
			</div>
		</div>
	</div>
{/if}
