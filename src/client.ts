import { FetchLayerError } from './errors';
import type {
  CommentPermalinkResponse,
  CommunityDetailsParams,
  CommunityDetailsResponse,
  CommunityPostsParams,
  CommentItem,
  FetchLayerClientOptions,
  GetCommentPermalinkParams,
  GetPostParams,
  JsonObject,
  LeaderboardParams,
  ListingResponse,
  PopularPostsParams,
  PostDetailResponse,
  RedditEndpoint,
  RequestOptions,
  ResolveUrlTypeParams,
  ResolveUrlTypeResponse,
  SearchCommunitiesParams,
  SearchPostsParams,
  SearchUsersParams,
  CommunityItem,
  UserCommentsParams,
  UserItem,
  UserPostsParams,
  UserProfileParams,
  UserProfileResponse,
} from './types';

const DEFAULT_BASE_URL = 'https://fetchlayer.dev/api/reddit';
const DEFAULT_TIMEOUT_MS = 30_000;

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

function ensureFetch(fetchImpl?: typeof globalThis.fetch): typeof globalThis.fetch {
  const resolved = fetchImpl ?? globalThis.fetch;
  if (!resolved) {
    throw new Error('FetchLayer Reddit SDK requires a global fetch implementation or a custom fetch option.');
  }

  return resolved;
}

function mergeSignals(primary: AbortSignal, secondary?: AbortSignal): AbortSignal {
  if (!secondary) {
    return primary;
  }

  if (secondary.aborted) {
    return secondary;
  }

  const controller = new AbortController();

  const abort = () => controller.abort();
  primary.addEventListener('abort', abort, { once: true });
  secondary.addEventListener('abort', abort, { once: true });

  return controller.signal;
}

function buildMessage(status: number, statusText: string, body: unknown): string {
  if (body && typeof body === 'object' && 'error' in body && typeof body.error === 'string') {
    return body.error;
  }

  if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
    return body.message;
  }

  return `FetchLayer request failed with ${status} ${statusText}`;
}

export class FetchLayerReddit {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly userAgent: string;
  readonly timeoutMs: number;

  private readonly fetchImpl: typeof globalThis.fetch;

  constructor(options: FetchLayerClientOptions) {
    if (!options.apiKey?.trim()) {
      throw new Error('FetchLayer API key is required.');
    }

    this.apiKey = options.apiKey.trim();
    this.baseUrl = normalizeBaseUrl(options.baseUrl ?? DEFAULT_BASE_URL);
    this.fetchImpl = ensureFetch(options.fetch);
    this.userAgent = options.userAgent ?? '@fetchlayer/reddit';
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  async request<TResponse extends object = JsonObject>(
    endpoint: RedditEndpoint,
    body: object = {},
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchImpl(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': this.userAgent,
        },
        body: JSON.stringify(body),
        signal: mergeSignals(controller.signal, options.signal),
      });

      const contentType = response.headers.get('content-type') ?? '';
      const parsedBody = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new FetchLayerError(buildMessage(response.status, response.statusText, parsedBody), {
          status: response.status,
          statusText: response.statusText,
          body: parsedBody,
        });
      }

      if (typeof parsedBody !== 'object' || parsedBody === null || Array.isArray(parsedBody)) {
        return { data: parsedBody } as unknown as TResponse;
      }

      return parsedBody as TResponse;
    } finally {
      clearTimeout(timer);
    }
  }

  searchPosts<TResponse extends object = ListingResponse>(params: SearchPostsParams, options?: RequestOptions) {
    return this.request<TResponse>('search', params, options);
  }

  getPost<TResponse extends object = PostDetailResponse>(params: GetPostParams, options?: RequestOptions) {
    return this.request<TResponse>('post', params, options);
  }

  getCommentPermalink<TResponse extends object = CommentPermalinkResponse>(params: GetCommentPermalinkParams, options?: RequestOptions) {
    return this.request<TResponse>('comment-permalink', params, options);
  }

  getCommunityDetails<TResponse extends object = CommunityDetailsResponse>(params: CommunityDetailsParams, options?: RequestOptions) {
    return this.request<TResponse>('community-details', params, options);
  }

  getCommunityPosts<TResponse extends object = ListingResponse>(params: CommunityPostsParams, options?: RequestOptions) {
    return this.request<TResponse>('community-posts', params, options);
  }

  getUserProfile<TResponse extends object = UserProfileResponse>(params: UserProfileParams, options?: RequestOptions) {
    return this.request<TResponse>('user-profile', params, options);
  }

  getUserPosts<TResponse extends object = ListingResponse>(params: UserPostsParams, options?: RequestOptions) {
    return this.request<TResponse>('user-posts', params, options);
  }

  getUserComments<TResponse extends object = ListingResponse<CommentItem>>(params: UserCommentsParams, options?: RequestOptions) {
    return this.request<TResponse>('user-comments', params, options);
  }

  searchCommunities<TResponse extends object = ListingResponse<CommunityItem>>(params: SearchCommunitiesParams, options?: RequestOptions) {
    return this.request<TResponse>('search-communities', params, options);
  }

  searchUsers<TResponse extends object = ListingResponse<UserItem>>(params: SearchUsersParams, options?: RequestOptions) {
    return this.request<TResponse>('search-users', params, options);
  }

  getPopularPosts<TResponse extends object = ListingResponse>(params: PopularPostsParams = {}, options?: RequestOptions) {
    return this.request<TResponse>('popular', params, options);
  }

  getLeaderboard<TResponse extends object = ListingResponse>(params: LeaderboardParams = {}, options?: RequestOptions) {
    return this.request<TResponse>('leaderboard', params, options);
  }

  resolveUrlType<TResponse extends object = ResolveUrlTypeResponse>(params: ResolveUrlTypeParams, options?: RequestOptions) {
    return this.request<TResponse>('resolve-url-type', params, options);
  }
}

export function createRedditClient(options: FetchLayerClientOptions): FetchLayerReddit {
  return new FetchLayerReddit(options);
}
