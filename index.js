

(function () {
  const wrapper = document.querySelector('.wrapper');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('[data-section]');
  const loginBg = document.querySelector('.section-login');
  const loginForm = document.querySelector('.submit-form');

  const resetSections = () => sections.forEach((section) => {
    section.addEventListener('click', event => { event.stopPropagation() }, false);
    section.classList.add('hidden');
  });

  resetSections();

  wrapper.addEventListener("click", event => { resetSections() }, false);

  loginBg.addEventListener("click", event => { resetSections() }, false);

  loginForm.addEventListener("click", event => { event.stopPropagation() }, false);

  navLinks.forEach((link) => {
    link.addEventListener('click', event => {
      event.stopPropagation();
      const sectionContainer = document.querySelector(`.${link.dataset.section}`);
      resetSections();
      sectionContainer.classList.toggle('hidden');
    }, false);
  });
})();
