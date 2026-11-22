<script lang="ts">
	import { onMount } from 'svelte';
	import type { CheatsheetMeta } from '../lib/types';
	import { Badge } from '$lib/components/ui/badge';
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
		const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
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
	<div class="text-center max-w-3xl mx-auto pt-4 pb-2 px-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-3">
			<img src="/logo.png" alt="logo" class="w-3.5 h-3.5 object-contain" />
			<span>Search Database — 200+ Developer Cheat Sheets</span>
		</div>

		<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-foreground">
			Find Any <span class="bg-linear-to-r from-emerald-600 via-teal-500 to-sky-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent">Cheat Sheet</span>
		</h1>

		<p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-muted-foreground max-w-xl mx-auto leading-relaxed">
			Instant syntax lookup, CLI commands, and shortcuts. Filter by technology, topic, category, or card count.
		</p>
	</div>

	<!-- Main Search Input Box (High Contrast Light / Dark) -->
	<div class="max-w-3xl mx-auto">
		<div class="relative bg-white dark:bg-card border border-slate-300/90 dark:border-border rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none p-2 sm:p-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15">
			<div class="flex items-center gap-3 px-3 py-2">
				<svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>

				<input
					bind:this={searchInput}
					bind:value={searchQuery}
					type="text"
					placeholder="Search by name, command, tag (e.g. docker, git rebase, python, bash, postgres)..."
					class="w-full text-sm sm:text-base bg-transparent text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:outline-none"
				/>

				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-muted dark:text-muted-foreground dark:hover:text-foreground cursor-pointer transition-colors"
						title="Clear query"
					>
						Clear
					</button>
				{/if}

				<kbd class="hidden sm:inline-flex items-center text-[10px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-muted text-slate-500 dark:text-muted-foreground border border-slate-200 dark:border-border">
					ESC to reset
				</kbd>
			</div>
		</div>

		<!-- Popular Quick Tag Suggestions -->
		<div class="mt-3 flex items-center gap-1.5 flex-wrap px-1">
			<span class="text-xs text-slate-500 dark:text-muted-foreground mr-1">Popular:</span>
			{#each popularTags as tag}
				<button
					type="button"
					onclick={() => {
						selectedTag = selectedTag === tag ? null : tag;
					}}
					class="text-[11px] font-mono px-2 py-0.5 rounded-lg border transition-all cursor-pointer {selectedTag === tag
						? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold'
						: 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 dark:bg-card dark:hover:bg-muted dark:text-muted-foreground dark:border-border'}"
				>
					#{tag}
				</button>
			{/each}
		</div>
	</div>

	<!-- Filter Controls & Category Tabs -->
	<div class="bg-white/95 dark:bg-card/90 border border-slate-200/90 dark:border-border rounded-2xl p-4 backdrop-blur-md shadow-sm transition-colors">
		<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
			<!-- Category Tabs -->
			<div class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none max-w-full">
				{#each categories as cat}
					<button
						type="button"
						onclick={() => (activeCategory = cat)}
						class="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer {activeCategory === cat
							? 'bg-emerald-600 text-white font-semibold shadow-xs shadow-emerald-600/30 ring-1 ring-emerald-500'
							: 'bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 border border-slate-200/80 dark:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted dark:border-transparent'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- Sort and Reset -->
			<div class="flex items-center gap-2 shrink-0 self-end lg:self-center">
				<label class="text-xs text-slate-500 dark:text-muted-foreground flex items-center gap-1.5">
					<span>Sort:</span>
					<select
						bind:value={sortBy}
						class="text-xs bg-slate-50 dark:bg-muted border border-slate-200 dark:border-border rounded-lg px-2.5 py-1 text-slate-800 dark:text-foreground focus:outline-none focus:border-emerald-500 cursor-pointer"
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
						class="text-xs px-2.5 py-1 text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 rounded-lg transition-colors cursor-pointer"
					>
						Reset
					</button>
				{/if}
			</div>
		</div>

		<!-- Result Status Summary -->
		<div class="mt-3 pt-3 border-t border-slate-200/80 dark:border-border flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-muted-foreground gap-2">
			<div class="flex items-center gap-1.5 flex-wrap">
				<span>Found <span class="text-slate-900 dark:text-foreground font-semibold">{filteredSheets.length}</span> cheat sheets</span>
				{#if searchQuery}
					<span>matching "<span class="text-slate-900 dark:text-foreground font-medium">{searchQuery}</span>"</span>
				{/if}
				{#if activeCategory !== 'All'}
					<span>in <span class="text-emerald-600 dark:text-emerald-400 font-medium">{activeCategory}</span></span>
				{/if}
				{#if selectedTag}
					<span>with tag <span class="font-mono text-emerald-600 dark:text-emerald-400 font-medium">#{selectedTag}</span></span>
				{/if}
			</div>

			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
					class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
				>
					<span>+ Submit new cheat sheet</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Results Grid -->
	{#if filteredSheets.length === 0}
		<div class="text-center py-20 bg-slate-50/80 dark:bg-card border border-dashed border-slate-300 dark:border-border rounded-2xl p-6">
			<div class="w-14 h-14 rounded-2xl bg-slate-200/70 dark:bg-muted flex items-center justify-center mx-auto mb-4 text-slate-400">
				<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<p class="text-slate-800 dark:text-foreground font-semibold text-lg">No cheat sheets match your search</p>
			<p class="text-sm text-slate-500 dark:text-muted-foreground mt-1 max-w-md mx-auto">
				We couldn't find any cheat sheets matching your query. Try a different keyword or check out popular developer topics.
			</p>

			<div class="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-lg mx-auto">
				{#each ['git', 'docker', 'python', 'linux', 'bash', 'sql', 'react', 'vim', 'nginx', 'kubernetes'] as suggestion}
					<button
						type="button"
						onclick={() => {
							searchQuery = suggestion;
							activeCategory = 'All';
							selectedTag = null;
						}}
						class="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-muted text-slate-700 dark:text-foreground border border-slate-200 dark:border-border hover:border-emerald-500 transition-colors cursor-pointer shadow-2xs"
					>
						{suggestion}
					</button>
				{/each}
			</div>

			<div class="flex items-center justify-center gap-3 mt-6">
				<button
					type="button"
					onclick={clearFilters}
					class="px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl border border-emerald-300 dark:border-emerald-500/30 transition-colors cursor-pointer"
				>
					Reset all filters
				</button>
				<button
					type="button"
					onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
					class="px-4 py-2 text-xs font-medium text-slate-700 dark:text-foreground bg-white dark:bg-muted hover:bg-slate-100 rounded-xl border border-slate-200 dark:border-border transition-colors shadow-2xs cursor-pointer"
				>
					+ Add this cheat sheet
				</button>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each filteredSheets as sheet}
				<a
					href="/{sheet.slug}"
					title="{sheet.title} Cheat Sheet"
					class="group block bg-white dark:bg-card border border-slate-200/90 dark:border-border hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
				>
					<div class="flex items-start justify-between gap-3">
						<!-- Icon badge -->
						<div
							class="w-11 h-11 rounded-xl p-2 flex items-center justify-center shrink-0 shadow-xs border border-white/10 group-hover:scale-105 transition-transform"
							style="background: {deepCardGradient(sheet.color)};"
						>
							<img src={sheet.icon} alt={sheet.title} class="w-full h-full object-contain filter drop-shadow brightness-110" />
						</div>

						<!-- Card count pill -->
						<span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shrink-0">
							{sheet.cardCount} cards
						</span>
					</div>

					<div class="mt-3">
						<div class="flex items-center justify-between gap-1">
							<h3 class="text-sm font-semibold text-slate-900 dark:text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
								{sheet.title}
							</h3>
							<span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-muted dark:text-slate-400 shrink-0 border border-slate-200/60 dark:border-transparent">
								{sheet.category}
							</span>
						</div>

						<p class="mt-1.5 text-xs text-slate-500 dark:text-muted-foreground line-clamp-2 leading-relaxed">
							{sheet.intro || `Quick reference guide and copy-paste syntax for ${sheet.title}.`}
						</p>
					</div>

					<!-- Tags footer -->
					{#if sheet.tags.length > 0}
						<div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-border/40 flex items-center gap-1 overflow-hidden">
							{#each sheet.tags.slice(0, 3) as tag}
								<span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-muted/50 px-1.5 py-0.2 rounded border border-slate-200/50 dark:border-transparent truncate max-w-20">
									#{tag}
								</span>
							{/each}
							{#if sheet.tags.length > 3}
								<span class="text-[10px] font-mono text-muted-foreground">+{sheet.tags.length - 3}</span>
							{/if}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>
