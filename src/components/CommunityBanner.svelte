<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommunityBannerItem } from '../lib/banners';

	interface Props {
		banners?: CommunityBannerItem[];
	}

	let { banners = [] }: Props = $props();

	let isVisible = $state(false);
	let currentBanner = $state<CommunityBannerItem | null>(null);

	onMount(() => {
		if (!banners.length) return;

		// Check if user dismissed the banner recently in this session
		const dismissed = sessionStorage.getItem('brohelpme_banner_dismissed');
		if (dismissed === 'true') {
			return;
		}

		// Pick a random banner from the active list
		const randomIndex = Math.floor(Math.random() * banners.length);
		currentBanner = banners[randomIndex];
		isVisible = true;
	});

	function dismiss() {
		isVisible = false;
		try {
			sessionStorage.setItem('brohelpme_banner_dismissed', 'true');
		} catch {
			// Ignore quota errors in private browsing
		}
	}
</script>

{#if isVisible && currentBanner}
	<aside
		aria-label="Community Open Source Spotlight"
		class="via-background relative z-40 border-b border-emerald-500/20 bg-linear-to-r from-emerald-500/10 to-teal-500/10 px-3 py-2 text-xs transition-all duration-300 sm:px-4"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
			<div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
				<span
					class="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-400"
				>
					<span class="size-1.5 animate-pulse rounded-full bg-emerald-500"></span>
					{currentBanner.badge}
				</span>

				<div class="text-foreground/90 flex min-w-0 flex-wrap items-center gap-1.5">
					<span class="text-foreground font-semibold">{currentBanner.title}</span>
					<span class="text-muted-foreground hidden sm:inline">—</span>
					<span class="text-muted-foreground truncate">{currentBanner.tagline}</span>
				</div>

				<a
					href={currentBanner.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 font-semibold text-emerald-600 transition-colors hover:text-emerald-500 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
				>
					<span>{currentBanner.ctaText}</span>
					<svg
						class="size-3"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</a>
			</div>

			<div class="flex shrink-0 items-center gap-2">
				<a
					href="https://github.com/Sumangal44/brohelpme/blob/main/COMMUNITY_BANNER.md"
					target="_blank"
					rel="noopener noreferrer"
					title="Anyone can feature their open source project for free via GitHub Pull Request"
					class="border-border/80 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground hidden items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-medium transition-colors md:inline-flex"
				>
					<span>Free Ad via PR</span>
					<span class="font-bold text-emerald-500">+</span>
				</a>

				<button
					type="button"
					onclick={dismiss}
					aria-label="Dismiss community banner"
					class="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-md p-1 transition-colors"
				>
					<svg
						class="size-3.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</aside>
{/if}
