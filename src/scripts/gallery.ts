export function bindGallery(root: ParentNode = document) {
  root.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector<HTMLElement>('[data-gallery-main]');
    const thumbs = gallery.querySelectorAll<HTMLElement>('[data-gallery-thumb]');

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach((t) => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
        if (main) main.setAttribute('data-label', thumb.getAttribute('data-label') ?? '');
      });
    });
  });
}

bindGallery();
document.addEventListener('astro:page-load', () => bindGallery());
