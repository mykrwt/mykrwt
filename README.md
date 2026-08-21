# mykrwt portfolio and blog

A responsive vanilla HTML/CSS/JavaScript portfolio with a content system managed from Telegram. The public blog is rendered from `data/posts.json`; no template code needs to change when publishing.

## Run locally

```bash
npm start
# open http://localhost:8000
```

The blog page uses `/api/posts` and `/api/heatmap`. The homepage contribution graph is loaded from `/api/github-contributions` (live public GitHub activity). Use a Node 18+ runtime.

## Telegram blog manager

1. Create a bot with BotFather and copy its token.
2. Find your numeric Telegram chat ID and set `TELEGRAM_ADMIN_CHAT_ID`.
3. Copy `.env.example` to `.env` and export those values in your host environment.
4. Deploy the server, then set the webhook:

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook?url=https://your-domain.com/telegram/webhook"
```

Commands supported by the private bot:

- `/new Title | Excerpt | Full article text | tag1,tag2` creates a draft
- `/publish post-slug` makes a draft public
- `/draft post-slug` unpublishes it
- `/posts` lists post slugs and status
- `/delete post-slug` removes a post
- `/help` shows the command format

Keep `data/posts.json` on persistent storage. The admin chat ID is checked before any write operation, and the bot token must stay in environment variables.
