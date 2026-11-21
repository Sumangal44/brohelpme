/**
 * Lightweight GSAP motion layer.
 * - Honours prefers-reduced-motion (never runs at all).
 * - Content is only hidden once this module has booted (.gsap-ready),
 *   with a failsafe in BaseLayout if the bundle never loads.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion(): void {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return;

	document.documentElement.classList.add('gsap-ready');
	(window as unknown as { __kdcMotion?: { booted: boolean } }).__kdcMotion = { booted: true };

	/* ------------------------------ hero entrance ---------------------------- */
	const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero]');
	if (heroItems.length) {
		gsap.fromTo(
			heroItems,
			{ y: 34, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1.05,
				ease: 'power3.out',
				stagger: 0.09,
				delay: 0.12,
				clearProps: 'transform'
			}
		);
	}

	/* --------------------------- scroll-triggered reveal --------------------- */
	gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
		const delay = Number(el.dataset.delay ?? 0);
		gsap.fromTo(
			el,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.95,
				delay,
				ease: 'power3.out',
				clearProps: 'transform',
				scrollTrigger: { trigger: el, start: 'top 86%', once: true }
			}
		);
	});

	/* stagger groups: children reveal one-by-one */
	gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
		const children = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal-child]'));
		if (!children.length) return;
		gsap.fromTo(
			children,
			{ y: 34, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.9,
				ease: 'power3.out',
				stagger: 0.1,
				clearProps: 'transform',
				scrollTrigger: { trigger: group, start: 'top 82%', once: true }
			}
		);
	});

	/* ---------------------------- image mask reveal -------------------------- */
	gsap.utils.toArray<HTMLElement>('[data-reveal-mask]').forEach((el) => {
		gsap.fromTo(
			el,
			{ clipPath: 'inset(0 0 100% 0)', y: 24 },
			{
				clipPath: 'inset(0 0 0% 0)',
				y: 0,
				duration: 1.15,
				ease: 'power4.out',
				scrollTrigger: { trigger: el, start: 'top 85%', once: true }
			}
		);
	});

	/* --------------------------- subtle parallax ----------------------------- */
	gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
		const amount = Number(el.dataset.parallax ?? 40);
		gsap.to(el, {
			y: -amount,
			ease: 'none',
			scrollTrigger: {
				trigger: el,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1
			}
		});
	});

	ScrollTrigger.refresh();
}
