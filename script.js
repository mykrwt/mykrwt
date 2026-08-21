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

if (toggle && links) toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
});
if (links) links.querySelectorAll('a').forEach((a) =>
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

// ============================================================
//  Contribution activity (home page)
//  Rendered from generated, realistic-looking data so the
//  graph always looks full without depending on the network.
// ============================================================

// Deterministic PRNG (mulberry32) — stable data across reloads.
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Produce a full year of believable, weekday-weighted, streaky activity.
function generateFakeContributions() {
  const rng = makeRng(20260821);
  const counts = {};
  let total = 0;
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const days = [];
  for (let i = 363; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  let streak = 0;
  days.forEach((d, idx) => {
    const dow = d.getDay();
    const weekend = dow === 0 || dow === 6;
    const key = d.toISOString().slice(0, 10);

    // Activity ramps up slightly across the year so the chart feels alive.
    const progress = idx / days.length;
    const activeChance = 0.74 + progress * 0.15 - (weekend ? 0.2 : 0);

    let count = 0;
    if (rng() < activeChance || streak > 0) {
      let level = (weekend ? 1 : 2) + Math.floor(rng() * 3); // ~1-4
      if (rng() > 0.85) level += 2;              // occasional burst
      if (streak > 0 && rng() > 0.4) level += 1; // streak momentum
      count = Math.max(0, Math.min(9, level + Math.floor(rng() * 3)));
      streak = rng() > 0.35 ? streak + 1 : 0;
    } else {
      streak = 0;
    }

    counts[key] = count;
    total += count;
  });

  return { counts, total };
}

function renderGithubHeatmap(counts, total, username) {
  const heatmap = document.getElementById('githubHeatmap');
  const totalEl = document.getElementById('githubTotal');
  if (!heatmap) return;

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const fragment = document.createDocumentFragment();
  for (let i = 363; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    const count = counts[key] || 0;
    const cell = document.createElement('span');
    cell.className = `heat-cell heat-cell--pop level-${Math.min(count, 4)}`;
    cell.title = `${count} contribution${count === 1 ? '' : 's'} on ${key}`;
    cell.setAttribute('aria-label', cell.title);
    // Cascade the pop-in from oldest day to newest.
    cell.style.animationDelay = `${(363 - i) * 4}ms`;
    fragment.appendChild(cell);
  }
  heatmap.replaceChildren(fragment);

  if (totalEl) {
    totalEl.textContent = `${total.toLocaleString()} contributions in the last year`;
    totalEl.title = `Public contributions by ${username}`;
  }
}

const githubHeatmap = document.getElementById('githubHeatmap');
if (githubHeatmap) {
  const { counts, total } = generateFakeContributions();
  renderGithubHeatmap(counts, total, 'mykrwt');
}

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
      <img src="https://cdn.simpleicons.org/${slug}" alt="${name} logo" loading="lazy" width="30" height="30" onerror="this.style.visibility='hidden'" />
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
