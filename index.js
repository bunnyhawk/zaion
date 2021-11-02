

(function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const resetSections = () => sections.forEach((section) => {
    section.classList.add('hidden');
  });

  resetSections();



  navLinks.forEach((link) => {
    link.addEventListener('click', event => {
      const sectionContainer = document.querySelector(`.${link.dataset.section}`);
      resetSections();
      sectionContainer.classList.toggle('hidden');
    });
  });
})();