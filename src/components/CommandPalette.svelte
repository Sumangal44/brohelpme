<script lang="ts">
	import type { CheatsheetMeta } from '../lib/types';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		sheets: CheatsheetMeta[];
	}

	let { sheets = [] }: Props = $props();

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
		icon: string;
	}

	let results = $derived.by<SearchResult[]>(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			// Show top 12 recommended cheatsheets
			return sheets.slice(0, 12).map((sheet) => ({
				id: sheet.slug,
				title: sheet.title,
				subtitle: sheet.intro,
				category: sheet.category,
				url: `/${sheet.slug}`,
				icon: sheet.icon
			}));
		}

		const list: SearchResult[] = [];

		for (const sheet of sheets) {
			const sheetTitleMatch = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
			const tagMatch = sheet.tags.some((t) => t.toLowerCase().includes(q));
			const introMatch = sheet.intro.toLowerCase().includes(q);

			if (sheetTitleMatch || tagMatch || introMatch) {
				list.push({
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					icon: sheet.icon
				});
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

<svelte:document
	onopen-command-palette={() => {
		open();
	}}
/>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<div
			class="relative w-full max-w-2xl bg-white dark:bg-[#0e1422] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
		>
			<!-- Search Input Bar -->
			<div class="flex items-center px-4 py-3.5 border-b border-border gap-3 bg-muted/30">
				<svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>

				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search 200+ cheat sheets (e.g. git, docker, python)..."
					class="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
				/>

				{#if query}
					<button
						type="button"
						onclick={() => (query = '')}
						class="text-xs px-2 py-0.5 rounded text-muted-foreground hover:text-foreground bg-muted cursor-pointer"
					>
						Clear
					</button>
				{/if}

				<button
					type="button"
					onclick={close}
					class="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border cursor-pointer font-mono"
				>
					ESC
				</button>
			</div>

			<!-- Results List -->
			<div class="overflow-y-auto p-2 divide-y divide-border/40">
				{#if results.length === 0}
					<div class="py-12 text-center text-muted-foreground text-sm">
						No cheatsheet matching "<span class="text-foreground font-medium">{query}</span>"
					</div>
				{:else}
					{#each results as item, idx}
						<button
							type="button"
							onclick={() => selectItem(item)}
							onmouseenter={() => (selectedIndex = idx)}
							class="w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors duration-100 cursor-pointer {idx ===
							selectedIndex
								? 'bg-muted text-foreground font-medium shadow-xs'
								: 'text-foreground/80 hover:bg-muted/50'}"
						>
							<div class="flex items-center gap-3 min-w-0">
								<div class="w-8 h-8 rounded-lg bg-muted border border-border p-1.5 flex items-center justify-center shrink-0">
									<img src={item.icon} alt={item.title} class="w-full h-full object-contain" />
								</div>

								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 mb-0.5">
										<span class="font-medium text-sm text-foreground truncate">
											{item.title}
										</span>
										<Badge variant="secondary" class="text-[10px] px-1.5 py-0">
											{item.category}
										</Badge>
									</div>

									<p class="text-xs text-muted-foreground truncate">
										{item.subtitle}
									</p>
								</div>
							</div>

							<svg class="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer helper -->
			<div class="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
				<div class="flex items-center gap-3">
					<span><kbd class="px-1.5 py-0.5 rounded bg-muted text-foreground border border-border">↑↓</kbd> navigate</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-muted text-foreground border border-border">↵</kbd> select</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-muted text-foreground border border-border">esc</kbd> close</span>
				</div>
				<span class="font-mono text-muted-foreground">cheatsheets.zip</span>
			</div>
		</div>
	</div>
{/if}
