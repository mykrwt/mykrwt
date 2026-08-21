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
  if (nav) nav.classList.toggle('scrolled', scrolled > 40);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = height > 0 ? (scrolled / height) * 100 + '%' : '0%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');

function setMenuOpen(open) {
  if (!toggle || !links) return;
  links.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  overlay?.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
}

if (toggle && links) {
  toggle.addEventListener('click', () => setMenuOpen(!links.classList.contains('open')));
}
overlay?.addEventListener('click', () => setMenuOpen(false));
if (links) {
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenuOpen(false)));
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 680) setMenuOpen(false);
});

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

// ============================================================
//  Contribution activity (home page)
//  Prefer live GitHub data so the graph isn't a solid fake wall.
// ============================================================

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function levelFromCount(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function renderGithubHeatmap(counts, total, username, levels) {
  const heatmap = document.getElementById('githubHeatmap');
  const totalEl = document.getElementById('githubTotal');
  if (!heatmap) return;

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  // GitHub's calendar starts on Sunday of the week that contains ~1 year ago.
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const fragment = document.createDocumentFragment();
  let index = 0;
  for (const date = new Date(start); date <= today; date.setDate(date.getDate() + 1)) {
    const key = isoDate(date);
    const count = Number(counts[key] || 0);
    const level = levels && levels[key] != null
      ? Math.max(0, Math.min(4, Number(levels[key])))
      : levelFromCount(count);
    const cell = document.createElement('span');
    cell.className = `heat-cell heat-cell--pop level-${level}`;
    cell.title = `${count} contribution${count === 1 ? '' : 's'} on ${key}`;
    cell.setAttribute('aria-label', cell.title);
    cell.style.animationDelay = `${Math.min(index, 80) * 8}ms`;
    fragment.appendChild(cell);
    index += 1;
  }
  heatmap.replaceChildren(fragment);

  if (totalEl) {
    const label = `${Number(total || 0).toLocaleString()} contributions in the last year`;
    totalEl.textContent = label;
    totalEl.title = username ? `Public contributions by ${username}` : label;
  }
}

async function loadGithubHeatmap() {
  const heatmap = document.getElementById('githubHeatmap');
  if (!heatmap) return;

  try {
    const response = await fetch('/api/github-contributions');
    if (!response.ok) throw new Error('heatmap unavailable');
    const data = await response.json();
    const counts = data.counts || {};
    if (!Object.keys(counts).length) throw new Error('empty heatmap');
    renderGithubHeatmap(counts, data.total, data.username, data.levels);
  } catch {
    renderGithubHeatmap({}, 0, 'mykrwt', {});
    const totalEl = document.getElementById('githubTotal');
    if (totalEl) totalEl.textContent = 'GitHub activity unavailable';
  }
}

loadGithubHeatmap();

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

// ============================================================
//  "Things I work with" — animated tech-stack marquee
// ============================================================
function buildTechMarquee() {
  const tech = [
    ['HTML5', 'html5'], ['CSS3', 'css3'], ['JavaScript', 'javascript'],
    ['TypeScript', 'typescript'], ['React', 'react'], ['Next.js', 'nextdotjs'],
    ['Vue', 'vuedotjs'], ['Svelte', 'svelte'], ['Node.js', 'nodedotjs'],
    ['Express', 'express'], ['GraphQL', 'graphql'], ['PostgreSQL', 'postgresql'],
    ['MongoDB', 'mongodb'], ['Prisma', 'prisma'], ['Redis', 'redis'],
    ['Tailwind CSS', 'tailwindcss'], ['Sass', 'sass'], ['Vite', 'vite'],
    ['Webpack', 'webpack'], ['Jest', 'jest'], ['Git', 'git'], ['GitHub', 'github'],
    ['Docker', 'docker'], ['Figma', 'figma'], ['Vercel', 'vercel'],
    ['Cloudflare', 'cloudflare'], ['pnpm', 'pnpm'],
  ];
  const renderItem = ([name, slug]) => `
    <div class="tech-item">
      <img src="https://cdn.simpleicons.org/${slug}/e8e8e8" alt="" loading="lazy" width="30" height="30" onerror="this.src='https://cdn.simpleicons.org/${slug}'; this.onerror=null;" />
      <span>${name}</span>
    </div>`;
  // Duplicate the set inside each track so the scroll loops seamlessly.
  const inner = tech.map(renderItem).join('');
  ['techTrack1', 'techTrack2'].forEach((id) => {
    const track = document.getElementById(id);
    if (track) track.innerHTML = inner + inner;
  });
}
buildTechMarquee();
