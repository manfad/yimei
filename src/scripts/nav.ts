const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const mnav = document.querySelector('.mnav');

toggle?.addEventListener('click', () => {
  mnav?.classList.toggle('open');
  const open = mnav?.classList.contains('open') ?? false;
  toggle.setAttribute('aria-expanded', String(open));
});

mnav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mnav?.classList.remove('open'));
});
