export function bindGallery(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
    if (gallery.dataset.galleryBound) return;
    gallery.dataset.galleryBound = 'true';

    const main = gallery.querySelector<HTMLElement>('[data-gallery-main]');
    const thumbs = Array.from(gallery.querySelectorAll<HTMLElement>('[data-gallery-thumb]'));
    const more = gallery.querySelector<HTMLElement>('[data-gallery-more]');

    const images = thumbs
      .map((t) => ({
        src: t.getAttribute('data-gallery-src') ?? '',
        label: t.getAttribute('data-gallery-label') ?? t.getAttribute('data-label') ?? '',
      }))
      .filter((x) => x.src);

    function activate(thumb: HTMLElement) {
      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      const src = thumb.getAttribute('data-gallery-src');
      const label = thumb.getAttribute('data-gallery-label') ?? thumb.getAttribute('data-label') ?? '';
      if (main && src) main.setAttribute('src', src);
      if (main) {
        main.setAttribute('data-label', label);
        main.setAttribute('alt', label);
      }
    }

    thumbs.forEach((thumb) => thumb.addEventListener('click', () => activate(thumb)));

    // ---- Lightbox ----
    const lb = document.querySelector<HTMLElement>('[data-lightbox]');
    if (!lb || images.length === 0) return;

    const lbImg = lb.querySelector<HTMLImageElement>('[data-lb-img]');
    const lbCounter = lb.querySelector<HTMLElement>('[data-lb-counter]');
    const prevBtn = lb.querySelector<HTMLElement>('[data-lb-prev]');
    const nextBtn = lb.querySelector<HTMLElement>('[data-lb-next]');
    const closeBtn = lb.querySelector<HTMLElement>('[data-lb-close]');

    const single = images.length <= 1;
    prevBtn?.toggleAttribute('hidden', single);
    nextBtn?.toggleAttribute('hidden', single);

    let current = 0;

    function render() {
      const item = images[current];
      if (lbImg) {
        lbImg.src = item.src;
        lbImg.alt = item.label;
      }
      if (lbCounter) lbCounter.textContent = `${current + 1} / ${images.length}`;
    }

    function open(index: number) {
      current = Math.max(0, Math.min(index, images.length - 1));
      render();
      lb.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }

    function step(delta: number) {
      current = (current + delta + images.length) % images.length;
      render();
    }

    main?.addEventListener('click', () => {
      const activeIndex = thumbs.findIndex((t) => t.classList.contains('is-active'));
      open(activeIndex >= 0 ? activeIndex : 0);
    });

    more?.addEventListener('click', () => {
      const firstHidden = thumbs.findIndex((t) => t.classList.contains('is-hidden'));
      open(firstHidden >= 0 ? firstHidden : 0);
    });

    prevBtn?.addEventListener('click', () => step(-1));
    nextBtn?.addEventListener('click', () => step(1));
    closeBtn?.addEventListener('click', close);
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (lb.hasAttribute('hidden')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight' && !single) step(1);
      else if (e.key === 'ArrowLeft' && !single) step(-1);
    });
  });
}

bindGallery();
document.addEventListener('astro:page-load', () => bindGallery());
