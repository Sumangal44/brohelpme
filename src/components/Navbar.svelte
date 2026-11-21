<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let isDark = $state(true);
	let menuOpen = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');

		const onThemeChange = (e: Event) => {
			const detail = (e as CustomEvent).detail;
			if (typeof detail?.isDark === 'boolean') {
				isDark = detail.isDark;
			} else {
				isDark = document.documentElement.classList.contains('dark');
			}
		};

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') menuOpen = false;
		};

		// Close the mobile panel whenever the palette/modal opens over it.
		const onOpenPalette = () => (menuOpen = false);

		window.addEventListener('theme-changed', onThemeChange);
		window.addEventListener('keydown', onKeydown);
		document.addEventListener('open-command-palette', onOpenPalette);
		return () => {
			window.removeEventListener('theme-changed', onThemeChange);
			window.removeEventListener('keydown', onKeydown);
			document.removeEventListener('open-command-palette', onOpenPalette);
		};
	});

	function toggleTheme() {
		if (typeof (window as any).__toggleTheme === 'function') {
			(window as any).__toggleTheme();
		} else {
			isDark = !isDark;
			document.documentElement.classList.toggle('dark', isDark);
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			window.dispatchEvent(new CustomEvent('theme-changed', { detail: { isDark } }));
		}
	}

	function triggerSearch() {
		menuOpen = false;
		document.dispatchEvent(new CustomEvent('open-command-palette'));
	}

	function triggerContribute() {
		menuOpen = false;
		window.dispatchEvent(new CustomEvent('open-contribute-modal'));
	}
</script>

{#snippet searchButton(className = '')}
	<button
		type="button"
		onclick={triggerSearch}
		class="group flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground shadow-xs transition-all hover:bg-muted hover:text-foreground {className}"
	>
		<svg
			class="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
		</svg>
		<span class="truncate">Search 200+ cheatsheets...</span>
		<kbd
			class="ml-auto hidden shrink-0 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex"
		>
			<span>⌘</span>K
		</kbd>
	</button>
{/snippet}

{#snippet themeToggle()}
	<Button
		variant="outline"
		size="icon"
		onclick={toggleTheme}
		aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
		title={isDark ? 'Light mode' : 'Dark mode'}
		class="size-9 rounded-xl cursor-pointer"
	>
		{#if isDark}
			<svg class="size-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		{:else}
			<svg class="size-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		{/if}
	</Button>
{/snippet}

{#snippet githubButton(className = '')}
	<Button
		variant="outline"
		size="sm"
		href="https://github.com/Sumangal44/brohelpme"
		target="_blank"
		rel="noopener noreferrer"
		class="h-9 gap-1.5 rounded-xl px-3 cursor-pointer {className}"
		aria-label="Star on GitHub"
		title="Star on GitHub"
	>
		<svg class="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			/>
		</svg>
		<span class="whitespace-nowrap">Star</span>
	</Button>
{/snippet}

{#snippet contributeButton(className = '')}
	<Button
		variant="outline"
		size="sm"
		onclick={triggerContribute}
		class="h-9 rounded-xl border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 text-xs font-medium gap-1.5 cursor-pointer {className}"
	>
		<svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
		</svg>
		<span class="hidden sm:inline">Contribute</span>
		<span class="sm:hidden">Add</span>
	</Button>
{/snippet}

<header
	class="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl supports-backdrop-filter:bg-background/70 transition-colors duration-200"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
		<!-- Brand -->
		<a href="/" class="group flex shrink-0 items-center gap-2.5">
			<span
				class="flex size-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-1.5 shadow-xs transition-transform duration-200 group-hover:scale-105"
			>
				<img src="/logo.svg" alt="" class="size-full object-contain" />
			</span>
			<span class="flex items-center gap-1.5">
				<span class="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-600 sm:text-lg dark:group-hover:text-emerald-400">
					BroHelp<span class="text-emerald-500">Me</span>
				</span>
				<!-- <Badge
					variant="outline"
					class="hidden rounded-md px-1.5 py-0 font-mono text-[10px] uppercase tracking-wide sm:inline-flex"
				>
					v2.0
				</Badge> -->
			</span>
		</a>

		<!-- Search: pill from sm up, icon below sm -->
		{@render searchButton('mx-1 hidden min-w-0 flex-1 sm:flex sm:max-w-xs md:max-w-md lg:max-w-xl')}
		<button
			type="button"
			onclick={triggerSearch}
			aria-label="Search cheatsheets"
			class="ml-auto flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:hidden"
		>
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</button>

		<!-- Actions -->
		<div class="hidden items-center gap-2 sm:flex">
			<div class="h-5 w-px bg-border"></div>
			{@render themeToggle()}
			{@render githubButton()}
			{@render contributeButton()}
		</div>

		<!-- Mobile / tablet menu trigger -->
		<button
			type="button"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			class="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground transition-all hover:bg-muted sm:hidden"
		>
			{#if menuOpen}
				<svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Collapsible panel: search + actions on small screens -->
	{#if menuOpen}
		<div class="border-t border-border/70 bg-background/95 backdrop-blur-xl sm:hidden">
			<div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
				{@render searchButton('w-full')}

				<div class="flex items-center gap-2">
					{@render contributeButton('flex-1 justify-center h-9')}
					{@render githubButton('flex-1 justify-center h-9')}
					{@render themeToggle()}
				</div>
			</div>
		</div>
	{/if}
</header>
