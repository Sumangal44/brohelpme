<script lang="ts">
	import type { CheatsheetMeta } from '../lib/types';
	import { RECOMMENDED_SLUGS, HOMEPAGE_CATEGORIES } from '../lib/types';
	import { deepCardGradient } from '$lib/card-gradient';

	interface Props {
		sheets: CheatsheetMeta[];
		categories: string[];
	}

	let { sheets = [], categories = ['All'] }: Props = $props();

	let activeCategory = $state<string>('All');
	let searchQuery = $state<string>('');

	// Recommended cards
	let recommendedSheets = $derived.by<CheatsheetMeta[]>(() => {
		return RECOMMENDED_SLUGS.map((slug) => sheets.find((s) => s.slug === slug)).filter(
			(s): s is CheatsheetMeta => s !== undefined
		);
	});

	// Sheets grouped by category for the full homepage view
	let sheetsByCategory = $derived.by<{ category: string; list: CheatsheetMeta[] }[]>(() => {
		const groups: { category: string; list: CheatsheetMeta[] }[] = [];
		for (const cat of HOMEPAGE_CATEGORIES) {
			const list = sheets.filter((s) => s.category === cat);
			if (list.length > 0) {
				groups.push({ category: cat, list });
			}
		}

		// Any remaining categories
		const used = new Set(HOMEPAGE_CATEGORIES);
		for (const s of sheets) {
			if (!used.has(s.category)) {
				let g = groups.find((gr) => gr.category === s.category);
				if (!g) {
					g = { category: s.category, list: [] };
					groups.push(g);
				}
				g.list.push(s);
			}
		}

		return groups;
	});

	// Filtered list when searching or selecting single category
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

<div class="space-y-10">
	<!-- Hero Header -->
	<div class="mx-auto max-w-3xl px-2 pt-4 pb-2 text-center sm:pt-8">
		<div
			class="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
		>
			<img src="/logo.png" alt="logo" class="h-3.5 w-3.5 object-contain" />
			<span>Community-driven developer quick reference repository</span>
		</div>

		<h1
			class="text-foreground text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
		>
			Cheat Sheets for <span
				class="bg-linear-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text text-transparent"
			>
				Developers
			</span>
		</h1>

		<p class="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
			Fast copy-paste reference cards, command line lookups, and shortcuts across 200+ technologies.
			Free, modern, and zero clutter.
		</p>

		<!-- Action CTA buttons in hero -->
		<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
			<button
				type="button"
				onclick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
				class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-700 sm:text-sm"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<span>Search 200+ Sheets</span>
				<kbd
					class="rounded border border-emerald-400/30 bg-emerald-700/60 px-1.5 py-0.5 font-mono text-[10px]"
				>
					⌘K
				</kbd>
			</button>

			<button
				type="button"
				onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
				class="bg-card hover:bg-muted text-foreground border-border inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium shadow-xs transition-all sm:text-sm"
			>
				<svg
					class="h-4 w-4 text-emerald-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
				<span>+ Add Cheatsheet</span>
			</button>
		</div>
	</div>

	<!-- Controls: Categories & Search Filter (Full Responsive & Theme-Aware) -->
	<div
		class="bg-card/95 border-border sticky top-16 z-30 rounded-2xl border p-3.5 shadow-md shadow-slate-200/40 backdrop-blur-md transition-colors sm:p-5 dark:shadow-lg/50"
	>
		<div class="flex flex-col justify-between gap-3.5 md:flex-row md:items-center">
			<!-- Category Tabs -->
			<div class="flex max-w-full scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
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

			<!-- Inline Search Input -->
			<div class="relative w-full shrink-0 md:w-72">
				<svg
					class="dark:text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>

				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Filter 200+ cheat sheets..."
					class="dark:bg-muted/40 dark:focus:bg-muted/60 dark:border-input dark:text-foreground dark:placeholder:text-muted-foreground w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-8 pl-9 text-xs text-slate-900 shadow-2xs transition-all placeholder:text-slate-400 hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
				/>

				{#if searchQuery}
					<button
						type="button"
						onclick={clearSearch}
						class="dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-xs text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
						title="Clear search"
					>
						×
					</button>
				{/if}
			</div>
		</div>

		<!-- Status bar -->
		<div
			class="dark:border-border dark:text-muted-foreground mt-3 flex items-center justify-between border-t border-slate-200/90 pt-3 text-xs text-slate-500"
		>
			<div>
				Showing <span class="dark:text-foreground font-semibold text-slate-900">
					{filteredSheets.length}
				</span>
				of {sheets.length} cheat sheets
			</div>
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => window.dispatchEvent(new CustomEvent('open-contribute-modal'))}
					class="flex cursor-pointer items-center gap-1 text-xs text-emerald-600 hover:underline dark:text-emerald-400"
				>
					<span>+ Submit new sheet</span>
				</button>
				<span class="dark:text-muted-foreground/40 hidden text-slate-300 sm:inline">•</span>
				<span class="hidden items-center gap-1 sm:flex">
					Press <kbd
						class="dark:bg-muted dark:text-foreground dark:border-border rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700"
					>
						⌘K
					</kbd> to search
				</span>
			</div>
		</div>
	</div>

	<!-- Content Presentation -->
	{#if searchQuery || activeCategory !== 'All'}
		<!-- Filtered Mode Grid -->
		<div>
			{#if filteredSheets.length === 0}
				<div
					class="dark:bg-muted/20 dark:border-border rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 py-16 text-center"
				>
					<div
						class="dark:bg-muted mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200/70 text-slate-400"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<p class="dark:text-foreground text-base font-medium text-slate-700">
						No cheat sheet matches your query.
					</p>
					<p class="dark:text-muted-foreground mt-1 text-xs text-slate-500">
						Try another keyword, or use Command Palette to search across all cheat sheets.
					</p>
					<div class="mt-4 flex items-center justify-center gap-3">
						<button
							type="button"
							onclick={() => {
								activeCategory = 'All';
								searchQuery = '';
							}}
							class="cursor-pointer rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
						>
							Reset all filters
						</button>
						<button
							type="button"
							onclick={() => {
								document.dispatchEvent(new CustomEvent('open-command-palette'));
							}}
							class="dark:text-foreground dark:bg-muted dark:border-border cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-100"
						>
							Open Command Palette (⌘K)
						</button>
					</div>
				</div>
			{:else}
				<div
					class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
				>
					{#each filteredSheets as sheet}
						<a href="/{sheet.slug}" title="{sheet.title} Cheatsheet" class="group block">
							<div
								class="relative flex cursor-pointer items-center overflow-hidden rounded-xl border border-black/5 p-3 shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-xl sm:p-4 dark:border-white/10"
								style="background: {deepCardGradient(sheet.color)};"
							>
								{#if sheet.badge || sheet.isLatest}
									<span
										class="absolute top-2 right-2 flex items-center gap-1 rounded-full border border-white/25 bg-emerald-500/90 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-white uppercase shadow-xs backdrop-blur-xs"
									>
										<span class="inline-block size-1.5 animate-pulse rounded-full bg-white"></span>
										{sheet.badge || 'Latest'}
									</span>
								{/if}
								<div
									class="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/25 p-1.5 shadow-inner backdrop-blur-sm sm:h-9 sm:w-9"
								>
									<img
										src={sheet.icon}
										alt={sheet.title}
										class="h-full w-full object-contain brightness-110 drop-shadow filter"
									/>
								</div>
								<div class="min-w-0 flex-1 {sheet.badge || sheet.isLatest ? 'pr-12 sm:pr-14' : ''}">
									<p class="truncate text-xs font-semibold text-white drop-shadow-sm sm:text-sm">
										{sheet.title}
									</p>
									<span class="font-mono text-[10px] text-white/85">{sheet.cardCount} cards</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<!-- Default Full Mode: Recommended + Ordered Category Sections (like cheatsheets.zip) -->
		<div class="space-y-12">
			<!-- Recommended Section -->
			<div>
				<div class="mb-2 flex items-center justify-between">
					<h2 class="text-foreground text-lg font-medium sm:text-xl">
						⭐ Recommended Cheat Sheets
					</h2>
				</div>
				<div class="bg-border mb-6 h-1 w-24 overflow-hidden rounded-full">
					<div class="h-full w-full bg-linear-to-r from-emerald-500 to-teal-400"></div>
				</div>

				<div
					class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
				>
					{#each recommendedSheets as sheet}
						<a href="/{sheet.slug}" title="{sheet.title} Cheatsheet" class="group block">
							<div
								class="relative flex cursor-pointer items-center overflow-hidden rounded-xl border border-black/5 p-3 shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-xl sm:p-4 dark:border-white/10"
								style="background: {deepCardGradient(sheet.color)};"
							>
								{#if sheet.badge || sheet.isLatest}
									<span
										class="absolute top-2 right-2 flex items-center gap-1 rounded-full border border-white/25 bg-emerald-500/90 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-white uppercase shadow-xs backdrop-blur-xs"
									>
										<span class="inline-block size-1.5 animate-pulse rounded-full bg-white"></span>
										{sheet.badge || 'Latest'}
									</span>
								{/if}
								<div
									class="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/25 p-1.5 shadow-inner backdrop-blur-sm sm:h-9 sm:w-9"
								>
									<img
										src={sheet.icon}
										alt={sheet.title}
										class="h-full w-full object-contain brightness-110 drop-shadow filter"
									/>
								</div>
								<div class="min-w-0 flex-1 {sheet.badge || sheet.isLatest ? 'pr-12 sm:pr-14' : ''}">
									<p class="truncate text-xs font-semibold text-white drop-shadow-sm sm:text-sm">
										{sheet.title}
									</p>
									<span class="font-mono text-[10px] text-white/85">{sheet.cardCount} cards</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<!-- Category Sections -->
			{#each sheetsByCategory as group}
				<div>
					<div class="mb-2 flex items-center justify-between">
						<h2 class="text-foreground text-lg font-medium sm:text-xl">
							{group.category}
						</h2>
						<span class="text-muted-foreground font-mono text-xs">
							{group.list.length} sheets
						</span>
					</div>
					<div class="bg-border mb-6 h-1 w-24 overflow-hidden rounded-full">
						<div class="h-full w-full bg-linear-to-r from-indigo-500 to-purple-600"></div>
					</div>

					<div
						class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
					>
						{#each group.list as sheet}
							<a href="/{sheet.slug}" title="{sheet.title} Cheatsheet" class="group block">
								<div
									class="relative flex cursor-pointer items-center overflow-hidden rounded-xl border border-black/5 p-3 shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-xl sm:p-4 dark:border-white/10"
									style="background: {deepCardGradient(sheet.color)};"
								>
									{#if sheet.badge || sheet.isLatest}
										<span
											class="absolute top-2 right-2 flex items-center gap-1 rounded-full border border-white/25 bg-emerald-500/90 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-white uppercase shadow-xs backdrop-blur-xs"
										>
											<span class="inline-block size-1.5 animate-pulse rounded-full bg-white"
											></span>
											{sheet.badge || 'Latest'}
										</span>
									{/if}
									<div
										class="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/25 p-1.5 shadow-inner backdrop-blur-sm sm:h-9 sm:w-9"
									>
										<img
											src={sheet.icon}
											alt={sheet.title}
											class="h-full w-full object-contain brightness-110 drop-shadow filter"
										/>
									</div>
									<div
										class="min-w-0 flex-1 {sheet.badge || sheet.isLatest ? 'pr-12 sm:pr-14' : ''}"
									>
										<p class="truncate text-xs font-semibold text-white drop-shadow-sm sm:text-sm">
											{sheet.title}
										</p>
										<span class="font-mono text-[10px] text-white/85">{sheet.cardCount} cards</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
