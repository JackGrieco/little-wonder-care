// One-shot scroll reveal for elements marked with data-reveal
// ("up" | "left" | "right" | "scale" | "growY"). The hidden starting state
// lives in global.css; this script only adds `.is-revealed` when an element
// scrolls into view. An optional data-delay (ms) staggers items in a grid.

const REVEALED_CLASS = 'is-revealed';
const OBSERVER_OPTIONS: IntersectionObserverInit = {
	threshold: 0.12,
	rootMargin: '0px 0px -40px 0px',
};

function revealAll(elements: HTMLElement[]) {
	elements.forEach((el) => el.classList.add(REVEALED_CLASS));
}

function initReveal() {
	const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		revealAll(elements);
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add(REVEALED_CLASS);
			observer.unobserve(entry.target);
		});
	}, OBSERVER_OPTIONS);

	elements.forEach((el) => {
		const delay = Number(el.dataset.delay);
		if (delay > 0) el.style.transitionDelay = `${delay}ms`;
		observer.observe(el);
	});
}

initReveal();
