import { FetchLayerReddit } from '../src';

const client = new FetchLayerReddit({
  apiKey: process.env.FETCHLAYER_API_KEY ?? '',
});

const result = await client.getPost({
  url: 'https://www.reddit.com/r/programming/comments/1abcxyz/example_post/',
  commentLimit: 100,
  commentDepth: 4,
});

console.log(JSON.stringify(result, null, 2));
