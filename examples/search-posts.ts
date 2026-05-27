import { FetchLayerReddit } from '../src';

const client = new FetchLayerReddit({
  apiKey: process.env.FETCHLAYER_API_KEY ?? '',
});

const results = await client.searchPosts({
  query: 'best crm tools',
  subreddit: 'sales',
  sort: 'top',
  time: 'month',
  limit: 10,
});

console.log(JSON.stringify(results, null, 2));
