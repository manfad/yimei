import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let mm: gsap.MatchMedia | undefined;

function initMotion() {
  mm?.revert();
  mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.reveal, [data-hero-item]', { autoAlpha: 1, y: 0 });
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const heroItems = document.querySelectorAll<HTMLElement>('.hero [data-hero-item]');
    if (heroItems.length) {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }

    gsap.set('.reveal:not(.is-hidden)', { autoAlpha: 0, y: 18 });

    ScrollTrigger.batch('.reveal:not(.is-hidden)', {
      start: 'top 92%',
      once: true,
      onEnter: (elements) => {
        gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.06,
          overwrite: 'auto',
        });
      },
    });

    ScrollTrigger.refresh();
  });
}

initMotion();
document.addEventListener('astro:page-load', initMotion);
