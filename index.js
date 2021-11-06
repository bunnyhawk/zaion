

(function () {
  const wrapper = document.querySelector('.wrapper');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const resetSections = () => sections.forEach((section) => {
    section.addEventListener('click', event => { event.stopPropagation() }, false);
    section.classList.add('hidden');
  });

  resetSections();

  wrapper.addEventListener("click", function () {
    resetSections();
  }, false);

  navLinks.forEach((link) => {
    link.addEventListener('click', event => {
      event.stopPropagation();
      const sectionContainer = document.querySelector(`.${link.dataset.section}`);
      resetSections();
      sectionContainer.classList.toggle('hidden');
    }, false);
  });
})();
