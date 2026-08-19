const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-nav');
const dialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogStatus = document.querySelector('#dialog-status');
const dialogFocus = document.querySelector('#dialog-focus');
const dialogDescription = document.querySelector('#dialog-description');
const atlasNodes = document.querySelectorAll('.atlas-node');
const projectArt = {
  'ASYMMETRY': 'asymmetry',
  'Obsidian Abyss': 'obsidian-abyss',
  'Devolution': 'devolution',
  'Deep Stellar': 'deep-stellar',
  'Agent Ledger': 'agent-ledger',
  'ONYX': 'onyx',
  'MINOS': 'minos',
  'The Hexagon': 'the-hexagon',
  'Protocol X-402': 'protocol-x-402',
  'ZERO-DARK': 'asymmetry',
  'DEAD DROP': 'asymmetry',
};
let lastProjectTrigger;

const closeMenu = () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
};
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
const openProject = (trigger) => {
  lastProjectTrigger = trigger;
  dialogTitle.textContent = trigger.dataset.project;
  dialogStatus.textContent = trigger.dataset.status;
  dialogFocus.textContent = trigger.dataset.focus;
  dialogDescription.textContent = trigger.dataset.description;
  dialog.dataset.art = projectArt[trigger.dataset.project] || 'asymmetry';
  atlasNodes.forEach((node) => node.classList.toggle('is-active', node.dataset.project === trigger.dataset.project));
  dialog.showModal();
};
document.querySelectorAll('[data-project]').forEach((trigger) => trigger.addEventListener('click', () => openProject(trigger)));
dialog.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { if (lastProjectTrigger) lastProjectTrigger.focus(); });

const railLinks = document.querySelectorAll('[data-rail-target]');
const railSections = [...railLinks].map((link) => document.querySelector(`#${link.dataset.railTarget}`)).filter(Boolean);
const setActiveRail = (section) => railLinks.forEach((link) => {
  const active = link.dataset.railTarget === section.id;
  if (active) link.setAttribute('aria-current', 'location');
  else link.removeAttribute('aria-current');
});
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => setActiveRail(entry.target));
  }, { rootMargin: '-43% 0px -48%', threshold: 0 });
  railSections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.studio-thesis, .studio-method, .project-atlas, .portfolio, .asymmetry, .public-materials, .closing-signal').forEach((section) => {
    section.classList.add('reveal-on-scroll');
    revealObserver.observe(section);
  });
} else {
  document.querySelectorAll('.reveal-on-scroll').forEach((section) => section.classList.add('is-visible'));
}
document.querySelector('#year').textContent = new Date().getFullYear();
