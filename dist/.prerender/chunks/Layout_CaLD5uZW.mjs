import { J as AstroError, h as renderHead, j as InvalidComponentArgs, m as maybeRenderHead, o as renderComponent, p as renderTemplate, q as UnavailableAstroGlobal, u as renderSlot, v as addAttribute } from "./server_aO84oak-.mjs";
import { onMount } from "svelte";
import * as $ from "svelte/internal/server";
import { tv } from "tailwind-variants";
import { cn } from "cn";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import Markdoc from "@markdoc/markdoc";
import { createHighlighter } from "shiki";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// node_modules/@astrojs/runtime/dist/internal/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
// node_modules/@astrojs/runtime/dist/internal/server/astro-global.js
var ASTRO_GENERATOR = `Astro v7.4.13`;
function createError(name) {
	return new AstroError({
		...UnavailableAstroGlobal,
		message: UnavailableAstroGlobal.message(name)
	});
}
function createAstro(site) {
	return {
		get site() {
			console.warn(`Astro.site inside getStaticPaths is deprecated and will be removed in a future major version of Astro. Use import.meta.env.SITE instead`);
			return site ? new URL(site) : void 0;
		},
		get generator() {
			console.warn(`Astro.generator inside getStaticPaths is deprecated and will be removed in a future major version of Astro.`);
			return ASTRO_GENERATOR;
		},
		get callAction() {
			throw createError("callAction");
		},
		get clientAddress() {
			throw createError("clientAddress");
		},
		get cookies() {
			throw createError("cookies");
		},
		get csp() {
			throw createError("csp");
		},
		get currentLocale() {
			throw createError("currentLocale");
		},
		get getActionResult() {
			throw createError("getActionResult");
		},
		get isPrerendered() {
			throw createError("isPrerendered");
		},
		get locals() {
			throw createError("locals");
		},
		get originPathname() {
			throw createError("originPathname");
		},
		get params() {
			throw createError("params");
		},
		get preferredLocale() {
			throw createError("preferredLocale");
		},
		get preferredLocaleList() {
			throw createError("preferredLocaleList");
		},
		get props() {
			throw createError("props");
		},
		get redirect() {
			throw createError("redirect");
		},
		get request() {
			throw createError("request");
		},
		get response() {
			throw createError("response");
		},
		get rewrite() {
			throw createError("rewrite");
		},
		get routePattern() {
			throw createError("routePattern");
		},
		get self() {
			throw createError("self");
		},
		get slots() {
			throw createError("slots");
		},
		get url() {
			throw createError("url");
		},
		get session() {
			throw createError("session");
		},
		get cache() {
			throw createError("cache");
		},
		get logger() {
			throw createError("logger");
		}
	};
}
// src/lib/components/ui/button/button.svelte
var buttonVariants = tv({
	base: "focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-2xl border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background dark:bg-transparent hover:bg-muted hover:text-foreground dark:hover:bg-input/30 aria-expanded:bg-muted aria-expanded:text-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
			destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
			xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			lg: "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
			icon: "size-8",
			"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { class: className, variant = "default", size = "default", ref = null, href = void 0, type = "button", disabled, children, $$slots, $$events, ...restProps } = $$props;
		if (href) {
			$$renderer.push(`<!--[0--><a${$.attributes({
				"data-slot": "button",
				class: $.clsx(cn(buttonVariants({
					variant,
					size
				}), className)),
				href: disabled ? void 0 : href,
				"aria-disabled": disabled,
				role: disabled ? "link" : void 0,
				tabindex: disabled ? -1 : void 0,
				...restProps
			})}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></a>`);
		} else {
			$$renderer.push(`<!--[-1--><button${$.attributes({
				"data-slot": "button",
				class: $.clsx(cn(buttonVariants({
					variant,
					size
				}), className)),
				type,
				disabled,
				...restProps
			})}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		$.bind_props($$props, { ref });
	});
}
tv({
	base: "h-5 gap-1 rounded-2xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
// src/components/Navbar.svelte
function githubButton($$renderer, className = "") {
	Button($$renderer, {
		variant: "outline",
		size: "sm",
		href: "https://github.com/Sumangal44/brohelpme",
		target: "_blank",
		rel: "noopener noreferrer",
		class: `h-9 gap-1.5 rounded-xl px-3 cursor-pointer ${$.stringify(className)}`,
		"aria-label": "Star on GitHub",
		title: "Star on GitHub",
		children: ($$renderer) => {
			$$renderer.push(`<svg class="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg> <span class="whitespace-nowrap">Star</span>`);
		},
		$$slots: { default: true }
	});
}
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isDark = true;
		let menuOpen = false;
		onMount(() => {
			isDark = document.documentElement.classList.contains("dark");
			const onThemeChange = (e) => {
				const detail = e.detail;
				if (typeof detail?.isDark === "boolean") isDark = detail.isDark;
				else isDark = document.documentElement.classList.contains("dark");
			};
			const onKeydown = (e) => {
				if (e.key === "Escape") menuOpen = false;
			};
			const onOpenPalette = () => menuOpen = false;
			window.addEventListener("theme-changed", onThemeChange);
			window.addEventListener("keydown", onKeydown);
			document.addEventListener("open-command-palette", onOpenPalette);
			return () => {
				window.removeEventListener("theme-changed", onThemeChange);
				window.removeEventListener("keydown", onKeydown);
				document.removeEventListener("open-command-palette", onOpenPalette);
			};
		});
		function toggleTheme() {
			if (typeof window.__toggleTheme === "function") window.__toggleTheme();
			else {
				isDark = !isDark;
				document.documentElement.classList.toggle("dark", isDark);
				localStorage.setItem("theme", isDark ? "dark" : "light");
				window.dispatchEvent(new CustomEvent("theme-changed", { detail: { isDark } }));
			}
		}
		function triggerContribute() {
			menuOpen = false;
			window.dispatchEvent(new CustomEvent("open-contribute-modal"));
		}
		function searchButton($$renderer, className = "") {
			$$renderer.push(`<button type="button"${$.attr_class(`group flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground shadow-xs transition-all hover:bg-muted hover:text-foreground ${$.stringify(className)}`)}><svg class="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <span class="truncate">Search 200+ cheatsheets...</span> <kbd class="ml-auto hidden shrink-0 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex"><span>⌘</span>K</kbd></button>`);
		}
		function themeToggle($$renderer) {
			Button($$renderer, {
				variant: "outline",
				size: "icon",
				onclick: toggleTheme,
				"aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
				title: isDark ? "Light mode" : "Dark mode",
				class: "size-9 rounded-xl cursor-pointer",
				children: ($$renderer) => {
					if (isDark) $$renderer.push(`<!--[0--><svg class="size-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
					else $$renderer.push(`<!--[-1--><svg class="size-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
					$$renderer.push(`<!--]-->`);
				},
				$$slots: { default: true }
			});
		}
		function contributeButton($$renderer, className = "") {
			Button($$renderer, {
				variant: "outline",
				size: "sm",
				onclick: triggerContribute,
				class: `h-9 rounded-xl border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 text-xs font-medium gap-1.5 cursor-pointer ${$.stringify(className)}`,
				children: ($$renderer) => {
					$$renderer.push(`<svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> <span class="hidden sm:inline">Contribute</span> <span class="sm:hidden">Add</span>`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<header class="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl supports-backdrop-filter:bg-background/70 transition-colors duration-200"><div class="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8"><a href="/" class="group flex shrink-0 items-center gap-2.5"><span class="flex size-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-1.5 shadow-xs transition-transform duration-200 group-hover:scale-105"><img src="/logo.svg" alt="" class="size-full object-contain"/></span> <span class="flex items-center gap-1.5"><span class="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-600 sm:text-lg dark:group-hover:text-emerald-400">BroHelp<span class="text-emerald-500">Me</span></span></span></a> `);
		searchButton($$renderer, "mx-1 hidden min-w-0 flex-1 sm:flex sm:max-w-xs md:max-w-md lg:max-w-xl");
		$$renderer.push(`<!----> <button type="button" aria-label="Search cheatsheets" class="ml-auto flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:hidden"><svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button> <div class="hidden items-center gap-2 sm:flex"><div class="h-5 w-px bg-border"></div> `);
		themeToggle($$renderer);
		$$renderer.push(`<!----> `);
		githubButton($$renderer);
		$$renderer.push(`<!----> `);
		contributeButton($$renderer);
		$$renderer.push(`<!----></div> <button type="button" aria-label="Toggle menu"${$.attr("aria-expanded", menuOpen)} class="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground transition-all hover:bg-muted sm:hidden">`);
		if (menuOpen) $$renderer.push(`<!--[0--><svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`);
		else $$renderer.push(`<!--[-1--><svg class="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
		$$renderer.push(`<!--]--></button></div> `);
		if (menuOpen) {
			$$renderer.push(`<!--[0--><div class="border-t border-border/70 bg-background/95 backdrop-blur-xl sm:hidden"><div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">`);
			searchButton($$renderer, "w-full");
			$$renderer.push(`<!----> <div class="flex items-center gap-2">`);
			contributeButton($$renderer, "flex-1 justify-center h-9");
			$$renderer.push(`<!----> `);
			githubButton($$renderer, "flex-1 justify-center h-9");
			$$renderer.push(`<!----> `);
			themeToggle($$renderer);
			$$renderer.push(`<!----></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header>`);
	});
}
// src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="border-t border-border bg-card/60 py-8 sm:py-10 mt-20 text-muted-foreground text-xs transition-colors duration-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"><div class="flex items-center gap-2.5"><div class="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-1 shrink-0"><img src="/logo.svg" alt="logo" class="w-full h-full object-contain"></div><p><span class="text-foreground font-medium">BroHelp<span class="text-emerald-500">Me</span></span> — Quick reference cheat sheets for developers.</p></div><div class="flex items-center gap-5 sm:gap-6 flex-wrap justify-center"><!-- <a href="/search" class="hover:text-foreground transition-colors">
				Search
			</a> --><a href="/quickref" class="hover:text-foreground transition-colors">Syntax Manual</a><a href="https://github.com/Sumangal44/brohelpme" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 hover:text-foreground transition-colors" aria-label="GitHub repository"><svg class="size-3.5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg><span>GitHub</span></a><a href="https://github.com/Sumangal44/brohelpme/tree/main/src/content/cheatsheets" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-500 transition-colors">Contribute</a><a href="https://github.com/Sumangal44/brohelpme/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-500 transition-colors"><span>MIT License</span></a></div></div></footer>`;
}, "/Users/sumu/needhelp/src/components/Footer.astro", void 0);
// src/components/CommandPalette.svelte
function CommandPalette($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { sheets = [] } = $$props;
		let isOpen = false;
		let query = "";
		let selectedIndex = 0;
		let isDark = true;
		onMount(() => {
			isDark = document.documentElement.classList.contains("dark");
			const onTheme = () => {
				isDark = document.documentElement.classList.contains("dark");
			};
			window.addEventListener("theme-changed", onTheme);
			document.addEventListener("open-command-palette", open);
			return () => {
				window.removeEventListener("theme-changed", onTheme);
				document.removeEventListener("open-command-palette", open);
			};
		});
		function toggleTheme() {
			if (typeof window.__toggleTheme === "function") window.__toggleTheme();
			else {
				isDark = !isDark;
				if (isDark) {
					document.documentElement.classList.add("dark");
					localStorage.setItem("theme", "dark");
				} else {
					document.documentElement.classList.remove("dark");
					localStorage.setItem("theme", "light");
				}
				window.dispatchEvent(new CustomEvent("theme-changed", { detail: { isDark } }));
			}
		}
		function setTheme(theme) {
			if (typeof window.__setTheme === "function") window.__setTheme(theme);
			else {
				isDark = theme === "dark";
				if (isDark) {
					document.documentElement.classList.add("dark");
					localStorage.setItem("theme", "dark");
				} else {
					document.documentElement.classList.remove("dark");
					localStorage.setItem("theme", "light");
				}
				window.dispatchEvent(new CustomEvent("theme-changed", { detail: { isDark } }));
			}
		}
		function openContributeModal() {
			close();
			window.dispatchEvent(new CustomEvent("open-contribute-modal"));
		}
		let results = $.derived(() => {
			const q = query.trim().toLowerCase();
			const list = [];
			const isThemeQuery = q.includes("theme") || q.includes("dark") || q.includes("light") || q.includes("mode") || q.includes("color");
			const isAddQuery = q.includes("add") || q.includes("contribut") || q.includes("new") || q.includes("create");
			if (isThemeQuery) {
				list.push({
					type: "action",
					id: "action-toggle-theme",
					title: isDark ? "Switch to Light Theme" : "Switch to Dark Theme",
					subtitle: isDark ? "Enable clean, high-contrast light theme" : "Enable deep dark theme with emerald accents",
					category: "Theme Action",
					color: "#10b981",
					action: () => toggleTheme()
				});
				list.push({
					type: "action",
					id: "action-light-theme",
					title: "Set Theme: Light ☀️",
					subtitle: "Switch application color palette to light mode",
					category: "Theme Action",
					color: "#f59e0b",
					action: () => setTheme("light")
				});
				list.push({
					type: "action",
					id: "action-dark-theme",
					title: "Set Theme: Dark 🌙",
					subtitle: "Switch application color palette to dark mode",
					category: "Theme Action",
					color: "#6366f1",
					action: () => setTheme("dark")
				});
			}
			if (isAddQuery) {
				list.push({
					type: "action",
					id: "action-add-cheatsheet",
					title: "Add / Contribute a Cheatsheet",
					subtitle: "Submit a new cheat sheet or edit existing reference cards",
					category: "Contribution",
					color: "#10b981",
					action: () => openContributeModal()
				});
				list.push({
					type: "action",
					id: "action-syntax-manual",
					title: "CheatSheets Syntax Manual",
					subtitle: "Formatting guide, layout variants, code blocks and tables",
					category: "Guide",
					url: "/quickref",
					color: "#8b5cf6"
				});
				list.push({
					type: "action",
					id: "action-github-repo",
					title: "Sumangal44/brohelpme on GitHub",
					subtitle: "Open the upstream repository to contribute pull requests",
					category: "External",
					color: "#24292f",
					action: () => window.open("https://github.com/Sumangal44/brohelpme", "_blank")
				});
			}
			if (!q) {
				list.push({
					type: "action",
					id: "action-toggle-theme-default",
					title: isDark ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙",
					subtitle: "Press Enter to toggle application color scheme",
					category: "Theme",
					color: "#10b981",
					action: () => toggleTheme()
				});
				list.push({
					type: "action",
					id: "action-contribute-default",
					title: "Contribute / Add Cheatsheet ➕",
					subtitle: "Learn how to publish a new reference card to cheatsheets.zip",
					category: "Contribute",
					color: "#06b6d4",
					action: () => openContributeModal()
				});
				for (const sheet of sheets.slice(0, 10)) list.push({
					type: "sheet",
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					icon: sheet.icon,
					color: sheet.color
				});
				return list;
			}
			for (const sheet of sheets) {
				const sheetTitleMatch = sheet.title.toLowerCase().includes(q) || sheet.slug.toLowerCase().includes(q);
				const tagMatch = sheet.tags.some((t) => t.toLowerCase().includes(q));
				const introMatch = sheet.intro.toLowerCase().includes(q);
				if (sheetTitleMatch || tagMatch || introMatch) list.push({
					type: "sheet",
					id: sheet.slug,
					title: sheet.title,
					subtitle: sheet.intro,
					category: sheet.category,
					url: `/${sheet.slug}`,
					icon: sheet.icon,
					color: sheet.color
				});
			}
			return list.slice(0, 25);
		});
		function open() {
			isOpen = true;
			query = "";
			selectedIndex = 0;
			setTimeout(() => void 0, 50);
		}
		function close() {
			isOpen = false;
		}
		if (isOpen) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-3 sm:px-4 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-all duration-150" role="dialog" aria-modal="true" tabindex="-1"><div class="relative w-full max-w-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"><div class="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-border gap-3 bg-slate-50/80 dark:bg-muted/40"><svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input${$.attr("value", query)} type="text" placeholder="Search 200+ cheat sheets, or type 'theme', 'dark', 'light'..." class="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:outline-none"/> `);
			if (query) $$renderer.push(`<!--[0--><button type="button" class="text-xs px-2 py-0.5 rounded text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-muted dark:text-muted-foreground dark:hover:text-foreground cursor-pointer transition-colors">Clear</button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button" class="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 dark:bg-muted dark:hover:bg-muted/80 dark:text-muted-foreground dark:hover:text-foreground dark:border-border cursor-pointer font-mono transition-colors">ESC</button></div> <div class="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-border/30">`);
			if (results().length === 0) $$renderer.push(`<!--[0--><div class="py-12 text-center text-slate-500 dark:text-muted-foreground text-sm">No cheatsheet or action matching "<span class="text-slate-900 dark:text-foreground font-medium">${$.escape(query)}</span>" <div class="mt-3"><button type="button" class="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer">+ Contribute this sheet to cheatsheets.zip</button></div></div>`);
			else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array = $.ensure_array_like(results());
				for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
					let item = each_array[idx];
					$$renderer.push(`<button type="button"${$.attr_class(`w-full text-left p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 transition-colors duration-100 cursor-pointer ${idx === selectedIndex ? "bg-slate-100 dark:bg-muted text-slate-900 dark:text-foreground font-medium shadow-xs" : "text-slate-700 dark:text-foreground/80 hover:bg-slate-50 dark:hover:bg-muted/50"}`)}><div class="flex items-center gap-3 min-w-0">`);
					if (item.icon) $$renderer.push(`<!--[0--><div class="w-8 h-8 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-xs border border-white/10"${$.attr_style(`background: linear-gradient(135deg, ${$.stringify(item.color || "#10b981")} 0%, ${$.stringify(item.color || "#10b981")}bb 100%);`)}><img${$.attr("src", item.icon)}${$.attr("alt", item.title)} class="w-full h-full object-contain filter brightness-110 drop-shadow-xs"/></div>`);
					else {
						$$renderer.push(`<!--[-1--><div class="w-8 h-8 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-xs text-white"${$.attr_style(`background: linear-gradient(135deg, ${$.stringify(item.color || "#10b981")} 0%, ${$.stringify(item.color || "#10b981")}bb 100%);`)}>`);
						if (item.category.includes("Theme")) $$renderer.push(`<!--[0--><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
						else $$renderer.push(`<!--[-1--><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>`);
						$$renderer.push(`<!--]--></div>`);
					}
					$$renderer.push(`<!--]--> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-0.5"><span class="font-medium text-sm text-slate-900 dark:text-foreground truncate">${$.escape(item.title)}</span> <span class="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 shrink-0">${$.escape(item.category)}</span></div> <p class="text-xs text-slate-500 dark:text-muted-foreground truncate">${$.escape(item.subtitle)}</p></div></div> <svg class="w-4 h-4 text-slate-400 dark:text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div> <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-muted/40 border-t border-slate-200 dark:border-border flex items-center justify-between text-[11px] text-slate-500 dark:text-muted-foreground"><div class="flex items-center gap-3"><span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">↑↓</kbd> navigate</span> <span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">↵</kbd> select</span> <span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-card text-slate-700 dark:text-foreground border border-slate-200 dark:border-border shadow-xs">esc</kbd> close</span></div> <div class="flex items-center gap-2"><button type="button" class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 dark:bg-card dark:hover:bg-muted dark:text-foreground dark:border-border shadow-xs cursor-pointer transition-colors"><span>Theme:</span> <span class="font-medium text-emerald-600 dark:text-emerald-400">${$.escape(isDark ? "Dark 🌙" : "Light ☀️")}</span></button></div></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/components/ContributeModal.svelte
function ContributeModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isOpen = false;
		let currentSlug = "";
		let currentTitle = "";
		let activeTab = "add";
		let copied = false;
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
		function open(slug, title) {
			currentSlug = slug || "";
			currentTitle = title || "";
			activeTab = currentSlug ? "edit" : "add";
			isOpen = true;
		}
		function close() {
			isOpen = false;
		}
		function copyTemplate() {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(templateCode);
				copied = true;
				setTimeout(() => copied = false, 2e3);
			}
		}
		onMount(() => {
			const handleOpen = (e) => {
				open(e.detail?.slug, e.detail?.title);
			};
			const handleKeydown = (e) => {
				if (e.key === "Escape" && isOpen) close();
			};
			window.addEventListener("open-contribute-modal", handleOpen);
			window.addEventListener("keydown", handleKeydown);
			return () => {
				window.removeEventListener("open-contribute-modal", handleOpen);
				window.removeEventListener("keydown", handleKeydown);
			};
		});
		if (isOpen) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150" role="dialog" aria-modal="true" tabindex="-1"><div class="relative w-full max-w-2xl bg-white dark:bg-[#0d121f] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"><div class="px-5 py-4 border-b border-border flex items-center justify-between gap-3 bg-muted/40"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg></div> <div><h2 class="text-base sm:text-lg font-semibold text-foreground">Contribute to cheatsheets.zip</h2> <p class="text-xs text-muted-foreground">Community-maintained quick reference repository</p></div></div> <button type="button" class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer" aria-label="Close dialog"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="flex items-center gap-1 px-5 pt-3 border-b border-border bg-card">`);
			if (currentSlug) $$renderer.push(`<!--[0--><button type="button"${$.attr_class(`px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${activeTab === "edit" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-muted-foreground hover:text-foreground"}`)}>Edit "${$.escape(currentTitle || currentSlug)}"</button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button"${$.attr_class(`px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${activeTab === "add" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-muted-foreground hover:text-foreground"}`)}>Add New Cheatsheet</button> <button type="button"${$.attr_class(`px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${activeTab === "template" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-muted-foreground hover:text-foreground"}`)}>Markdown Template</button></div> <div class="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-foreground">`);
			if (activeTab === "edit" && currentSlug) $$renderer.push(`<!--[0--><div class="space-y-4"><div class="p-4 rounded-xl bg-muted/50 border border-border"><h3 class="font-semibold text-foreground text-sm mb-1">Edit existing cheat sheet: <span class="text-emerald-600 dark:text-emerald-400">${$.escape(currentTitle || currentSlug)}</span></h3> <p class="text-xs text-muted-foreground leading-relaxed">You can edit this file directly in GitHub or fork the repo to submit a Pull Request.</p></div> <div class="flex flex-col sm:flex-row gap-2.5"><a${$.attr("href", `https://github.com/Sumangal44/brohelpme/blob/main/src/content/cheatsheets/${currentSlug}.md`)} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all text-center"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg> <span>View Source on GitHub</span></a> <a${$.attr("href", `https://github.com/Sumangal44/brohelpme/edit/main/src/content/cheatsheets/${currentSlug}.md`)} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-xs shadow-xs transition-all text-center"><svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> <span>Direct Edit in Browser</span></a></div></div>`);
			else if (activeTab === "add") $$renderer.push(`<!--[1--><div class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">1</span> <div><h4 class="font-medium text-foreground text-xs mb-0.5">Fork or Branch</h4> <p class="text-[11px] text-muted-foreground leading-normal">Fork this repository or create a new branch: <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">feat/my-cheatsheet</code>.</p></div></div> <div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">2</span> <div><h4 class="font-medium text-foreground text-xs mb-0.5">Create Markdown File</h4> <p class="text-[11px] text-muted-foreground leading-normal">Add <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">src/content/cheatsheets/&lt;slug>.md</code> with frontmatter.</p></div></div> <div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">3</span> <div><h4 class="font-medium text-foreground text-xs mb-0.5">Add an Icon</h4> <p class="text-[11px] text-muted-foreground leading-normal">Optionally drop an SVG at <a href="https://github.com/Sumangal44/brohelpme/tree/main/public/icons" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"><code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">public/icons/&lt;slug>.svg</code> <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a> — the site logo is used as fallback.</p></div></div> <div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">4</span> <div><h4 class="font-medium text-foreground text-xs mb-0.5">Structure Cards</h4> <p class="text-[11px] text-muted-foreground leading-normal">Use <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">##</code> for sections, <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">###</code> for cards, tables, and code fences.</p></div></div> <div class="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3 sm:col-span-2"><span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">5</span> <div><h4 class="font-medium text-foreground text-xs mb-0.5">Build &amp; Submit PR</h4> <p class="text-[11px] text-muted-foreground leading-normal">Verify with <code class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]">npm run build</code> and open a Pull Request!</p></div></div></div> <div class="flex flex-col sm:flex-row gap-2.5 pt-2"><a href="https://github.com/Sumangal44/brohelpme/new/main/src/content/cheatsheets" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all text-center"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> <span>Create File Online on GitHub</span></a> <a href="/quickref" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-xs shadow-xs transition-all text-center"><span>Read Syntax Manual</span> <svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div></div>`);
			else if (activeTab === "template") {
				$$renderer.push(`<!--[2--><div class="space-y-3"><div class="flex items-center justify-between"><span class="text-xs text-muted-foreground font-mono">src/content/cheatsheets/my-tool.md</span> `);
				Button($$renderer, {
					variant: "outline",
					size: "sm",
					onclick: copyTemplate,
					class: "text-xs gap-1.5 h-7",
					children: ($$renderer) => {
						if (copied) $$renderer.push(`<!--[0--><span class="text-emerald-500 font-medium">✓ Copied Template!</span>`);
						else $$renderer.push(`<!--[-1--><svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> <span>Copy Template</span>`);
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <pre class="p-3 rounded-xl bg-muted/60 border border-border text-xs font-mono overflow-x-auto text-foreground max-h-60 leading-relaxed"><code>---
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
</code></pre></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="px-5 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground"><a href="https://github.com/Sumangal44/brohelpme" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors inline-flex items-center gap-1.5"><span>Sumangal44/brohelpme on GitHub</span> <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a> <kbd class="px-1.5 py-0.5 rounded bg-muted text-foreground border border-border font-mono text-[10px]">ESC to close</kbd></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/lib/types.ts
var RECOMMENDED_SLUGS = [
	"chatgpt",
	"bash",
	"python",
	"javascript",
	"go",
	"vim",
	"regex",
	"awk",
	"docker",
	"git",
	"linux",
	"typescript"
];
var HOMEPAGE_CATEGORIES = [
	"AI",
	"Programming",
	"Toolkit",
	"Operating System",
	"Linux Command",
	"Python",
	"Database",
	"Keyboard Shortcuts",
	"Game",
	"Other"
];
// src/lib/cheatsheets.ts
var CONTENT_DIR = path.resolve(process.cwd(), "src/content/cheatsheets");
var ICONS_DIR = path.resolve(process.cwd(), "public/icons");
var LANG_MAP = {
	"shell": "bash",
	"shell script": "bash",
	"sh": "bash",
	"console": "bash",
	"terminal": "bash",
	"cmd": "bat",
	"dos": "bat",
	"js": "javascript",
	"ts": "typescript",
	"cs": "csharp",
	"rs": "rust",
	"py": "python",
	"ml": "ocaml",
	"golang": "go",
	"c++": "cpp",
	"text": "text",
	"txt": "text",
	"plain": "text",
	"plaintext": "text",
	"katex": "latex",
	"mcfunction": "text",
	"mongosh": "javascript",
	"gitignore": "ini"
};
var highlighterPromise = null;
async function getHighlighter() {
	if (!highlighterPromise) highlighterPromise = createHighlighter({
		themes: ["github-light", "github-dark"],
		langs: [
			"bash",
			"c",
			"cpp",
			"csharp",
			"css",
			"dart",
			"diff",
			"dockerfile",
			"go",
			"graphql",
			"groovy",
			"html",
			"ini",
			"java",
			"javascript",
			"json",
			"kotlin",
			"latex",
			"lisp",
			"lua",
			"make",
			"markdown",
			"matlab",
			"nginx",
			"nim",
			"nix",
			"ocaml",
			"perl",
			"php",
			"powershell",
			"pug",
			"python",
			"r",
			"regex",
			"ruby",
			"rust",
			"scala",
			"scss",
			"sql",
			"swift",
			"toml",
			"typescript",
			"vhdl",
			"vim",
			"xml",
			"yaml",
			"bat"
		]
	});
	return highlighterPromise;
}
async function highlightSnippet(highlighter, code, rawLang) {
	const cleanLang = (rawLang || "text").split(/[\s{.]/)[0].toLowerCase();
	const lang = LANG_MAP[cleanLang] || cleanLang;
	try {
		if (!highlighter.getLoadedLanguages().includes(lang)) try {
			await highlighter.loadLanguage(lang);
		} catch {}
		const finalLang = highlighter.getLoadedLanguages().includes(lang) ? lang : "text";
		return highlighter.codeToHtml(code, {
			lang: finalLang,
			themes: {
				light: "github-light",
				dark: "github-dark"
			}
		});
	} catch {
		return `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
	}
}
function extractHexColor(bg) {
	if (!bg) return "#4f46e5";
	const match = bg.match(/#(?:[0-9a-fA-F]{3,8})/);
	if (match) return match[0];
	if (bg.includes("green") || bg.includes("emerald")) return "#10b981";
	if (bg.includes("blue") || bg.includes("sky")) return "#0ea5e9";
	if (bg.includes("purple") || bg.includes("indigo")) return "#6366f1";
	if (bg.includes("pink") || bg.includes("rose")) return "#f43f5e";
	if (bg.includes("orange") || bg.includes("amber")) return "#f59e0b";
	if (bg.includes("yellow")) return "#eab308";
	if (bg.includes("red")) return "#ef4444";
	return "#4f46e5";
}
var iconCache = null;
function getIconSet() {
	if (!iconCache) try {
		iconCache = new Set(fs.readdirSync(ICONS_DIR));
	} catch {
		iconCache = /* @__PURE__ */ new Set();
	}
	return iconCache;
}
function resolveIcon(slug) {
	const icons = getIconSet();
	if (icons.has(`${slug}.svg`)) return `/icons/${slug}.svg`;
	const aliasMap = {
		js: "javascript",
		ts: "typescript",
		py: "python",
		sh: "bash",
		golang: "go",
		rb: "ruby",
		md: "markdown",
		yml: "yaml",
		postgres: "postgres",
		k8s: "kubernetes",
		actions: "github-actions",
		nc: "netcat",
		resolutions: "resolution",
		"socket-io": "style",
		"windows-cmd": "windows",
		"windows-shortcuts": "windows",
		"chrome-devtools": "chrome",
		"react-test-library": "react",
		"html-char": "html",
		"css3": "css3",
		"fastapi": "fastapi",
		"flask": "flask",
		"matplotlib": "python",
		"tensorflow": "tensorflow",
		"gemma4": "gemini-cli",
		"chmod": "chmod",
		"http-status-code": "link",
		"conventional-commits": "git",
		"systemd": "alpine-linux",
		"ssh": "ssh",
		"screen": "tmux",
		"find": "grep",
		"awk": "grep",
		"lsof": "netstat",
		"networkports": "netstat",
		"table-plus": "postgres",
		"sequel-pro": "mysql",
		"putty": "ssh",
		"telnet": "netcat",
		"taskset": "bash",
		"htmx": "htmx",
		"n8n": "hook",
		"color-picker": "colorscreen",
		"code-editor-ios": "vscode",
		"bear-notes": "obsidian",
		"roam": "obsidian",
		"notion": "notion",
		"superhuman": "gmail",
		"transmit": "filezilla",
		"pandoc": "markdown",
		"sdkman": "java",
		"mime": "xml",
		"iso-639-1": "xml",
		"ascii-code": "xml",
		"aspect-ratio": "resolution",
		"lua": "lua",
		"origami": "framer-x",
		"kanbanmail": "gmail",
		"jest": "jest",
		"minecraft-bedrock": "minecraft",
		"minecraft-java": "minecraft",
		"nix": "alpine-linux",
		"apex-legends": "game",
		"fortnite": "game",
		"guitar-pro": "soundcloud"
	};
	if (aliasMap[slug] && icons.has(`${aliasMap[slug]}.svg`)) return `/icons/${aliasMap[slug]}.svg`;
	return "/logo.svg";
}
function slugify(text) {
	return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}
var cachedAllSheets = null;
function getAllCheatsheets() {
	if (cachedAllSheets) return cachedAllSheets;
	if (!fs.existsSync(CONTENT_DIR)) return [];
	const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
	const sheets = [];
	for (const file of files) {
		const slug = file.replace(".md", "");
		const fullPath = path.join(CONTENT_DIR, file);
		const fmMatch = fs.readFileSync(fullPath, "utf-8").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
		if (!fmMatch) continue;
		let data = {};
		try {
			data = YAML.parse(fmMatch[1]) || {};
		} catch {
			data = {};
		}
		const title = data.title || slug.toUpperCase();
		const category = (Array.isArray(data.categories) ? data.categories : [data.categories || "Other"])[0] || "Other";
		const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
		const intro = (typeof data.intro === "string" ? data.intro : "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
		const background = data.background || "";
		const color = extractHexColor(background);
		const cardMatches = fmMatch[2].match(/\n###\s+/g);
		const cardCount = cardMatches ? cardMatches.length : 1;
		sheets.push({
			slug,
			title,
			date: data.date ? String(data.date) : void 0,
			category,
			tags,
			intro: intro || `${title} quick reference cheat sheet.`,
			icon: resolveIcon(slug),
			background,
			color,
			cardCount
		});
	}
	sheets.sort((a, b) => {
		const aIdx = RECOMMENDED_SLUGS.indexOf(a.slug);
		const bIdx = RECOMMENDED_SLUGS.indexOf(b.slug);
		if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
		if (aIdx !== -1) return -1;
		if (bIdx !== -1) return 1;
		return a.title.localeCompare(b.title);
	});
	cachedAllSheets = sheets;
	return sheets;
}
async function getCheatsheet(slug) {
	const filePath = path.join(CONTENT_DIR, `${slug}.md`);
	if (!fs.existsSync(filePath)) return null;
	const highlighter = await getHighlighter();
	const fmMatch = fs.readFileSync(filePath, "utf-8").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!fmMatch) return null;
	let data = {};
	try {
		data = YAML.parse(fmMatch[1]) || {};
	} catch {
		data = {};
	}
	const title = data.title || slug.toUpperCase();
	const category = (Array.isArray(data.categories) ? data.categories : [data.categories || "Other"])[0] || "Other";
	const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
	const intro = (typeof data.intro === "string" ? data.intro : "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
	const background = data.background || "";
	const color = extractHexColor(background);
	const body = fmMatch[2];
	const sections = [];
	const secParts = body.split(/\n(?=##\s+)/);
	let totalCards = 0;
	function processCardVariants(rawHtml) {
		let html = rawHtml;
		html = html.replace(/<table>(\s*)<thead>(\s*)<tr>(\s*(?:<th>\s*-\s*<\/th>\s*)+)<\/tr>(\s*)<\/thead>/gi, (match, s1, s2, ths, s3) => {
			return `<table class="table-compact">${s1}<thead class="hidden">${s2}<tr>${ths}</tr>${s3}</thead>`;
		});
		const TABLE_VARIANTS = [
			".shortcuts",
			".show-header",
			".bold-first",
			".left-text",
			".no-wrap"
		];
		html = html.replace(/<table([^>]*)>([\s\S]*?)<\/table>((?:(?!<table)[\s\S]){0,60}?<p>\s*\{([^}]+)\}\s*<\/p>)/gi, (match, attrs, tableInner, between, markerText) => {
			const classes = markerText.match(/\.[a-zA-Z0-9_-]+/g) || [];
			if (!classes.some((c) => TABLE_VARIANTS.includes(c))) return match;
			let inner = tableInner;
			const extra = [];
			if (classes.includes(".shortcuts")) {
				inner = inner.replace(/<code>(.*?)<\/code>/g, "<kbd>$1</kbd>");
				extra.push("table-shortcuts");
			}
			if (classes.includes(".show-header")) {
				inner = inner.replace(/<thead class="hidden">/gi, "<thead>");
				extra.push("table-show-header");
			}
			if (classes.includes(".bold-first")) extra.push("table-bold-first");
			if (classes.includes(".left-text")) extra.push("table-left-text");
			if (classes.includes(".no-wrap")) extra.push("table-no-wrap");
			const existing = (attrs.match(/class="([^"]*)"/) || [])[1] || "";
			const cls = [.../* @__PURE__ */ new Set([...existing ? [existing] : [], ...extra])].join(" ");
			return `<table${existing ? attrs.replace(/class="[^"]*"/, `class="${cls}"`) : ` class="${cls}"`}>${inner}</table>${between.replace(/<p>\s*\{[^}]+\}\s*<\/p>/gi, "")}`;
		});
		html = html.replace(/<a\s+href="([^"]+)">([^<]+)<\/a>\s*\{\.link-arrow\}/gi, "<a href=\"$1\" class=\"link-arrow-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card hover:bg-muted border border-border text-xs font-medium text-foreground hover:text-emerald-500 transition-colors shadow-xs my-1\">$2 <span class=\"text-emerald-500 font-bold\">→</span></a>");
		html = html.replace(/\{\.link-arrow\}/gi, "");
		html = html.replace(/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.(?:marker|style)-timeline\}\s*<\/p>/gi, "<ul class=\"list-timeline\">$1</ul>");
		html = html.replace(/<li([^>]*)>([\s\S]*?)\{\.(?:marker|style)-timeline\}<\/li>/gi, "<li$1 class=\"list-timeline-item\">$2</li>");
		html = html.replace(/<p>\s*\{\.(?:marker|style)-timeline\}\s*<\/p>/gi, "");
		html = html.replace(/\{\.(?:marker|style)-timeline\}/gi, "");
		html = html.replace(/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.marker-none\}\s*<\/p>/gi, "<ul class=\"list-none-marker\">$1</ul>");
		html = html.replace(/<p>\s*\{\.marker-none\}\s*<\/p>/gi, "");
		html = html.replace(/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.marker-round\}\s*<\/p>/gi, "<ul class=\"list-round-marker\">$1</ul>");
		html = html.replace(/<p>\s*\{\.marker-round\}\s*<\/p>/gi, "");
		html = html.replace(/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.cols-2(?:\s+\.marker-none)?\}\s*<\/p>/gi, "<ul class=\"list-cols-2 list-none-marker\">$1</ul>");
		html = html.replace(/<ul>([\s\S]*?)<\/ul>\s*<p>\s*\{\.cols-3\}\s*<\/p>/gi, "<ul class=\"list-cols-3\">$1</ul>");
		html = html.replace(/<p>\s*\{\.cols-\d+(?:\s+\.[^}]+)?\}\s*<\/p>/gi, "");
		html = html.replace(/<p>\s*\{(?:\.[a-zA-Z0-9_-]+\s*)+\}\s*<\/p>/gi, "");
		html = html.replace(/(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi, (_match, open, inner, close) => open + inner.replace(/\s*\{(?:\.[a-zA-Z0-9_-]+)+\s*\}/g, "") + close);
		return html;
	}
	for (const secPart of secParts) {
		const secHeader = secPart.trim().split("\n")[0];
		if (!secHeader.startsWith("## ")) continue;
		const rawSecTitle = secHeader.replace(/^##\s+/, "").trim();
		const secTitle = rawSecTitle.replace(/\{[^}]+\}/g, "").trim();
		const secId = slugify(secTitle) || `sec-${sections.length + 1}`;
		const secCols = rawSecTitle.includes(".cols-1") ? 1 : rawSecTitle.includes(".cols-2") ? 2 : 3;
		const cardParts = secPart.substring(secHeader.length).split(/\n(?=###\s+)/);
		const cards = [];
		for (const cardPart of cardParts) {
			const cardHeader = cardPart.trim().split("\n")[0];
			if (!cardHeader.startsWith("### ")) continue;
			const rawCardTitle = cardHeader.replace(/^###\s+/, "").trim();
			const cardTitle = rawCardTitle.replace(/\{[^}]+\}/g, "").trim();
			const colSpan = rawCardTitle.includes(".col-span-3") || rawCardTitle.includes(".cols-3") ? 3 : rawCardTitle.includes(".col-span-2") || rawCardTitle.includes(".cols-2") ? 2 : 1;
			const rowSpan = rawCardTitle.includes(".row-span-3") ? 3 : rawCardTitle.includes(".row-span-2") ? 2 : 1;
			const theme = rawCardTitle.includes(".primary") ? "primary" : rawCardTitle.includes(".secondary") ? "secondary" : rawCardTitle.includes(".info") ? "info" : rawCardTitle.includes(".warning") ? "warning" : rawCardTitle.includes(".danger") ? "danger" : rawCardTitle.includes(".success") ? "success" : "default";
			const cardId = slugify(cardTitle) || `card-${cards.length + 1}`;
			const cardRawBody = cardPart.trim().substring(cardHeader.length).trim();
			const codeSnippets = [];
			const codeMatches = cardRawBody.matchAll(/```[\w-]*\s*([\s\S]*?)```/g);
			for (const cm of codeMatches) if (cm[1]) codeSnippets.push(cm[1].trim());
			let cardHtml = "";
			try {
				const codeBlocks = [];
				const ast = Markdoc.parse(cardRawBody);
				const transformed = Markdoc.transform(ast, { nodes: { fence: {
					render: "div",
					transform(node) {
						const lang = node.attributes?.language || "code";
						const codeContent = node.attributes?.content || "";
						const id = `__SHIKI_BLOCK_${codeBlocks.length}__`;
						codeBlocks.push({
							id,
							lang,
							code: codeContent
						});
						return new Markdoc.Tag("div", {
							class: "shiki-placeholder",
							"data-id": id
						});
					}
				} } });
				cardHtml = Markdoc.renderers.html(transformed);
				for (const block of codeBlocks) {
					const shikiHtml = await highlightSnippet(highlighter, block.code, block.lang);
					const cleanDisplayLang = (block.lang || "code").split(/[\s{.]/)[0].toLowerCase();
					const isWrap = (block.lang || "").includes(".wrap") || cardRawBody.includes(".wrap");
					const wrapper = `
<div class="code-block-wrapper my-2 relative group rounded-lg overflow-hidden border border-border">
	<div class="code-block-header flex items-center justify-between px-3 py-1 bg-muted/80 border-b border-border text-[11px] font-mono text-muted-foreground">
		<span class="font-medium uppercase tracking-wider text-[10px]">${cleanDisplayLang}</span>
		<button type="button" class="copy-code-btn px-2 py-0.5 rounded bg-card hover:bg-muted text-foreground text-[11px] font-sans border border-border transition-colors cursor-pointer shadow-xs" data-code="${block.code.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">Copy</button>
	</div>
	<div class="${isWrap ? "wrap-code-box" : ""}">${shikiHtml}</div>
</div>`.trim();
					cardHtml = cardHtml.replace(`<div class="shiki-placeholder" data-id="${block.id}"></div>`, wrapper);
				}
				cardHtml = processCardVariants(cardHtml);
			} catch {
				cardHtml = `<pre class="p-3 text-xs font-mono overflow-x-auto leading-relaxed"><code>${cardRawBody.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
			}
			cards.push({
				id: cardId,
				title: cardTitle,
				colSpan,
				rowSpan,
				theme,
				html: cardHtml,
				codeSnippets
			});
			totalCards++;
		}
		if (cards.length > 0) sections.push({
			id: secId,
			title: secTitle,
			cols: secCols,
			cards
		});
	}
	return {
		slug,
		title,
		date: data.date ? String(data.date) : void 0,
		category,
		tags,
		intro: intro || `${title} quick reference cheat sheet.`,
		icon: resolveIcon(slug),
		background,
		color,
		cardCount: totalCards,
		sections
	};
}
function getAllCategories() {
	const sheets = getAllCheatsheets();
	const set = /* @__PURE__ */ new Set();
	for (const s of sheets) if (s.category) set.add(s.category);
	return [
		"All",
		...HOMEPAGE_CATEGORIES.filter((c) => set.has(c)),
		...Array.from(set).filter((c) => !HOMEPAGE_CATEGORIES.includes(c))
	];
}
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "BroHelpMe — Quick Reference for Developers", description = "Free, fast, and clean developer cheat sheets, command line references, and syntax guides without clutter." } = Astro.props;
	const allSheets = getAllCheatsheets();
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"><link rel="icon" type="image/svg+xml" href="/logo.svg"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#070a12" media="(prefers-color-scheme: dark)"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><!-- Zero-flash Theme Hydration Script & Theme Helpers --><script>
			(function() {
				function applyTheme(isDark) {
					if (isDark) {
						document.documentElement.classList.add('dark');
						localStorage.setItem('theme', 'dark');
					} else {
						document.documentElement.classList.remove('dark');
						localStorage.setItem('theme', 'light');
					}
					// Keep the browser chrome colour in sync with the *toggled* theme.
					syncThemeColor(isDark);
					window.dispatchEvent(new CustomEvent('theme-changed', { detail: { isDark } }));
				}

				function syncThemeColor(isDark) {
					var metas = document.querySelectorAll('meta[name="theme-color"]');
					for (var i = 0; i < metas.length; i++) {
						metas[i].setAttribute('content', isDark ? '#070a12' : '#f8fafc');
						metas[i].removeAttribute('media');
					}
				}

				window.__setTheme = function(theme) {
					applyTheme(theme === 'dark');
				};

				window.__toggleTheme = function() {
					const isDark = document.documentElement.classList.contains('dark');
					applyTheme(!isDark);
				};

				const storedTheme = localStorage.getItem('theme');
				let isDark;
				if (storedTheme === 'light') {
					isDark = false;
				} else if (storedTheme === 'dark') {
					isDark = true;
				} else {
					isDark = !window.matchMedia('(prefers-color-scheme: light)').matches;
				}
				document.documentElement.classList.toggle('dark', isDark);
				syncThemeColor(isDark);
			})();
		<\/script>${renderHead($$result)}</head><body class="bg-(--background) text-(--foreground) antialiased min-h-screen flex flex-col font-sans transition-colors duration-200">${renderComponent($$result, "Navbar", Navbar, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Users/sumu/needhelp/src/components/Navbar.svelte",
		"client:component-export": "default"
	})}<main class="flex-1 w-full overflow-x-hidden">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}<!-- Global Command Palette Search -->${renderComponent($$result, "CommandPalette", CommandPalette, {
		"client:load": true,
		"sheets": allSheets,
		"client:component-hydration": "load",
		"client:component-path": "/Users/sumu/needhelp/src/components/CommandPalette.svelte",
		"client:component-export": "default"
	})}<!-- Global Contribute / Add Cheatsheet Modal -->${renderComponent($$result, "ContributeModal", ContributeModal, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Users/sumu/needhelp/src/components/ContributeModal.svelte",
		"client:component-export": "default"
	})}</body></html>`;
}, "/Users/sumu/needhelp/src/layouts/Layout.astro", void 0);
export { HOMEPAGE_CATEGORIES as a, createComponent as c, getCheatsheet as i, __exportAll as l, getAllCategories as n, RECOMMENDED_SLUGS as o, getAllCheatsheets as r, createAstro as s, $$Layout as t };
