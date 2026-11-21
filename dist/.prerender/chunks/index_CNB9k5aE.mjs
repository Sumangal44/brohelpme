import { a as HOMEPAGE_CATEGORIES, c as createComponent, l as __exportAll, n as getAllCategories, o as RECOMMENDED_SLUGS, r as getAllCheatsheets, t as $$Layout } from "./Layout_CaLD5uZW.mjs";
import { m as maybeRenderHead, o as renderComponent, p as renderTemplate } from "./server_aO84oak-.mjs";
import * as $ from "svelte/internal/server";
// src/components/CheatList.svelte
function CheatList($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { sheets = [], categories = ["All"] } = $$props;
		let activeCategory = "All";
		let searchQuery = "";
		let recommendedSheets = $.derived(() => {
			return RECOMMENDED_SLUGS.map((slug) => sheets.find((s) => s.slug === slug)).filter((s) => s !== void 0);
		});
		let sheetsByCategory = $.derived(() => {
			const groups = [];
			for (const cat of HOMEPAGE_CATEGORIES) {
				const list = sheets.filter((s) => s.category === cat);
				if (list.length > 0) groups.push({
					category: cat,
					list
				});
			}
			const used = new Set(HOMEPAGE_CATEGORIES);
			for (const s of sheets) if (!used.has(s.category)) {
				let g = groups.find((gr) => gr.category === s.category);
				if (!g) {
					g = {
						category: s.category,
						list: []
					};
					groups.push(g);
				}
				g.list.push(s);
			}
			return groups;
		});
		let filteredSheets = $.derived(() => {
			const q = searchQuery.trim().toLowerCase();
			return sheets.filter((sheet) => {
				if (!q) return true;
				const inTitle = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
				const inIntro = sheet.intro.toLowerCase().includes(q);
				const inTags = sheet.tags.some((t) => t.toLowerCase().includes(q));
				return inTitle || inIntro || inTags;
			});
		});
		$$renderer.push(`<div class="space-y-10"><div class="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-2 px-2"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-4"><img src="/logo.svg" alt="logo" class="w-3.5 h-3.5"/> <span>Community-driven developer quick reference repository</span></div> <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">Cheat Sheets for <span class="bg-linear-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text text-transparent">Developers</span></h1> <p class="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">Fast copy-paste reference cards, command line lookups, and shortcuts across 200+ technologies. Free, modern, and zero clutter.</p> <div class="mt-6 flex flex-wrap items-center justify-center gap-3"><button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium shadow-md shadow-emerald-500/20 transition-all cursor-pointer"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <span>Search 200+ Sheets</span> <kbd class="text-[10px] bg-emerald-700/60 px-1.5 py-0.5 rounded font-mono border border-emerald-400/30">⌘K</kbd></button> <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-medium border border-border shadow-xs transition-all cursor-pointer"><svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> <span>+ Add Cheatsheet</span></button></div></div> <div class="bg-card/95 border border-border rounded-2xl p-3.5 sm:p-5 backdrop-blur-md shadow-md shadow-slate-200/40 dark:shadow-lg/50 sticky top-16 z-30 transition-colors"><div class="flex flex-col md:flex-row md:items-center justify-between gap-3.5"><div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full"><!--[-->`);
		const each_array = $.ensure_array_like(categories);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let cat = each_array[$$index];
			$$renderer.push(`<button type="button"${$.attr_class(`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${activeCategory === cat ? "bg-emerald-600 text-white font-semibold shadow-xs shadow-emerald-600/30 ring-1 ring-emerald-500" : "bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 border border-slate-200/80 dark:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted dark:border-transparent"}`)}>${$.escape(cat)}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="relative w-full md:w-72 shrink-0"><svg class="w-4 h-4 text-slate-400 dark:text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text"${$.attr("value", searchQuery)} placeholder="Filter 200+ cheat sheets..." class="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white dark:bg-muted/40 dark:focus:bg-muted/60 border border-slate-300 dark:border-input rounded-xl text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs"/> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="mt-3 pt-3 border-t border-slate-200/90 dark:border-border flex items-center justify-between text-xs text-slate-500 dark:text-muted-foreground"><div>Showing <span class="text-slate-900 dark:text-foreground font-semibold">${$.escape(filteredSheets().length)}</span> of ${$.escape(sheets.length)} cheat sheets</div> <div class="flex items-center gap-3"><a href="/search" class="text-xs text-slate-600 dark:text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors"><span>Dedicated Search Page →</span></a> <span class="hidden sm:inline text-slate-300 dark:text-muted-foreground/40">•</span> <button type="button" class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"><span>+ Submit new sheet</span></button> <span class="hidden sm:inline text-slate-300 dark:text-muted-foreground/40">•</span> <span class="hidden sm:flex items-center gap-1">Press <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-muted text-slate-700 dark:text-foreground border border-slate-200 dark:border-border font-mono text-[10px]">⌘K</kbd> to search</span></div></div></div> `);
		{
			$$renderer.push(`<!--[-1--><div class="space-y-12"><div><div class="flex items-center justify-between mb-2"><h2 class="text-lg sm:text-xl font-medium text-foreground">⭐ Recommended Cheat Sheets</h2></div> <div class="h-1 bg-border rounded-full overflow-hidden mb-6 w-24"><div class="w-full h-full bg-linear-to-r from-emerald-500 to-teal-400"></div></div> <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"><!--[-->`);
			const each_array_2 = $.ensure_array_like(recommendedSheets());
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let sheet = each_array_2[$$index_2];
				$$renderer.push(`<a${$.attr("href", `/${$.stringify(sheet.slug)}`)}${$.attr("title", `${$.stringify(sheet.title)} Cheatsheet`)} class="group block"><div class="relative p-3 sm:p-4 flex items-center rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-xl overflow-hidden border border-black/5 dark:border-white/10"${$.attr_style(`background: linear-gradient(135deg, ${$.stringify(sheet.color)}e0 0%, ${$.stringify(sheet.color)}b0 100%);`)}><div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/25 backdrop-blur-sm p-1.5 flex items-center justify-center shrink-0 border border-white/15 mr-3 shadow-inner"><img${$.attr("src", sheet.icon)}${$.attr("alt", sheet.title)} class="w-full h-full object-contain filter drop-shadow brightness-110"/></div> <div class="min-w-0 flex-1"><p class="text-xs sm:text-sm font-semibold text-white truncate drop-shadow-sm">${$.escape(sheet.title)}</p> <span class="text-[10px] text-white/85 font-mono">${$.escape(sheet.cardCount)} cards</span></div></div></a>`);
			}
			$$renderer.push(`<!--]--></div></div> <!--[-->`);
			const each_array_3 = $.ensure_array_like(sheetsByCategory());
			for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
				let group = each_array_3[$$index_4];
				$$renderer.push(`<div><div class="flex items-center justify-between mb-2"><h2 class="text-lg sm:text-xl font-medium text-foreground">${$.escape(group.category)}</h2> <span class="text-xs text-muted-foreground font-mono">${$.escape(group.list.length)} sheets</span></div> <div class="h-1 bg-border rounded-full overflow-hidden mb-6 w-24"><div class="w-full h-full bg-linear-to-r from-indigo-500 to-purple-600"></div></div> <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"><!--[-->`);
				const each_array_4 = $.ensure_array_like(group.list);
				for (let $$index_3 = 0, $$length = each_array_4.length; $$index_3 < $$length; $$index_3++) {
					let sheet = each_array_4[$$index_3];
					$$renderer.push(`<a${$.attr("href", `/${$.stringify(sheet.slug)}`)}${$.attr("title", `${$.stringify(sheet.title)} Cheatsheet`)} class="group block"><div class="relative p-3 sm:p-4 flex items-center rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-xl overflow-hidden border border-black/5 dark:border-white/10"${$.attr_style(`background: linear-gradient(135deg, ${$.stringify(sheet.color)}e0 0%, ${$.stringify(sheet.color)}b0 100%);`)}><div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/25 backdrop-blur-sm p-1.5 flex items-center justify-center shrink-0 border border-white/15 mr-3 shadow-inner"><img${$.attr("src", sheet.icon)}${$.attr("alt", sheet.title)} class="w-full h-full object-contain filter drop-shadow brightness-110"/></div> <div class="min-w-0 flex-1"><p class="text-xs sm:text-sm font-semibold text-white truncate drop-shadow-sm">${$.escape(sheet.title)}</p> <span class="text-[10px] text-white/85 font-mono">${$.escape(sheet.cardCount)} cards</span></div></div></a>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const sheets = getAllCheatsheets();
	const categories = getAllCategories();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "CheatSheets.zip — Quick Reference Cheat Sheets for Developers",
		"description": "Instant copy-paste syntax, commands, and shortcuts for Git, Python, Docker, Linux, Bash, JavaScript, React, SQL, and 200+ developer tools."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">${renderComponent($$result, "CheatList", CheatList, {
		"client:load": true,
		"sheets": sheets,
		"categories": categories,
		"client:component-hydration": "load",
		"client:component-path": "/Users/sumu/needhelp/src/components/CheatList.svelte",
		"client:component-export": "default"
	})}</div>` })}`;
}, "/Users/sumu/needhelp/src/pages/index.astro", void 0);
var $$file = "/Users/sumu/needhelp/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
