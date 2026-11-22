<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { CommunityBannerItem } from '../lib/banners';

	interface Props {
		banners?: CommunityBannerItem[];
		autoChangeInterval?: number; // Milliseconds between rotations (default: 6000ms)
	}

	let { banners = [], autoChangeInterval = 6000 }: Props = $props();

	let isVisible = $state(false);
	let currentIndex = $state(0);
	let isPaused = $state(false);

	let currentBanner = $derived(banners[currentIndex] || null);

	onMount(() => {
		if (!banners.length) return;

		// Check if user dismissed the banner in this session
		const dismissed = sessionStorage.getItem('brohelpme_banner_dismissed');
		if (dismissed === 'true') {
			return;
		}

		// Pick random initial banner
		currentIndex = Math.floor(Math.random() * banners.length);
		isVisible = true;

		// Auto-change timer
		if (banners.length > 1) {
			const interval = setInterval(() => {
				if (!isPaused) {
					currentIndex = (currentIndex + 1) % banners.length;
				}
			}, autoChangeInterval);

			return () => clearInterval(interval);
		}
	});

	function nextBanner() {
		if (banners.length <= 1) return;
		currentIndex = (currentIndex + 1) % banners.length;
	}

	function prevBanner() {
		if (banners.length <= 1) return;
		currentIndex = (currentIndex - 1 + banners.length) % banners.length;
	}

	function dismiss() {
		isVisible = false;
		try {
			sessionStorage.setItem('brohelpme_banner_dismissed', 'true');
		} catch {
			// Ignore storage quota errors in private browsing
		}
	}
</script>

{#if isVisible && currentBanner}
	<aside
		aria-label="Community Open Source Spotlight"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}
		class="via-background relative z-40 border-b border-emerald-500/20 bg-linear-to-r from-emerald-500/10 to-teal-500/10 px-3 py-2 text-xs transition-colors duration-200 sm:px-4"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
			{#key currentIndex}
				<div
					in:fade={{ duration: 220 }}
					class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1"
				>
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
			{/key}

			<div class="flex shrink-0 items-center gap-1.5">
				{#if banners.length > 1}
					<!-- Navigation Arrows & Counter -->
					<div
						class="bg-background/60 border-border/80 flex items-center rounded-lg border px-1 py-0.5"
					>
						<button
							type="button"
							onclick={prevBanner}
							aria-label="Previous community project"
							class="text-muted-foreground hover:text-foreground cursor-pointer rounded p-0.5 transition-colors"
						>
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
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>

						<span
							class="text-muted-foreground px-1 font-mono text-[10px] select-none"
							title="Auto-changing every 6 seconds (pauses on hover)"
						>
							{currentIndex + 1}/{banners.length}
						</span>

						<button
							type="button"
							onclick={nextBanner}
							aria-label="Next community project"
							class="text-muted-foreground hover:text-foreground cursor-pointer rounded p-0.5 transition-colors"
						>
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
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					</div>
				{/if}

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
