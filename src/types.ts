export type RedditEndpoint =
  | 'search'
  | 'post'
  | 'comment-permalink'
  | 'community-posts'
  | 'community-details'
  | 'user-profile'
  | 'user-posts'
  | 'user-comments'
  | 'search-communities'
  | 'search-users'
  | 'popular'
  | 'leaderboard'
  | 'resolve-url-type';

export type SearchSort = 'relevance' | 'hot' | 'new' | 'top' | 'comments';
export type TimeFilter = 'all' | 'year' | 'month' | 'week' | 'day' | 'hour';
export type FeedSort = 'hot' | 'new' | 'top' | 'rising';
export type UserSort = 'new' | 'hot' | 'top' | 'controversial';

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export interface FetchLayerClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
  userAgent?: string;
  timeoutMs?: number;
}

export interface RequestOptions {
  signal?: AbortSignal;
}

export interface SearchPostsParams {
  query: string;
  subreddit?: string;
  sort?: SearchSort;
  time?: TimeFilter;
  limit?: number;
}

export interface GetPostParams {
  url: string;
  commentLimit?: number;
  commentDepth?: number;
}

export interface GetCommentPermalinkParams {
  url: string;
  context?: number;
}

export interface CommunityDetailsParams {
  subreddit: string;
}

export interface CommunityPostsParams {
  subreddit: string;
  sort?: FeedSort;
  time?: TimeFilter;
  limit?: number;
}

export interface UserProfileParams {
  username: string;
}

export interface UserPostsParams {
  username: string;
  sort?: UserSort;
  limit?: number;
}

export interface UserCommentsParams {
  username: string;
  sort?: UserSort;
  limit?: number;
}

export interface SearchCommunitiesParams {
  query: string;
  limit?: number;
}

export interface SearchUsersParams {
  query: string;
  limit?: number;
}

export interface PopularPostsParams {
  limit?: number;
  time?: TimeFilter;
}

export interface LeaderboardParams {
  limit?: number;
}

export interface ResolveUrlTypeParams {
  url: string;
}
