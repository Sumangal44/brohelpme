<script lang="ts">
	interface Props {
		text: string;
		class?: string;
		label?: string;
	}

	let { text, class: className = '', label = '' }: Props = $props();

	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	function copyToClipboard(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();

		if (!navigator?.clipboard) {
			// Fallback
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
		} else {
			navigator.clipboard.writeText(text);
		}

		copied = true;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			copied = false;
		}, 1800);
	}
</script>

<button
	type="button"
	onclick={copyToClipboard}
	aria-label="Copy to clipboard"
	class="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer select-none {copied
		? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
		: 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50'} {className}"
	title="Copy command"
>
	{#if copied}
		<svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
		</svg>
		<span>Copied!</span>
	{:else}
		<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
		</svg>
		{#if label}
			<span>{label}</span>
		{/if}
	{/if}
</button>
