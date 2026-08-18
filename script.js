const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-nav');
const dialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogStatus = document.querySelector('#dialog-status');
const dialogFocus = document.querySelector('#dialog-focus');
const dialogDescription = document.querySelector('#dialog-description');

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
document.querySelectorAll('[data-project]').forEach((trigger) => trigger.addEventListener('click', () => {
  dialogTitle.textContent = trigger.dataset.project;
  dialogStatus.textContent = trigger.dataset.status;
  dialogFocus.textContent = trigger.dataset.focus;
  dialogDescription.textContent = trigger.dataset.description;
  dialog.showModal();
}));
dialog.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
