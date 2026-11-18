// VoctraMind SSL — simple progress tracker

const links = [...document.querySelectorAll('.map-item')];

const sections = links
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);


/* ---------------------------------------------------------
   Active topic
   --------------------------------------------------------- */

function updateTracker() {

  if (!links.length || !sections.length) return;

  const probe = window.innerHeight * 0.30;

  let current = 0;

  sections.forEach((section, index) => {

    if (section.getBoundingClientRect().top <= probe) {
      current = index;
    }

  });


  links.forEach((link, index) => {

    link.classList.toggle(
      'active',
      index === current
    );

    link.classList.toggle(
      'done',
      index < current
    );

  });
}


/* ---------------------------------------------------------
   Topic navigation
   --------------------------------------------------------- */

links.forEach(link => {

  link.addEventListener('click', event => {

    const target =
      document.querySelector(
        link.getAttribute('href')
      );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  });

});


/* ---------------------------------------------------------
   Events
   --------------------------------------------------------- */

window.addEventListener(
  'scroll',
  updateTracker,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateTracker
);

window.addEventListener(
  'load',
  updateTracker
);


/* Initial state */

updateTracker();
