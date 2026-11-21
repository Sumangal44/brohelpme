<script lang="ts">
	interface Props {
		size?: number;
		light?: boolean;
		class?: string;
	}
	let { size = 44, light = false, class: className = '' }: Props = $props();

	// unique gradient ids per instance to stay valid HTML
	const gid = `kdc-grad-${Math.random().toString(36).slice(2, 8)}`;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 48 48"
	fill="none"
	role="img"
	aria-label="Kathamala Doctors Chamber logo"
	class={className}
>
	<defs>
		<linearGradient id={gid} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
			<stop stop-color="#1769AA" />
			<stop offset="1" stop-color="#102A43" />
		</linearGradient>
	</defs>
	<rect x="0" y="0" width="48" height="48" rx="14" fill={`url(#${gid})`} />
	<!-- letter K -->
	<path
		d="M15.5 11.5 V36.5"
		stroke="#FFFFFF"
		stroke-width="3.4"
		stroke-linecap="round"
	/>
	<path
		d="M31.5 11.5 L19.5 24 L31.5 36.5"
		stroke="#FFFFFF"
		stroke-width="3.4"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
	<!-- teal pulse -->
	<path
		d="M11 42.5 H17 l2.2 -4.2 2.6 7.4 2.4 -5.4 1.6 2.2 H37"
		stroke="#57C7BB"
		stroke-width="2.4"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
	{#if light}
		<rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13.25" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
	{/if}
</svg>
