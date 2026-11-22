<script lang="ts">
	import { onMount } from 'svelte';
	import type { CheatsheetMeta } from '../lib/types';
	import { deepCardGradient } from '$lib/card-gradient';

	interface Props {
		sheets: CheatsheetMeta[];
		categories: string[];
	}

	let { sheets = [], categories = ['All'] }: Props = $props();

	let searchQuery = $state('');
	let activeCategory = $state('All');
	let selectedTag = $state<string | null>(null);
	let sortBy = $state<'relevant' | 'cards' | 'az'>('relevant');
	let searchInput = $state<HTMLInputElement | null>(null);

	// Extract unique top tags
	let popularTags = $derived.by<string[]>(() => {
		const tagCounts = new Map<string, number>();
		for (const s of sheets) {
			for (const t of s.tags) {
				const tag = t.trim().toLowerCase();
				if (tag && tag.length > 1) {
					tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
				}
			}
		}
		return Array.from(tagCounts.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 16)
			.map(([t]) => t);
	});

	onMount(() => {
		// Read initial query params from URL
		try {
			const params = new URLSearchParams(window.location.search);
			const q = params.get('q');
			const cat = params.get('category');
			const tag = params.get('tag');

			if (q) searchQuery = q;
			if (cat && (cat === 'All' || categories.includes(cat))) activeCategory = cat;
			if (tag) selectedTag = tag;
		} catch (e) {
			console.error(e);
		}

		// Auto-focus search input
		if (searchInput) {
			searchInput.focus();
		}
	});

	// Keep URL query string in sync when user filters
	$effect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		if (searchQuery.trim()) params.set('q', searchQuery.trim());
		if (activeCategory !== 'All') params.set('category', activeCategory);
		if (selectedTag) params.set('tag', selectedTag);

		const queryString = params.toString();
		const newUrl = queryString
			? `${window.location.pathname}?${queryString}`
			: window.location.pathname;
		window.history.replaceState({}, '', newUrl);
	});

	// Filter and sort sheets
	let filteredSheets = $derived.by<CheatsheetMeta[]>(() => {
		const q = searchQuery.trim().toLowerCase();

		let list = sheets.filter((sheet) => {
			// Category filter
			if (activeCategory !== 'All' && sheet.category !== activeCategory) {
				return false;
			}

			// Tag filter
			if (selectedTag && !sheet.tags.some((t) => t.toLowerCase() === selectedTag)) {
				return false;
			}

			// Search text match
			if (!q) return true;

			const inTitle = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
			const inIntro = sheet.intro.toLowerCase().includes(q);
			const inTags = sheet.tags.some((t) => t.toLowerCase().includes(q));
			const inCategory = sheet.category.toLowerCase().includes(q);

			return inTitle || inIntro || inTags || inCategory;
		});

		// Sort
		if (sortBy === 'cards') {
			list = [...list].sort((a, b) => b.cardCount - a.cardCount);
		} else if (sortBy === 'az') {
			list = [...list].sort((a, b) => a.title.localeCompare(b.title));
		}

		return list;
	});

	function clearFilters() {
		searchQuery = '';
		activeCategory = 'All';
		selectedTag = null;
		sortBy = 'relevant';
		if (searchInput) searchInput.focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && (searchQuery || activeCategory !== 'All' || selectedTag)) {
			clearFilters();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-8">
	<!-- Hero / Search Header -->
	<div class="mx-auto max-w-3xl px-2 pt-4 pb-2 text-center">
		<div
			class="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
		>
			<img src="/logo.png" alt="logo" class="h-3.5 w-3.5 object-contain" />
			<span>Search Database — 200+ Developer Cheat Sheets</span>
		</div>

		<h1
			class="dark:text-foreground text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
		>
			Find Any <span
				class="bg-linear-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400"
			>
				Cheat Sheet
			</span>
		</h1>

		<p
			class="dark:text-muted-foreground mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base"
		>
			Instant syntax lookup, CLI commands, and shortcuts. Filter by technology, topic, category, or
			card count.
		</p>
	</div>

	<!-- Main Search Input Box (High Contrast Light / Dark) -->
	<div class="mx-auto max-w-3xl">
		<div
			class="dark:bg-card dark:border-border relative rounded-2xl border border-slate-300/90 bg-white p-2 shadow-lg shadow-slate-200/50 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15 sm:p-2.5 dark:shadow-none"
		>
			<div class="flex items-center gap-3 px-3 py-2">
				<svg
					class="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
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
					bind:this={searchInput}
					bind:value={searchQuery}
					type="text"
					placeholder="Search by name, command, tag (e.g. docker, git rebase, python, bash, postgres)..."
					class="dark:text-foreground dark:placeholder:text-muted-foreground w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
				/>

				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="dark:bg-muted dark:text-muted-foreground dark:hover:text-foreground cursor-pointer rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
						title="Clear query"
					>
						Clear
					</button>
				{/if}

				<kbd
					class="dark:bg-muted dark:text-muted-foreground dark:border-border hidden items-center rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500 sm:inline-flex"
				>
					ESC to reset
				</kbd>
			</div>
		</div>

		<!-- Popular Quick Tag Suggestions -->
		<div class="mt-3 flex flex-wrap items-center gap-1.5 px-1">
			<span class="dark:text-muted-foreground mr-1 text-xs text-slate-500">Popular:</span>
			{#each popularTags as tag}
				<button
					type="button"
					onclick={() => {
						selectedTag = selectedTag === tag ? null : tag;
					}}
					class="cursor-pointer rounded-lg border px-2 py-0.5 font-mono text-[11px] transition-all {selectedTag ===
					tag
						? 'border-emerald-600 bg-emerald-600 font-semibold text-white shadow-2xs'
						: 'dark:bg-card dark:hover:bg-muted dark:text-muted-foreground dark:border-border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'}"
				>
					#{tag}
				</button>
			{/each}
		</div>
	</div>

	<!-- Filter Controls & Category Tabs -->
	<div
		class="dark:bg-card/90 dark:border-border rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-md transition-colors"
	>
		<div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
			<!-- Category Tabs -->
			<div class="flex max-w-full scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
				{#each categories as cat}
					<button
						type="button"
						onclick={() => (activeCategory = cat)}
						class="cursor-pointer rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 {activeCategory ===
						cat
							? 'bg-emerald-600 font-semibold text-white shadow-xs ring-1 shadow-emerald-600/30 ring-emerald-500'
							: 'dark:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted border border-slate-200/80 bg-slate-100 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900 dark:border-transparent'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- Sort and Reset -->
			<div class="flex shrink-0 items-center gap-2 self-end lg:self-center">
				<label class="dark:text-muted-foreground flex items-center gap-1.5 text-xs text-slate-500">
					<span>Sort:</span>
					<select
						bind:value={sortBy}
						class="dark:bg-muted dark:border-border dark:text-foreground cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
					>
						<option value="relevant">Relevance</option>
						<option value="cards">Most Cards</option>
						<option value="az">Alphabetical (A-Z)</option>
					</select>
				</label>

				{#if searchQuery || activeCategory !== 'All' || selectedTag}
					<button
						type="button"
						onclick={clearFilters}
						class="cursor-pointer rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs text-rose-600 transition-colors hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
					>
						Reset
					</button>
				{/if}
			</div>
		</div>

		<!-- Result Status Summary -->
		<div
			class="dark:border-border dark:text-muted-foreground mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-3 text-xs text-slate-500"
		>
			<div class="flex flex-wrap items-center gap-1.5">
				<span>
					Found <span class="dark:text-foreground font-semibold text-slate-900">
						{filteredSheets.length}
					</span> cheat sheets
				</span>
				{#if searchQuery}
					<span>
						matching "<span class="dark:text-foreground font-medium text-slate-900">
							{searchQuery}
						</span>"
					</span>
				{/if}
				{#if activeCategory !== 'All'}
					<span>
						in <span class="font-medium text-emerald-600 dark:text-emerald-400">
							{activeCategory}
						</span>
					</span>
				{/if}
				{#if selectedTag}
					<span>
						with tag <span class="font-mono font-medium text-emerald-600 dark:text-emerald-400">
							#{selectedTag}
						</span>
					</span>
				{/if}
			</div>

			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
					class="flex cursor-pointer items-center gap-1 text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
				>
					<span>+ Submit new cheat sheet</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Results Grid -->
	{#if filteredSheets.length === 0}
		<div
			class="dark:bg-card dark:border-border rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 py-20 text-center"
		>
			<div
				class="dark:bg-muted mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/70 text-slate-400"
			>
				<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<p class="dark:text-foreground text-lg font-semibold text-slate-800">
				No cheat sheets match your search
			</p>
			<p class="dark:text-muted-foreground mx-auto mt-1 max-w-md text-sm text-slate-500">
				We couldn't find any cheat sheets matching your query. Try a different keyword or check out
				popular developer topics.
			</p>

			<div class="mx-auto mt-4 flex max-w-lg flex-wrap items-center justify-center gap-2">
				{#each ['git', 'docker', 'python', 'linux', 'bash', 'sql', 'react', 'vim', 'nginx', 'kubernetes'] as suggestion}
					<button
						type="button"
						onclick={() => {
							searchQuery = suggestion;
							activeCategory = 'All';
							selectedTag = null;
						}}
						class="dark:bg-muted dark:text-foreground dark:border-border cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-2xs transition-colors hover:border-emerald-500"
					>
						{suggestion}
					</button>
				{/each}
			</div>

			<div class="mt-6 flex items-center justify-center gap-3">
				<button
					type="button"
					onclick={clearFilters}
					class="cursor-pointer rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
				>
					Reset all filters
				</button>
				<button
					type="button"
					onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
					class="dark:text-foreground dark:bg-muted dark:border-border cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-100"
				>
					+ Add this cheat sheet
				</button>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredSheets as sheet}
				<a
					href="/{sheet.slug}"
					title="{sheet.title} Cheat Sheet"
					class="group dark:bg-card dark:border-border block rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-md dark:hover:border-emerald-500/50"
				>
					<div class="flex items-start justify-between gap-3">
						<!-- Icon badge -->
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 p-2 shadow-xs transition-transform group-hover:scale-105"
							style="background: {deepCardGradient(sheet.color)};"
						>
							<img
								src={sheet.icon}
								alt={sheet.title}
								class="h-full w-full object-contain brightness-110 drop-shadow filter"
							/>
						</div>

						<!-- Card count pill -->
						<span
							class="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
						>
							{sheet.cardCount} cards
						</span>
					</div>

					<div class="mt-3">
						<div class="flex items-center justify-between gap-1">
							<h3
								class="dark:text-foreground truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
							>
								{sheet.title}
							</h3>
							<span
								class="dark:bg-muted shrink-0 rounded border border-slate-200/60 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 uppercase dark:border-transparent dark:text-slate-400"
							>
								{sheet.category}
							</span>
						</div>

						<p
							class="dark:text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500"
						>
							{sheet.intro || `Quick reference guide and copy-paste syntax for ${sheet.title}.`}
						</p>
					</div>

					<!-- Tags footer -->
					{#if sheet.tags.length > 0}
						<div
							class="dark:border-border/40 mt-3 flex items-center gap-1 overflow-hidden border-t border-slate-100 pt-2.5"
						>
							{#each sheet.tags.slice(0, 3) as tag}
								<span
									class="dark:bg-muted/50 py-0.2 max-w-20 truncate rounded border border-slate-200/50 bg-slate-50 px-1.5 font-mono text-[10px] text-slate-500 dark:border-transparent dark:text-slate-400"
								>
									#{tag}
								</span>
							{/each}
							{#if sheet.tags.length > 3}
								<span class="text-muted-foreground font-mono text-[10px]">
									+{sheet.tags.length - 3}
								</span>
							{/if}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>
