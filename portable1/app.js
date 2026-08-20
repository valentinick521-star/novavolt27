const toggle = document.querySelector('.rest-toggle');
const extra = document.querySelector('#extra-products');
if (toggle && extra) {
  toggle.addEventListener('click', () => {
    const opening = extra.hasAttribute('hidden');
    if (opening) extra.removeAttribute('hidden'); else extra.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.textContent = opening ? 'Hide The Rest Of The List' : 'See The Rest Of The List';
  });
}
