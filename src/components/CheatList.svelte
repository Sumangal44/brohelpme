<script lang="ts">
	import type { CheatsheetMeta } from '../lib/cheatsheets';

	interface Props {
		sheets: CheatsheetMeta[];
		categories: string[];
	}

	let { sheets = [], categories = ['All'] }: Props = $props();

	let activeCategory = $state<string>('All');
	let searchQuery = $state<string>('');

	let filteredSheets = $derived.by<CheatsheetMeta[]>(() => {
		const q = searchQuery.trim().toLowerCase();
		return sheets.filter((sheet) => {
			const matchesCategory = activeCategory === 'All' || sheet.category === activeCategory;
			if (!matchesCategory) return false;

			if (!q) return true;

			const inTitle = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
			const inIntro = sheet.intro.toLowerCase().includes(q);
			const inTags = sheet.tags.some((t) => t.toLowerCase().includes(q));

			return inTitle || inIntro || inTags;
		});
	});

	function clearSearch() {
		searchQuery = '';
	}
</script>

<div class="space-y-8">
	<!-- Hero Header -->
	<div class="text-center max-w-3xl mx-auto pt-6 sm:pt-10 pb-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
			<img src="/logo.svg" alt="logo" class="w-3.5 h-3.5" />
			<span>Community-driven developer quick reference repository</span>
		</div>

		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
			Cheat Sheets for <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">Developers</span>
		</h1>

		<p class="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
			Copy-paste friendly syntax references, command lines, shortcuts, and configurations across 200+ technologies. Free, open source, and zero clutter.
		</p>
	</div>

	<!-- Controls: Categories & Search Filter -->
	<div class="bg-[#0c101c]/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Category Tabs -->
			<div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
				{#each categories as cat}
					<button
						type="button"
						onclick={() => (activeCategory = cat)}
						class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer {activeCategory ===
						cat
							? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
							: 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/80'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- Inline Search Input -->
			<div class="relative w-full md:w-72 shrink-0">
				<svg class="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>

				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Filter 200+ sheets (e.g. git, python)..."
					class="w-full pl-9 pr-8 py-1.5 text-xs bg-zinc-950/80 border border-zinc-750 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
				/>

				{#if searchQuery}
					<button
						type="button"
						onclick={clearSearch}
						class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xs"
					>
						×
					</button>
				{/if}
			</div>
		</div>

		<!-- Status bar -->
		<div class="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
			<div>
				Showing <span class="text-zinc-200 font-semibold">{filteredSheets.length}</span> of {sheets.length} reference guides
			</div>
			<div class="hidden sm:flex items-center gap-2">
				<span>Press <kbd class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-[10px]">⌘K</kbd> to search everything</span>
			</div>
		</div>
	</div>

	<!-- Cheatsheet Cards Grid -->
	{#if filteredSheets.length === 0}
		<div class="text-center py-16 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
			<p class="text-zinc-400 text-base">No cheatsheet matches your query.</p>
			<button
				type="button"
				onclick={() => {
					activeCategory = 'All';
					searchQuery = '';
				}}
				class="mt-3 px-4 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/30 transition-colors"
			>
				Reset all filters
			</button>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
			{#each filteredSheets as sheet}
				<a
					href="/{sheet.slug}"
					class="group relative bg-[#0c101c] hover:bg-[#111728] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/70"
				>
					<div>
						<!-- Top row: Icon + Category Badge -->
						<div class="flex items-center justify-between gap-3 mb-3">
							<div class="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-750 p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 group-hover:border-zinc-600 transition-all">
								<img src={sheet.icon} alt={sheet.title} class="w-6 h-6 object-contain" />
							</div>

							<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80">
								{sheet.category}
							</span>
						</div>

						<h2 class="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
							<span class="truncate">{sheet.title}</span>
							<svg class="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</h2>

						<p class="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
							{sheet.intro}
						</p>
					</div>

					<!-- Bottom tags & section count -->
					<div class="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
						<div class="flex items-center gap-1.5 flex-wrap overflow-hidden">
							{#each sheet.tags.slice(0, 2) as tag}
								<span class="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-[10px] truncate">
									#{tag}
								</span>
							{/each}
						</div>
						<span class="font-medium text-zinc-400 shrink-0">
							{sheet.cardCount} cards
						</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
