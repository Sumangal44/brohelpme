<script lang="ts">
	function triggerSearch() {
		document.dispatchEvent(new CustomEvent('open-command-palette'));
	}
</script>

<header class="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#05070d]/90 backdrop-blur-md">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
		<!-- Brand Logo -->
		<a href="/" class="flex items-center gap-3 group">
			<div class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center p-1 shadow-md shadow-emerald-500/10 group-hover:border-emerald-500/50 transition-colors">
				<img src="/logo.svg" alt="cheatsheets.zip logo" class="w-6 h-6 object-contain" />
			</div>
			<div class="flex flex-col">
				<div class="flex items-center gap-1.5">
					<span class="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
						cheatsheets<span class="text-emerald-400">.zip</span>
					</span>
					<span class="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-zinc-800 text-zinc-400 rounded border border-zinc-700 font-semibold">
						v2.0
					</span>
				</div>
			</div>
		</a>

		<!-- Search Trigger Button -->
		<div class="flex-1 max-w-md mx-2 sm:mx-6">
			<button
				type="button"
				onclick={triggerSearch}
				class="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 transition-all text-sm group cursor-pointer shadow-inner"
			>
				<div class="flex items-center gap-2.5">
					<svg class="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span class="text-zinc-400 group-hover:text-zinc-300">Search 200+ cheatsheets...</span>
				</div>
				<kbd class="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
					<span class="text-xs">⌘</span>K
				</kbd>
			</button>
		</div>

		<!-- Nav Links & Social -->
		<div class="flex items-center gap-3">
			<a
				href="/git"
				class="hidden md:inline-flex text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors"
			>
				Git
			</a>
			<a
				href="/python"
				class="hidden md:inline-flex text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors"
			>
				Python
			</a>
			<a
				href="/docker"
				class="hidden md:inline-flex text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors"
			>
				Docker
			</a>
			<a
				href="/bash"
				class="hidden md:inline-flex text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 rounded transition-colors"
			>
				Bash
			</a>

			<div class="h-4 w-px bg-zinc-800 hidden md:block"></div>

			<!-- GitHub Link -->
			<a
				href="https://github.com/Fechin/reference"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
				aria-label="GitHub Repository"
			>
				<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
				</svg>
				<span class="hidden sm:inline">Star</span>
			</a>
		</div>
	</div>
</header>
