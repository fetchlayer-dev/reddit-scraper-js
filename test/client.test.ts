import { describe, expect, it, vi } from 'vitest';
import { FetchLayerError, FetchLayerReddit } from '../src';

describe('FetchLayerReddit', () => {
  it('sends authenticated POST requests to the correct endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ ok: true }),
    });

    const client = new FetchLayerReddit({
      apiKey: 'ss_test_123',
      fetch: fetchMock as unknown as typeof fetch,
    });

    const response = await client.searchPosts({ query: 'best crm', limit: 5 });

    expect(response).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://fetchlayer.dev/api/reddit/search',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer ss_test_123',
          'Content-Type': 'application/json',
          'User-Agent': '@fetchlayer/reddit',
        }),
        body: JSON.stringify({ query: 'best crm', limit: 5 }),
      }),
    );
  });

  it('throws a FetchLayerError with parsed API details', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ error: 'Invalid API key' }),
    });

    const client = new FetchLayerReddit({
      apiKey: 'bad-key',
      fetch: fetchMock as unknown as typeof fetch,
    });

    await expect(client.getPopularPosts()).rejects.toEqual(
      expect.objectContaining<Partial<FetchLayerError>>({
        name: 'FetchLayerError',
        message: 'Invalid API key',
        status: 401,
      }),
    );
  });

  it('supports all public endpoint helpers', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ ok: true }),
    });

    const client = new FetchLayerReddit({
      apiKey: 'ss_test_123',
      fetch: fetchMock as unknown as typeof fetch,
    });

    await client.getPost({ url: 'https://reddit.com/r/test/comments/abc123/example' });
    await client.getCommentPermalink({ url: 'https://reddit.com/r/test/comments/abc123/example/def456', context: 2 });
    await client.getCommunityDetails({ subreddit: 'programming' });
    await client.getCommunityPosts({ subreddit: 'programming', sort: 'top', time: 'week', limit: 10 });
    await client.getUserProfile({ username: 'spez' });
    await client.getUserPosts({ username: 'spez', limit: 10 });
    await client.getUserComments({ username: 'spez', limit: 10 });
    await client.searchCommunities({ query: 'machine learning', limit: 5 });
    await client.searchUsers({ query: 'alex', limit: 5 });
    await client.getPopularPosts({ limit: 10, time: 'day' });
    await client.getLeaderboard({ limit: 10 });
    await client.resolveUrlType({ url: 'https://reddit.com/r/programming/comments/abc123/example' });

    expect(fetchMock).toHaveBeenCalledTimes(12);
  });
});
