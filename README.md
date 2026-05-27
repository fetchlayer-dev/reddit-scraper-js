# Reddit Scraper & API Client for JavaScript / TypeScript

[![npm](https://img.shields.io/npm/v/@fetchlayer/reddit)](https://www.npmjs.com/package/@fetchlayer/reddit)
[![license](https://img.shields.io/npm/l/@fetchlayer/reddit)](https://github.com/fetchlayer/reddit-scraper-js/blob/main/LICENSE)
[![types](https://img.shields.io/npm/types/@fetchlayer/reddit)](https://www.npmjs.com/package/@fetchlayer/reddit)

The official JavaScript & TypeScript SDK for the [FetchLayer](https://fetchlayer.dev) Reddit API.

Search posts. Scrape comments. Pull subreddit data. Get user profiles. All as clean JSON from a single API — no scraping infrastructure, no proxies, no HTML parsing.

> **Open-source SDK, hosted API.** This package is MIT-licensed. The API requires a free [FetchLayer API key](https://fetchlayer.dev/signin) — no subscriptions, no contracts, no lock-in. Pay only for what you use.

---

## Install

```bash
npm install @fetchlayer/reddit
```

```bash
pnpm add @fetchlayer/reddit
```

```bash
yarn add @fetchlayer/reddit
```

## Get your API key

1. Go to [fetchlayer.dev](https://fetchlayer.dev/signin)
2. Sign in with your email
3. Copy your API key from the dashboard

That's it. No credit card. No trial expiration. You get free requests to start, then pay-as-you-go at $1.99 per 1,000 requests when you need more.

## Quick start

```ts
import { FetchLayerReddit } from "@fetchlayer/reddit";

const reddit = new FetchLayerReddit({
  apiKey: process.env.FETCHLAYER_API_KEY!,
});

// Search Reddit for posts about any topic
const results = await reddit.searchPosts({
  query: "best CRM tools",
  sort: "top",
  time: "month",
  limit: 10,
});

console.log(results);
```

**That's 4 lines to get structured Reddit data.** No OAuth, no rate-limit wrestling, no broken scrapers.

---

## Why use this instead of scraping Reddit yourself

| Problem | FetchLayer |
| --- | --- |
| Reddit blocks your IP | We handle rotation and resilience |
| HTML structure changes break your parser | You get stable JSON |
| Reddit API has strict OAuth + rate limits | Simple Bearer token, no rate limits |
| Maintaining scraping infra is a full-time job | `npm install` and done |
| You need comments, users, AND search | 13 endpoints, one SDK |

---

## All methods

```ts
const reddit = new FetchLayerReddit({ apiKey });
```

| Method | What it does |
| --- | --- |
| `reddit.searchPosts(params)` | Search Reddit posts by keyword |
| `reddit.getPost(params)` | Get a post with its full comment tree |
| `reddit.getCommentPermalink(params)` | Get a specific comment thread |
| `reddit.getCommunityPosts(params)` | List posts from any subreddit |
| `reddit.getCommunityDetails(params)` | Get subreddit metadata and stats |
| `reddit.getUserProfile(params)` | Get a Reddit user's profile |
| `reddit.getUserPosts(params)` | List all posts by a user |
| `reddit.getUserComments(params)` | List all comments by a user |
| `reddit.searchCommunities(params)` | Find subreddits by keyword |
| `reddit.searchUsers(params)` | Find Reddit users by name |
| `reddit.getPopularPosts(params)` | Get what's trending on Reddit |
| `reddit.getLeaderboard(params)` | Get top communities by activity |
| `reddit.resolveUrlType(params)` | Detect what a Reddit URL points to |

---

## Examples

### Search posts across Reddit

```ts
const posts = await reddit.searchPosts({
  query: "side project ideas",
  subreddit: "startups", // optional — omit to search all of Reddit
  sort: "relevance",
  time: "week",
  limit: 25,
});
```

### Get a full post with comments

```ts
const thread = await reddit.getPost({
  url: "https://www.reddit.com/r/webdev/comments/abc123/my_post/",
  commentLimit: 100,
  commentDepth: 4,
});
```

### Browse a subreddit

```ts
const hot = await reddit.getCommunityPosts({
  subreddit: "javascript",
  sort: "hot",
  limit: 25,
});
```

### Look up a user

```ts
const profile = await reddit.getUserProfile({ username: "spez" });
const posts = await reddit.getUserPosts({ username: "spez", limit: 10 });
const comments = await reddit.getUserComments({ username: "spez", limit: 10 });
```

### Discover trending content

```ts
const popular = await reddit.getPopularPosts({ time: "day", limit: 10 });
const topCommunities = await reddit.getLeaderboard({ limit: 10 });
```

---

## Error handling

```ts
import { FetchLayerReddit, FetchLayerError } from "@fetchlayer/reddit";

try {
  const posts = await reddit.searchPosts({ query: "test" });
} catch (err) {
  if (err instanceof FetchLayerError) {
    console.error(err.status); // 401, 429, etc.
    console.error(err.message); // Human-readable error from the API
  }
}
```

---

## Configuration

```ts
const reddit = new FetchLayerReddit({
  apiKey: "your-key",     // Required
  baseUrl: "...",         // Default: https://fetchlayer.dev/api/reddit
  timeoutMs: 30000,      // Default: 30s
  fetch: customFetch,    // Default: global fetch (Node 18+)
});
```

---

## What this package is

- **Zero dependencies** — uses native `fetch`, nothing else
- **Dual build** — ESM + CommonJS, works everywhere
- **Fully typed** — TypeScript declarations included
- **Tiny** — under 6 KB bundled
- **Open source** — MIT license, contributions welcome

## How it works

You call FetchLayer → FetchLayer returns structured Reddit data as JSON → you use it however you want.

No Reddit account needed. No OAuth setup. No scraping infrastructure on your end.

---

## Pricing

| | |
| --- | --- |
| **Free tier** | Included with every account — start building immediately |
| **Pay-as-you-go** | $1.99 per 1,000 requests. Credits never expire. |
| **Subscriptions** | Available for heavy use — predictable pricing at scale |
| **Rate limits** | None |

No credit card required to start. No monthly commitment. No overages. [Get your API key →](https://fetchlayer.dev/signin)

---

## Use cases

- **Market research** — find what people say about your product or competitors on Reddit
- **Lead generation** — discover posts where people ask for solutions you offer
- **Content research** — find trending topics and discussions in your niche
- **Sentiment analysis** — pull comments and run NLP on real user opinions
- **Competitive intelligence** — monitor mentions of any brand or product
- **AI agents** — give your LLM real-time Reddit context via FetchLayer's [MCP server](https://fetchlayer.dev/reddit-scraper)

---

## Links

| | |
| --- | --- |
| **Get API key** | [fetchlayer.dev/signin](https://fetchlayer.dev/signin) |
| **Product page** | [fetchlayer.dev/reddit-scraper](https://fetchlayer.dev/reddit-scraper) |
| **Homepage** | [fetchlayer.dev](https://fetchlayer.dev) |
| **npm** | [@fetchlayer/reddit](https://www.npmjs.com/package/@fetchlayer/reddit) |
| **Issues** | [GitHub Issues](https://github.com/fetchlayer/reddit-scraper-js/issues) |

---

## License

MIT — see [LICENSE](LICENSE).
