// ============================================================
//  Portfolio interactions
// ============================================================

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Nav background on scroll + scroll progress bar
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

function onScroll() {
  const scrolled = window.scrollY;
  nav.classList.toggle('scrolled', scrolled > 40);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = height > 0 ? (scrolled / height) * 100 + '%' : '0%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
  })
);

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Active nav link based on section in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.getAttribute('href') === '#' + id)
        );
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((s) => spyObserver.observe(s));

// Newsletter form (blog page only)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('newsletterNote');
    newsletterForm.reset();
    if (note) note.hidden = false;
  });
}
