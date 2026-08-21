const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 8000);
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'data', 'posts.json');
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = String(process.env.TELEGRAM_ADMIN_CHAT_ID || '');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };

function readPosts() { try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return []; } }
function writePosts(posts) { fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true }); fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2) + '\n'); }
function json(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); }
function body(req) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', c => raw += c); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Invalid JSON')); } }); }); }
function slug(value) { return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80); }
function publicPosts() { return readPosts().filter(p => p.status === 'published').sort((a, b) => b.date.localeCompare(a.date)); }
function sendTelegram(chatId, text) {
  if (!BOT_TOKEN) return Promise.resolve();
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text }) }).catch(() => {});
}
function telegramCommand(text, chatId) {
  if (!ADMIN_CHAT_ID || String(chatId) !== ADMIN_CHAT_ID) return sendTelegram(chatId, 'This bot is private.');
  const [command, ...rest] = String(text || '').trim().split(/\s+/);
  const posts = readPosts();
  if (command === '/start' || command === '/help') return sendTelegram(chatId, 'Blog manager\n/new Title | Excerpt | Content | tag1,tag2\n/publish slug\n/draft slug\n/delete slug\n/posts');
  if (command === '/posts') return sendTelegram(chatId, posts.map(p => `${p.status === 'published' ? 'LIVE' : 'DRAFT'}  ${p.id}`).join('\n') || 'No posts yet.');
  if (command === '/new') {
    const parts = rest.join(' ').split('|').map(s => s.trim());
    if (parts.length < 3) return sendTelegram(chatId, 'Format: /new Title | Excerpt | Content | tag1,tag2');
    const [title, excerpt, content, tagText = 'Notes'] = parts;
    const post = { id: slug(title) || crypto.randomUUID(), title, excerpt, content, tags: tagText.split(',').map(s => s.trim()).filter(Boolean), date: new Date().toISOString().slice(0, 10), minutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 180)), status: 'draft', featured: false };
    posts.push(post); writePosts(posts); return sendTelegram(chatId, `Saved draft: ${post.id}\nUse /publish ${post.id} when ready.`);
  }
  const target = posts.find(p => p.id === rest[0]);
  if (!target && ['/publish', '/draft', '/delete'].includes(command)) return sendTelegram(chatId, 'Post not found. Use /posts to see slugs.');
  if (command === '/publish') { target.status = 'published'; writePosts(posts); return sendTelegram(chatId, `Published: ${target.title}`); }
  if (command === '/draft') { target.status = 'draft'; writePosts(posts); return sendTelegram(chatId, `Moved to drafts: ${target.title}`); }
  if (command === '/delete') { writePosts(posts.filter(p => p !== target)); return sendTelegram(chatId, `Deleted: ${target.title}`); }
  return sendTelegram(chatId, 'Unknown command. Use /help.');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/posts' && req.method === 'GET') return json(res, 200, publicPosts());
  if (url.pathname === '/api/heatmap' && req.method === 'GET') {
    const posts = publicPosts(); const counts = {}; posts.forEach(p => { counts[p.date] = (counts[p.date] || 0) + 1; });
    return json(res, 200, { counts, total: posts.length });
  }
  if (url.pathname === '/api/github-contributions' && req.method === 'GET') {
    const username = process.env.GITHUB_USERNAME || 'mykrwt';
    try {
      const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions` , {
        headers: { 'user-agent': 'mykrwt-portfolio' }
      });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const html = await response.text();
      const counts = {};
      const tooltipCounts = {};
      // GitHub exposes each contribution day as a table cell. Keep the parsing
      // on the server so the browser does not need to make a cross-origin request.
      html.replace(/<tool-tip[^>]*for="([^"]+)"[^>]*>(\d+) contribution/g, (_, id, count) => {
        tooltipCounts[id] = Number(count);
        return _;
      });
      html.replace(/<td\b([^>]*data-date="([^"]+)"[^>]*)><\/td>/g, (_, cell, date) => {
        const idMatch = cell.match(/id="([^"]+)"/);
        const levelMatch = cell.match(/data-level="(\d+)"/);
        counts[date] = Number((idMatch && tooltipCounts[idMatch[1]]) || (levelMatch && levelMatch[1]) || 0);
        return _;
      });
      return json(res, 200, { counts, total: Object.values(counts).reduce((sum, count) => sum + count, 0), username });
    } catch (error) {
      return json(res, 502, { error: 'GitHub contributions are unavailable.', username });
    }
  }
  if (url.pathname === '/telegram/webhook' && req.method === 'POST') { try { const update = await body(req); if (update.message) telegramCommand(update.message.text, update.message.chat.id); json(res, 200, { ok: true }); } catch { json(res, 400, { ok: false }); } return; }
  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = path.resolve(ROOT, '.' + requested);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return json(res, 404, { error: 'Not found' });
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res);
});
server.listen(PORT, '0.0.0.0', () => console.log(`mykrwt is running on http://0.0.0.0:${PORT}`));
