<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	let isOpen = $state(false);
	let currentSlug = $state<string>('');
	let currentTitle = $state<string>('');
	let activeTab = $state<'add' | 'edit' | 'template'>('add');
	let copied = $state(false);

	const templateCode = `---
title: My Tool
date: 2024-01-01 00:00:00
background: bg-[#10b981]
tags:
  - cli
  - devops
categories:
  - Programming
intro: Quick reference summary for My Tool with common commands and syntax.
---

## Getting Started

### Installation
\`\`\`shell
$ npm install -g my-tool
\`\`\`

### Basic Usage
\`\`\`shell
$ my-tool run --verbose
\`\`\`

## Advanced Commands

### Common Flags
| Flag | Description |
| --- | --- |
| \`-h, --help\` | Display help reference |
| \`-v, --version\` | Show current version |
| \`-f, --force\` | Force execution without prompt |
`;

	function open(slug?: string, title?: string) {
		currentSlug = slug || '';
		currentTitle = title || '';
		activeTab = currentSlug ? 'edit' : 'add';
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}

	function copyTemplate() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(templateCode);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	onMount(() => {
		const handleOpen = (e: CustomEvent<{ slug?: string; title?: string }>) => {
			open(e.detail?.slug, e.detail?.title);
		};

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				close();
			}
		};

		window.addEventListener('open-contribute-modal' as any, handleOpen as any);
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('open-contribute-modal' as any, handleOpen as any);
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
	>
		<div
			class="relative w-full max-w-2xl bg-white dark:bg-[#0d121f] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
		>
			<!-- Header -->
			<div class="px-5 py-4 border-b border-border flex items-center justify-between gap-3 bg-muted/40">
				<div class="flex items-center gap-2.5">
					<div class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
						</svg>
					</div>
					<div>
						<h2 class="text-base sm:text-lg font-semibold text-foreground">
							Contribute to cheatsheets.zip
						</h2>
						<p class="text-xs text-muted-foreground">
							Community-maintained quick reference repository
						</p>
					</div>
				</div>

				<button
					type="button"
					onclick={close}
					class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
					aria-label="Close dialog"
				>
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Navigation Tabs -->
			<div class="flex items-center gap-1 px-5 pt-3 border-b border-border bg-card">
				{#if currentSlug}
					<button
						type="button"
						onclick={() => (activeTab = 'edit')}
						class="px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer {activeTab === 'edit'
							? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
							: 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Edit "{currentTitle || currentSlug}"
					</button>
				{/if}
				<button
					type="button"
					onclick={() => (activeTab = 'add')}
					class="px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer {activeTab === 'add'
						? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
						: 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					Add New Cheatsheet
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'template')}
					class="px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer {activeTab === 'template'
						? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
						: 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					Markdown Template
				</button>
			</div>

			<!-- Tab Contents -->
			<div class="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-foreground">
				{#if activeTab === 'edit' && currentSlug}
					<div class="space-y-4">
						<div class="p-4 rounded-xl bg-muted/50 border border-border">
							<h3 class="font-semibold text-foreground text-sm mb-1">
								Edit existing cheat sheet: <span class="text-emerald-600 dark:text-emerald-400">{currentTitle || currentSlug}</span>
							</h3>
							<p class="text-xs text-muted-foreground leading-relaxed">
								You can edit this file directly in GitHub or fork the repo to submit a Pull Request.
							</p>
						</div>

						<div class="flex flex-col sm:flex-row gap-2.5">
							<a
								href={`https://github.com/Fechin/reference/blob/main/source/_posts/${currentSlug}.md`}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all text-center"
							>
								<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
								</svg>
								<span>View Source on GitHub</span>
							</a>

							<a
								href={`https://github.com/Fechin/reference/edit/main/source/_posts/${currentSlug}.md`}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-xs shadow-xs transition-all text-center"
							>
								<svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
								<span>Direct Edit in Browser</span>
							</a>
						</div>
					</div>
				{:else if activeTab === 'add'}
					<div class="space-y-4">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
								<span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">1</span>
								<div>
									<h4 class="font-medium text-foreground text-xs mb-0.5">Fork or Branch</h4>
									<p class="text-[11px] text-muted-foreground leading-normal">
										Fork this repository or create a new branch: <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">feat/my-cheatsheet</code>.
									</p>
								</div>
							</div>

							<div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
								<span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">2</span>
								<div>
									<h4 class="font-medium text-foreground text-xs mb-0.5">Create Markdown File</h4>
									<p class="text-[11px] text-muted-foreground leading-normal">
										Add <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">src/content/cheatsheets/&lt;slug&gt;.md</code> with frontmatter.
									</p>
								</div>
							</div>

							<div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
								<span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">3</span>
								<div>
									<h4 class="font-medium text-foreground text-xs mb-0.5">Structure Cards</h4>
									<p class="text-[11px] text-muted-foreground leading-normal">
										Use <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">##</code> for sections, <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">###</code> for cards, tables, and code fences.
									</p>
								</div>
							</div>

							<div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3">
								<span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">4</span>
								<div>
									<h4 class="font-medium text-foreground text-xs mb-0.5">Build & Submit PR</h4>
									<p class="text-[11px] text-muted-foreground leading-normal">
										Verify with <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">npm run build</code> and open a Pull Request!
									</p>
								</div>
							</div>
						</div>

						<div class="flex flex-col sm:flex-row gap-2.5 pt-2">
							<a
								href="https://github.com/Fechin/reference/new/main/source/_posts"
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all text-center"
							>
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
								</svg>
								<span>Create File Online on GitHub</span>
							</a>

							<a
								href="/quickref"
								class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-xs shadow-xs transition-all text-center"
							>
								<span>Read Syntax Manual</span>
								<svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				{:else if activeTab === 'template'}
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-xs text-muted-foreground font-mono">src/content/cheatsheets/my-tool.md</span>
							<Button variant="outline" size="sm" onclick={copyTemplate} class="text-xs gap-1.5 h-7">
								{#if copied}
									<span class="text-emerald-500 font-medium">✓ Copied Template!</span>
								{:else}
									<svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
									<span>Copy Template</span>
								{/if}
							</Button>
						</div>

						<pre class="p-3 rounded-xl bg-muted/60 border border-border text-xs font-mono overflow-x-auto text-foreground max-h-60 leading-relaxed"><code>{templateCode}</code></pre>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="px-5 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
				<a
					href="https://github.com/Fechin/reference"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
				>
					<span>Fechin/reference on GitHub</span>
					<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
				<kbd class="px-1.5 py-0.5 rounded bg-muted text-foreground border border-border font-mono text-[10px]">ESC to close</kbd>
			</div>
		</div>
	</div>
{/if}