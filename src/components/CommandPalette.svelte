<script lang="ts">
	import { onMount } from 'svelte';
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

	onMount(() => {
		document.addEventListener('open-command-palette', open);
		return () => {
			document.removeEventListener('open-command-palette', open);
		};
	});

	interface PaletteItem {
		type: 'sheet' | 'action';
		id: string;
		title: string;
		subtitle: string;
		category: string;
		url?: string;
		icon?: string;
		color?: string;
		action?: () => void;
	}

	function openContributeModal() {
		close();
		window.dispatchEvent(new CustomEvent('open-contribute-modal'));
	}

	let results = $derived.by<PaletteItem[]>(() => {
		const q = query.trim().toLowerCase();
		const list: PaletteItem[] = [];

		// Check for Contribution keyword actions
		const isAddQuery = q.includes('add') || q.includes('contribut') || q.includes('new') || q.includes('create');

		if (isAddQuery) {
			list.push({
				type: 'action',
				id: 'action-add-cheatsheet',
				title: 'Add / Contribute a Cheatsheet',
				subtitle: 'Submit a new cheat sheet or edit existing reference cards',
				category: 'Contribution',
				color: '#10b981',
				action: () => openContributeModal()
			});

			list.push({
				type: 'action',
				id: 'action-syntax-manual',
				title: 'CheatSheets Syntax Manual',
				subtitle: 'Formatting guide, layout variants, code blocks and tables',
				category: 'Guide',
				url: '/quickref',
				color: '#8b5cf6'
			});

			list.push({
				type: 'action',
				id: 'action-github-repo',
				title: 'Sumangal44/brohelpme on GitHub',
				subtitle: 'Open the upstream repository to contribute pull requests',
				category: 'External',
				color: '#24292f',
				action: () => window.open('https://github.com/Sumangal44/brohelpme', '_blank')
			});
		}

		if (!q) {
			// Show top 12 recommended cheatsheets + Quick contribute action
			list.push({
				type: 'action',
				id: 'action-contribute-default',
				title: 'Contribute / Add Cheatsheet ➕',
				subtitle: 'Learn how to publish a new reference card to cheatsheets.zip',
				category: 'Contribute',
				color: '#06b6d4',
				action: () => openContributeModal()
			});

			for (const sheet of sheets.slice(0, 10)) {
				list.push({
					type: 'sheet',
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					icon: sheet.icon,
					color: sheet.color
				});
			}

			return list;
		}

		// Cheatsheet search filtering
		for (const sheet of sheets) {
			const sheetTitleMatch = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
			const tagMatch = sheet.tags.some((t) => t.toLowerCase().includes(q));
			const introMatch = sheet.intro.toLowerCase().includes(q);

			if (sheetTitleMatch || tagMatch || introMatch) {
				list.push({
					type: 'sheet',
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					icon: sheet.icon,
					color: sheet.color
				});
			}
		}

		return list.slice(0, 25);
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

	function selectItem(item: PaletteItem) {
		close();
		if (item.action) {
			item.action();
		} else if (item.url) {
			window.location.href = item.url;
		}
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

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-all duration-150"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
	>
		<div
			class="relative w-full max-w-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
		>
			<!-- Search Input Bar -->
			<div class="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-border gap-3 bg-slate-50/80 dark:bg-muted/40">
				<svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>

				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search 200+ cheat sheets, or type 'add', 'docker', 'git'..."
					class="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:outline-none"
				/>

				{#if query}
					<button
						type="button"
						onclick={() => (query = '')}
						class="text-xs px-2 py-0.5 rounded text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-muted dark:text-muted-foreground dark:hover:text-foreground cursor-pointer transition-colors"
					>
						Clear
					</button>
				{/if}

				<button
					type="button"
					onclick={close}
					class="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 dark:bg-muted dark:hover:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:border-border cursor-pointer font-mono transition-colors"
				>
					ESC
				</button>
			</div>

			<!-- Results List -->
			<div class="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-border/30">
				{#if results.length === 0}
					<div class="py-12 text-center text-slate-500 dark:text-muted-foreground text-sm">
						No cheatsheet or action matching "<span class="text-slate-900 dark:text-foreground font-medium">{query}</span>"
						<div class="mt-3">
							<button
								type="button"
								onclick={openContributeModal}
								class="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer"
							>
								+ Contribute this sheet to BroHelp.Me
							</button>
						</div>
					</div>
				{:else}
					{#each results as item, idx}
						<button
							type="button"
							onclick={() => selectItem(item)}
							onmouseenter={() => (selectedIndex = idx)}
							class="group w-full text-left p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 transition-colors duration-100 cursor-pointer {idx ===
							selectedIndex
								? 'bg-slate-100 dark:bg-muted text-slate-900 dark:text-foreground font-medium shadow-xs'
								: 'text-slate-700 dark:text-foreground/80 hover:bg-slate-50 dark:hover:bg-muted/50'}"
						>
							<div class="flex items-center gap-3 min-w-0">
								{#if item.icon}
									<!-- Cheatsheet Tech Icon Badge -->
									<div
										class="w-8 h-8 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-xs border border-white/10"
										style="background: linear-gradient(135deg, {item.color || '#10b981'} 0%, {item.color || '#10b981'}bb 100%);"
									>
										<img src={item.icon} alt={item.title} class="w-full h-full object-contain filter brightness-110 drop-shadow-xs" />
									</div>
								{:else}
									<!-- Action Icon Badge -->
									<div
										class="w-8 h-8 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-xs text-white"
										style="background: linear-gradient(135deg, {item.color || '#10b981'} 0%, {item.color || '#10b981'}bb 100%);"
									>
										{#if item.id === 'action-github-repo'}
											<!-- GitHub octocat — yellow and twinkling, like the Star buttons -->
											<svg
												class="w-4 h-4 fill-black dark:fill-white animate-star-twinkle transition-transform duration-300"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
												/>
											</svg>
										{:else}
											<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
											</svg>
										{/if}
									</div>
								{/if}

								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 mb-0.5">
										<span class="font-medium text-sm text-slate-900 dark:text-foreground truncate">
											{item.title}
										</span>
										<span class="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 shrink-0">
											{item.category}
										</span>
									</div>

									<p class="text-xs text-slate-500 dark:text-muted-foreground truncate">
										{item.subtitle}
									</p>
								</div>
							</div>

							<svg class="w-4 h-4 text-slate-400 dark:text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer helper -->
			<div class="px-4 py-2.5 bg-slate-50/80 dark:bg-muted/40 border-t border-slate-200 dark:border-border flex items-center justify-between text-[11px] text-slate-500 dark:text-muted-foreground">
				<div class="flex items-center gap-3">
					<span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">↑↓</kbd> navigate</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">↵</kbd> select</span>
					<span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">esc</kbd> close</span>
				</div>
			</div>
		</div>
	</div>
{/if}