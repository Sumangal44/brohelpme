// src/lib/card-gradient.ts
/**
* Deep background gradient for cheatsheet cards.
*
* Takes a card's category colour and mixes it toward near-black (`#020617`)
* until white card text reaches a readable contrast ratio, then steps one
* notch darker again for the far corner of the gradient. Light colours
* (yellows, cyans) therefore end up much deeper than already-dark ones, so
* every tile reads as a rich, "deep" surface with crisp white text in both
* light and dark mode.
*
* Used by the homepage card grids and the search results page.
*/
/** Near-black the colour is mixed toward (matches the dark theme base). */
var DARK = [
	2,
	6,
	23
];
/** WCAG AA contrast for the card's white label text. */
var MIN_CONTRAST = 4.5;
/** Starting mix for the near corner (94 % colour / 6 % near-black). */
var START_MIX = .94;
/** How far the mix can be pushed for very light colours. */
var MIN_MIX = .3;
var STEP = .04;
/** Extra darkening applied to the far corner of the gradient. */
var CORNER_DROP = .16;
function parseHex(hex) {
	const value = hex.trim().replace(/^#/, "");
	if (/^[0-9a-f]{6}$/i.test(value)) {
		const n = parseInt(value, 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	if (/^[0-9a-f]{3}$/i.test(value)) return [
		parseInt(value[0] + value[0], 16),
		parseInt(value[1] + value[1], 16),
		parseInt(value[2] + value[2], 16)
	];
	return null;
}
function mix(rgb, portion) {
	return `#${rgb.map((channel, i) => Math.round(channel * portion + DARK[i] * (1 - portion))).map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
function contrastWithWhite(hex) {
	const rgb = parseHex(hex);
	if (!rgb) return 21;
	const [r, g, b] = rgb.map((c) => {
		const s = c / 255;
		return s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
	});
	return 1.05 / (.2126 * r + .7152 * g + .0722 * b + .05);
}
/**
* `#3b82f6` → `linear-gradient(135deg, #3776d9 0%, #2b5cad 100%)`
*
* Returns a CSS `linear-gradient()` string with two deep stops derived from
* `color`. Unrecognised colour formats fall back to a flat gradient of the
* value itself so a card never ends up without a background.
*/
function deepCardGradient(color) {
	const rgb = parseHex(color);
	if (!rgb) return `linear-gradient(135deg, ${color} 0%, ${color} 100%)`;
	let portion = START_MIX;
	let start = mix(rgb, portion);
	while (contrastWithWhite(start) < MIN_CONTRAST && portion > MIN_MIX) {
		portion = Math.max(MIN_MIX, portion - STEP);
		start = mix(rgb, portion);
	}
	const end = mix(rgb, Math.max(MIN_MIX, portion - CORNER_DROP));
	return `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
}
export { deepCardGradient as t };
