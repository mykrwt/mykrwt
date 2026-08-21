const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const meta = (post) => `<div class="post-meta"><span>${escapeHTML(new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))}</span><span>/</span><span>${post.minutes} min read</span></div>`;
const tags = (post) => `<ul class="post-card__tags">${(post.tags || []).map(tag => `<li>${escapeHTML(tag)}</li>`).join('')}</ul>`;
function renderPosts(posts) {
  const featured = posts.find(post => post.featured) || posts[0];
  document.getElementById('postTotal').textContent = posts.length;
  if (featured) document.getElementById('featuredPost').innerHTML = `<article class="post-feature reveal visible"><div class="post-feature__tag">Featured</div><div class="post-feature__body">${meta(featured)}<h2>${escapeHTML(featured.title)}</h2><p>${escapeHTML(featured.excerpt)}</p><span class="post-feature__cta">Read the post</span></div></article>`;
  document.getElementById('postGrid').innerHTML = posts.map(post => `<article class="post-card reveal visible" tabindex="0" role="button" data-post-id="${escapeHTML(post.id)}">${meta(post)}<h3>${escapeHTML(post.title)}</h3><p>${escapeHTML(post.excerpt)}</p>${tags(post)}<span class="post-card__read">Read article</span></article>`).join('');
  document.querySelectorAll('[data-post-id]').forEach(card => { card.addEventListener('click', () => openReader(posts.find(post => post.id === card.dataset.postId))); card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openReader(posts.find(post => post.id === card.dataset.postId)); } }); });
}
function openReader(post) {
  if (!post) return;
  const reader = document.getElementById('postReader');
  document.getElementById('readerContent').innerHTML = `${meta(post)}<h2>${escapeHTML(post.title)}</h2><p class="reader-copy">${escapeHTML(post.content)}</p>${tags(post)}`;
  reader.showModal();
}
function renderHeatmap(counts) {
  const heatmap = document.getElementById('heatmap');
  const today = new Date(); today.setHours(12, 0, 0, 0);
  for (let i = 363; i >= 0; i--) { const date = new Date(today); date.setDate(today.getDate() - i); const key = date.toISOString().slice(0, 10); const cell = document.createElement('span'); cell.className = `heat-cell level-${Math.min(counts[key] || 0, 4)}`; cell.title = `${counts[key] || 0} post${counts[key] === 1 ? '' : 's'} on ${key}`; cell.setAttribute('aria-label', cell.title); heatmap.appendChild(cell); }
}
document.getElementById('closeReader').addEventListener('click', () => document.getElementById('postReader').close());
Promise.all([fetch('/api/posts').then(r => r.json()), fetch('/api/heatmap').then(r => r.json())]).then(([posts, activity]) => { renderPosts(posts); renderHeatmap(activity.counts || {}); }).catch(() => { document.getElementById('featuredPost').innerHTML = '<div class="loading-card">Blog content is unavailable right now.</div>'; });
