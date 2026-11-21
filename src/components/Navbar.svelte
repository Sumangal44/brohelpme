<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let isDark = $state(true);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	function triggerSearch() {
		document.dispatchEvent(new CustomEvent('open-command-palette'));
	}
</script>

<header class="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200">
	<div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
		<!-- Brand Logo -->
		<a href="/" class="flex items-center gap-2.5 sm:gap-3 group shrink-0">
			<div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
				<img src="/logo.svg" alt="cheatsheets.zip logo" class="w-full h-full object-contain" />
			</div>
			<div class="flex items-center gap-1.5">
				<span class="font-bold text-base sm:text-lg tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">
					cheatsheets<span class="text-emerald-500">.zip</span>
				</span>
				<Badge variant="outline" class="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0">
					v2.0
				</Badge>
			</div>
		</a>

		<!-- Search Trigger Input / Button (Fully responsive) -->
		<div class="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-4">
			<button
				type="button"
				onclick={triggerSearch}
				class="w-full flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all text-xs sm:text-sm group cursor-pointer shadow-xs"
			>
				<div class="flex items-center gap-2 sm:gap-2.5 truncate">
					<svg class="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span class="truncate">Search 200+ cheatsheets...</span>
				</div>
				<kbd class="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
					<span>⌘</span>K
				</kbd>
			</button>
		</div>

		<!-- Action Buttons: Fast Links + Theme Toggle + GitHub -->
		<div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
			<!-- Quick navigation for desktop -->
			<div class="hidden lg:flex items-center gap-1">
				<Button variant="ghost" size="sm" href="/git" class="text-xs">
					Git
				</Button>
				<Button variant="ghost" size="sm" href="/python" class="text-xs">
					Python
				</Button>
				<Button variant="ghost" size="sm" href="/docker" class="text-xs">
					Docker
				</Button>
				<Button variant="ghost" size="sm" href="/bash" class="text-xs">
					Bash
				</Button>
			</div>

			<div class="h-4 w-px bg-border hidden lg:block"></div>

			<!-- Theme Toggle Button (shadcn button) -->
			<Button
				variant="outline"
				size="icon-sm"
				onclick={toggleTheme}
				aria-label="Toggle Theme"
				class="rounded-xl border-border hover:bg-muted text-foreground cursor-pointer"
			>
				{#if isDark}
					<!-- Sun icon when dark -->
					<svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				{:else}
					<!-- Moon icon when light -->
					<svg class="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				{/if}
			</Button>

			<!-- GitHub Star Button (shadcn button) -->
			<Button
				variant="outline"
				size="sm"
				href="https://github.com/Fechin/reference"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-xl border-border hover:bg-muted text-xs gap-1.5"
			>
				<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
				</svg>
				<span class="hidden sm:inline">Star</span>
			</Button>
		</div>
	</div>
</header>
