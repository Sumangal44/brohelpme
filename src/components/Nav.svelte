<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';
	import { navItems, site } from '../data/site';

	interface Props {
		currentPath: string;
	}
	let { currentPath }: Props = $props();

	let scrolled = $state(false);
	let open = $state(false);

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// close the menu whenever the route changes
	$effect(() => {
		void currentPath;
		open = false;
	});

	// lock scroll + escape key while the overlay is open
	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	});

	const isActive = (href: string) =>
		href === '/' ? currentPath === '/' : currentPath.startsWith(href);

	const linkClass = (href: string) =>
		`link-underline text-[0.9rem] font-semibold transition-colors duration-300 hover:text-navy ${
			isActive(href) ? 'text-navy' : 'text-ink-soft'
		}`;
</script>

<header class="fixed inset-x-0 top-0 z-50 transition-all duration-500 {scrolled ? 'nav-scrolled' : ''}">
	<div class="editorial-container">
		<div class="flex items-center justify-between gap-6 transition-all duration-500 {scrolled ? 'h-[4.25rem]' : 'h-24'}">
			<!-- Brand -->
			<a href="/" class="group flex items-center gap-3" aria-label="Kathamala Doctors Chamber — Home">
				<span class="transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
					<Logo size={scrolled ? 38 : 44} />
				</span>
				<span class="flex flex-col leading-none">
					<span class="font-display text-[0.95rem] font-extrabold tracking-[0.16em] text-navy transition-all duration-500 sm:text-base">
						KATHAMALA
					</span>
					<span class="mt-1 text-[0.58rem] font-semibold tracking-[0.3em] text-ink-soft sm:text-[0.62rem]">
						DOCTORS CHAMBER
					</span>
				</span>
			</a>

			<!-- Desktop nav -->
			<nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
				{#each navItems as item (item.href)}
					<a href={item.href} class={linkClass(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-3">
				<a href={site.phone.tel} class="hidden text-sm font-bold text-navy transition-colors hover:text-medical xl:block">
					{site.phone.display}
				</a>
				<a href="/appointment" class="btn btn-primary px-6 py-3.5 hidden text-sm sm:inline-flex">
					Book Appointment
				</a>

				<!-- Hamburger -->
				<button
					type="button"
					class="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white/70 backdrop-blur transition-all duration-300 hover:border-navy/40 lg:hidden {open ? 'hidden' : ''}"
					aria-label="Open menu"
					onclick={() => (open = true)}
				>
					<span class="flex h-4 w-5 flex-col justify-between">
						<span class="h-0.5 w-full rounded-full bg-navy"></span>
						<span class="h-0.5 w-full rounded-full bg-navy"></span>
						<span class="h-0.5 w-full rounded-full bg-navy"></span>
					</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile overlay -->
	{#if open}
		<div class="fixed inset-0 z-40 lg:hidden">
			<div class="overlay-in absolute inset-0 bg-navy/95 backdrop-blur-xl" role="presentation" onclick={() => (open = false)}
			></div>

			<div class="relative flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 sm:px-10">
				<button
					type="button"
					class="absolute right-6 top-7 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:rotate-90 hover:border-white/60 sm:right-10"
					aria-label="Close menu"
					onclick={() => (open = false)}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				</button>

				<nav class="flex flex-col gap-1" aria-label="Mobile">
					{#each navItems as item, i (item.href)}
						<a
							href={item.href}
							class="menu-link group flex items-baseline gap-4 border-b border-white/10 py-4 text-3xl font-bold tracking-tight text-white transition-colors duration-300 hover:text-teal-light sm:text-4xl"
							style="animation-delay: {80 + i * 60}ms"
							aria-current={isActive(item.href) ? 'page' : undefined}
						>
							<span class="text-xs font-semibold tracking-widest text-teal-light/70">0{i + 1}</span>
							<span class="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
						</a>
					{/each}
				</nav>

				<div class="mt-10 flex flex-col gap-3">
					<p class="font-bengali text-sm text-white/60">{site.nameBn}</p>
					<a href="/appointment" class="btn btn-teal w-full" onclick={() => (open = false)}>
						Book Appointment
					</a>
					<div class="grid grid-cols-2 gap-3">
						<a href={site.phone.tel} class="btn btn-ghost w-full border-white/25 text-white hover:bg-white/10 hover:text-white">
							Call Now
						</a>
						<a
							href={site.phone.whatsapp}
							target="_blank"
							rel="noopener"
							class="btn btn-ghost w-full border-white/25 text-white hover:bg-white/10 hover:text-white"
						>
							WhatsApp
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	.nav-scrolled {
		background: color-mix(in srgb, #f8fafc 82%, transparent);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid color-mix(in srgb, #dfe7ee 70%, transparent);
		box-shadow: 0 8px 30px -18px rgb(16 42 67 / 0.35);
	}

	.overlay-in {
		animation: overlay-in 0.4s ease both;
	}
	@keyframes overlay-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.menu-link {
		opacity: 0;
		animation: menu-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}
	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.menu-link {
			opacity: 1;
			animation: none;
		}
	}
</style>
