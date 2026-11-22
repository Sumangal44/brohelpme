import { c as createComponent, i as getCheatsheet, l as __exportAll, r as getAllCheatsheets, s as createAstro, t as $$Layout } from "./Layout_Czb5e5Ss.mjs";
import { b as unescapeHTML, m as maybeRenderHead, o as renderComponent, p as renderTemplate, s as Fragment, v as addAttribute } from "./server_aO84oak-.mjs";
// src/pages/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://cheatsheets.zip");
async function getStaticPaths() {
	return getAllCheatsheets().map((sheet) => ({ params: { slug: sheet.slug } }));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const sheet = await getCheatsheet(slug);
	if (!sheet) return Astro.redirect("/");
	const relatedSheets = getAllCheatsheets().filter((s) => s.slug !== sheet.slug && (s.category === sheet.category || s.tags.some((t) => sheet.tags.includes(t)))).slice(0, 4);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${sheet.title} Cheat Sheet & Quick Reference`,
		"description": sheet.intro
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10"><!-- Breadcrumbs --><nav class="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap"><a href="/" class="hover:text-foreground transition-colors">Home</a><span>›</span><span class="text-muted-foreground">${sheet.category}</span><span>›</span><span class="text-emerald-500 font-medium">${sheet.title}</span></nav><!-- Sheet Hero Header (matching Fechin/reference post.ejs) --><div class="flex flex-col w-full mx-auto items-center text-center my-6 sm:my-10 px-2"><!-- Tech Icon Badge --><div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-3 flex items-center justify-center mb-5 shadow-2xl border border-white/10"${addAttribute(`background: linear-gradient(135deg, ${sheet.color}e0 0%, ${sheet.color}90 100%);`, "style")}><img${addAttribute(sheet.icon, "src")}${addAttribute(sheet.title, "alt")} class="w-full h-full object-contain filter drop-shadow brightness-110"></div><h1 class="text-3xl sm:text-5xl font-light mb-3 text-foreground"><span class="font-normal text-foreground">${sheet.title}</span><span class="text-muted-foreground font-extralight hidden sm:inline">cheatsheet</span></h1><div class="lg:w-3/5 mx-auto intro leading-relaxed text-muted-foreground text-sm sm:text-base">${sheet.intro}</div><!-- Quick Actions Bar --><div class="flex flex-wrap items-center justify-center gap-2.5 mt-6"><button type="button" onclick="window.print()" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-medium border border-border transition-colors cursor-pointer shadow-xs"><svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg><span>Print</span></button><button type="button" class="open-contribute-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card hover:bg-muted text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-border transition-colors cursor-pointer shadow-xs"${addAttribute(sheet.slug, "data-slug")}${addAttribute(sheet.title, "data-title")}><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg><span>Contribute / Add</span></button><a${addAttribute(`https://github.com/Sumangal44/brohelpme/blob/main/src/content/cheatsheets/${sheet.slug}.md`, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-medium border border-border transition-colors shadow-xs"><svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg><span>Edit Sheet</span></a><a href="https://github.com/Sumangal44/brohelpme" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-medium border border-border transition-colors shadow-xs"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg><span>GitHub Star</span></a></div><!-- Quick jump section pills -->${sheet.sections.length > 1 && renderTemplate`<div class="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto max-w-full pb-2 scrollbar-none"><span class="text-xs font-medium text-muted-foreground whitespace-nowrap mr-1 hidden sm:inline">Jump to:</span>${sheet.sections.map((section) => renderTemplate`<a${addAttribute(`#${section.id}`, "href")} class="px-3 py-1 rounded-full bg-card hover:bg-muted text-foreground/80 hover:text-foreground text-xs whitespace-nowrap border border-border transition-colors shadow-xs">${section.title}</a>`)}</div>`}</div><!-- Sections List (matching .mdLayout structure) --><div class="space-y-12 mdLayout">${sheet.sections.map((section) => renderTemplate`<div${addAttribute(section.id, "id")} class="h2-wrap scroll-mt-24"><!-- Section Header --><div class="flex items-center justify-between mb-5 pb-2 border-b border-border"><h2 class="text-xl sm:text-2xl font-light text-foreground tracking-tight flex items-center gap-3"><span class="text-emerald-500 font-semibold font-mono text-base">#</span><span>${section.title}</span><span class="text-xs font-mono text-muted-foreground font-normal">(${section.cards.length} cards)</span></h2><a${addAttribute(`#${section.id}`, "href")} class="text-muted-foreground hover:text-emerald-500 text-sm font-mono transition-colors">#</a></div><!-- Cards Grid (Full Responsive) --><div${addAttribute(`h3-wrap-list grid gap-5 md:gap-6 items-start ${section.cols === 1 ? "grid-cols-1" : section.cols === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`, "class")}>${section.cards.map((card) => {
		const isPrimary = card.theme === "primary";
		const isSecondary = card.theme === "secondary";
		const isInfo = card.theme === "info";
		const isSuccess = card.theme === "success";
		const isWarning = card.theme === "warning";
		const isDanger = card.theme === "danger";
		return renderTemplate`<article${addAttribute(card.id, "id")}${addAttribute(`h3-wrap bg-card border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col ${isPrimary ? "border-rose-500/30 dark:border-rose-500/40" : isSecondary ? "border-amber-500/30 dark:border-amber-500/40" : isInfo ? "border-sky-500/30 dark:border-sky-500/40" : isSuccess ? "border-emerald-500/30 dark:border-emerald-500/40" : isWarning ? "border-orange-500/30 dark:border-orange-500/40" : isDanger ? "border-red-500/30 dark:border-red-500/40" : "border-border"} ${card.colSpan === 3 ? "md:col-span-2 lg:col-span-3" : card.colSpan === 2 ? "md:col-span-2 lg:col-span-2" : ""} ${card.rowSpan === 2 ? "md:row-span-2" : card.rowSpan === 3 ? "md:row-span-3" : ""}`, "class")}><!-- Card Header --><div${addAttribute(`px-4 py-3 border-b flex items-center justify-between gap-3 ${isPrimary ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400" : isSecondary ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" : isInfo ? "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400" : isSuccess ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" : isWarning ? "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400" : isDanger ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" : "bg-muted/40 border-border text-foreground"}`, "class")}><h3 class="text-sm font-semibold tracking-wide truncate">${card.title}</h3><a${addAttribute(`#${card.id}`, "href")} class="text-muted-foreground hover:text-foreground text-xs font-mono">#</a></div><!-- Card Body Content --><div class="p-4 sheet-card-body overflow-x-auto flex-1">${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(card.html)}` })}</div></article>`;
	})}</div></div>`)}</div><!-- Contribution Callout Card --><div class="mt-14 p-5 sm:p-7 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-5"><div class="flex items-start sm:items-center gap-4"><div class="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><div><h3 class="text-sm sm:text-base font-semibold text-foreground">Contribute or add cards to ${sheet.title}</h3><p class="text-xs text-muted-foreground mt-0.5 max-w-xl leading-relaxed">Spot a typo or want to submit extra reference cards? cheatsheets.zip is powered by developer contributions on GitHub.</p></div></div><div class="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end"><button type="button" class="open-contribute-btn flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-medium transition-colors cursor-pointer"${addAttribute(sheet.slug, "data-slug")}${addAttribute(sheet.title, "data-title")}><svg class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg><span>Add Cheatsheet / Cards</span></button><a${addAttribute(`https://github.com/Sumangal44/brohelpme/blob/main/src/content/cheatsheets/${sheet.slug}.md`, "href")} target="_blank" rel="noopener noreferrer" class="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors shadow-sm"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg><span>Edit on GitHub</span></a></div></div><!-- Related Cheatsheets -->${relatedSheets.length > 0 && renderTemplate`<div class="mt-16 pt-8 border-t border-border"><h3 class="text-lg font-medium text-foreground mb-5">Related Cheat Sheets</h3><div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">${relatedSheets.map((rel) => renderTemplate`<a${addAttribute(`/${rel.slug}`, "href")} title="{rel.title} Cheatsheet" class="group block"><div class="p-3 sm:p-4 flex items-center rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-xl overflow-hidden border border-black/5 dark:border-white/10"${addAttribute(`background: linear-gradient(135deg, ${rel.color}e0 0%, ${rel.color}95 100%);`, "style")}><div class="w-8 h-8 rounded-lg bg-black/25 backdrop-blur-sm p-1.5 flex items-center justify-center shrink-0 border border-white/15 mr-3 shadow-inner"><img${addAttribute(rel.icon, "src")}${addAttribute(rel.title, "alt")} class="w-full h-full object-contain filter drop-shadow brightness-110"></div><div class="min-w-0 flex-1"><p class="text-xs sm:text-sm font-semibold text-white truncate drop-shadow-sm">${rel.title}</p><span class="text-[10px] text-white/85 font-mono">${rel.cardCount} cards</span></div></div></a>`)}</div></div>`}</div><script>
		document.addEventListener('click', (e) => {
			const contributeBtn = e.target.closest('.open-contribute-btn');
			if (contributeBtn) {
				e.preventDefault();
				const slug = contributeBtn.getAttribute('data-slug') || '';
				const title = contributeBtn.getAttribute('data-title') || '';
				window.dispatchEvent(new CustomEvent('open-contribute-modal', { detail: { slug, title } }));
				return;
			}

			const btn = e.target.closest('.copy-code-btn');
			if (!btn) return;

			e.preventDefault();
			e.stopPropagation();

			const code = btn.getAttribute('data-code') || '';
			if (!code) return;

			if (navigator.clipboard) {
				navigator.clipboard.writeText(code);
			} else {
				const ta = document.createElement('textarea');
				ta.value = code;
				document.body.appendChild(ta);
				ta.select();
				document.execCommand('copy');
				document.body.removeChild(ta);
			}

			const originalText = btn.textContent;
			btn.textContent = 'Copied!';
			btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/30');

			setTimeout(() => {
				btn.textContent = originalText;
				btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/30');
			}, 1800);
		});
	<\/script>` })}`;
}, "/Users/sumu/needhelp/src/pages/[slug].astro", void 0);
var $$file = "/Users/sumu/needhelp/src/pages/[slug].astro";
var $$url = "/[slug]";
// \0virtual:astro:page:src/pages/[slug]@_@astro
var page = () => _slug__exports;
export { page };
