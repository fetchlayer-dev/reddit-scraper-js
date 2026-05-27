import { FetchLayerReddit } from '../src';

const client = new FetchLayerReddit({
  apiKey: process.env.FETCHLAYER_API_KEY ?? '',
});

const [communities, users, popular] = await Promise.all([
  client.searchCommunities({ query: 'saas', limit: 5 }),
  client.searchUsers({ query: 'alex', limit: 5 }),
  client.getPopularPosts({ limit: 5, time: 'day' }),
]);

console.log({ communities, users, popular });
