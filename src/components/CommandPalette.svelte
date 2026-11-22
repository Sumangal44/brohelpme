<script lang="ts">
	import { onMount } from 'svelte';
	import type { CheatsheetMeta } from '../lib/types';

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
		const isAddQuery =
			q.includes('add') || q.includes('contribut') || q.includes('new') || q.includes('create');

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
				url: '/brohelpme',
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
				subtitle: 'Learn how to publish a new reference card to BroHelp.Me',
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
			const sheetTitleMatch =
				sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
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
		class="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 px-3 pt-14 backdrop-blur-sm transition-all duration-150 sm:px-4 sm:pt-24 dark:bg-black/80"
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
			class="dark:border-border animate-in fade-in zoom-in-95 relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl duration-150 dark:bg-[#0d121f]"
		>
			<!-- Search Input Bar -->
			<div
				class="dark:border-border dark:bg-muted/40 flex items-center gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-3.5"
			>
				<svg
					class="h-5 w-5 shrink-0 text-emerald-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>

				<input
					bind:this={inputElement}
					bind:value={query}
					type="text"
					placeholder="Search 200+ cheat sheets, or type 'add', 'docker', 'git'..."
					class="dark:text-foreground dark:placeholder:text-muted-foreground w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
				/>

				{#if query}
					<button
						type="button"
						onclick={() => (query = '')}
						class="dark:bg-muted dark:text-muted-foreground dark:hover:text-foreground cursor-pointer rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
					>
						Clear
					</button>
				{/if}

				<button
					type="button"
					onclick={close}
					class="dark:bg-muted dark:hover:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:border-border cursor-pointer rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
				>
					ESC
				</button>
			</div>

			<!-- Results List -->
			<div class="dark:divide-border/30 divide-y divide-slate-100 overflow-y-auto p-2">
				{#if results.length === 0}
					<div class="dark:text-muted-foreground py-12 text-center text-sm text-slate-500">
						No cheatsheet or action matching "<span
							class="dark:text-foreground font-medium text-slate-900"
						>
							{query}
						</span>"
						<div class="mt-3">
							<button
								type="button"
								onclick={openContributeModal}
								class="cursor-pointer rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
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
							class="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl p-2.5 text-left transition-colors duration-100 sm:p-3 {idx ===
							selectedIndex
								? 'dark:bg-muted dark:text-foreground bg-slate-100 font-medium text-slate-900 shadow-xs'
								: 'dark:text-foreground/80 dark:hover:bg-muted/50 text-slate-700 hover:bg-slate-50'}"
						>
							<div class="flex min-w-0 items-center gap-3">
								{#if item.icon}
									<!-- Cheatsheet Tech Icon Badge -->
									<div
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 p-1.5 shadow-xs"
										style="background: linear-gradient(135deg, {item.color ||
											'#10b981'} 0%, {item.color || '#10b981'}bb 100%);"
									>
										<img
											src={item.icon}
											alt={item.title}
											class="h-full w-full object-contain brightness-110 drop-shadow-xs filter"
										/>
									</div>
								{:else}
									<!-- Action Icon Badge -->
									<div
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1.5 text-white shadow-xs"
										style="background: linear-gradient(135deg, {item.color ||
											'#10b981'} 0%, {item.color || '#10b981'}bb 100%);"
									>
										{#if item.id === 'action-github-repo'}
											<!-- GitHub octocat — yellow and twinkling, like the Star buttons -->
											<svg
												class="animate-star-twinkle h-4 w-4 fill-black transition-transform duration-300 dark:fill-white"
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
											<svg
												class="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
											</svg>
										{/if}
									</div>
								{/if}

								<div class="min-w-0 flex-1">
									<div class="mb-0.5 flex items-center gap-2">
										<span class="dark:text-foreground truncate text-sm font-medium text-slate-900">
											{item.title}
										</span>
										<span
											class="py-0.2 shrink-0 rounded-full border border-slate-300/60 bg-slate-200/70 px-2 font-mono text-[10px] text-slate-700 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
										>
											{item.category}
										</span>
									</div>

									<p class="dark:text-muted-foreground truncate text-xs text-slate-500">
										{item.subtitle}
									</p>
								</div>
							</div>

							<svg
								class="dark:text-muted-foreground h-4 w-4 shrink-0 text-slate-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer helper -->
			<div
				class="dark:bg-muted/40 dark:border-border dark:text-muted-foreground flex items-center justify-between border-t border-slate-200 bg-slate-50/80 px-4 py-2.5 text-[11px] text-slate-500"
			>
				<div class="flex items-center gap-3">
					<span>
						<kbd
							class="dark:bg-card dark:text-foreground dark:border-border rounded border border-slate-200 bg-white px-1.5 py-0.5 text-slate-700 shadow-xs"
						>
							↑↓
						</kbd> navigate
					</span>
					<span>
						<kbd
							class="dark:bg-card dark:text-foreground dark:border-border rounded border border-slate-200 bg-white px-1.5 py-0.5 text-slate-700 shadow-xs"
						>
							↵
						</kbd> select
					</span>
					<span>
						<kbd
							class="dark:bg-card dark:text-foreground dark:border-border rounded border border-slate-200 bg-white px-1.5 py-0.5 text-slate-700 shadow-xs"
						>
							esc
						</kbd> close
					</span>
				</div>
			</div>
		</div>
	</div>
{/if}
