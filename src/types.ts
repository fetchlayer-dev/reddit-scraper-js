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

// ---------------------------------------------------------------------------
// Response types (derived from live API responses)
// ---------------------------------------------------------------------------

/** Common metadata fields present on most responses */
export interface BaseResponse {
  blocked?: boolean;
  blockReason?: string;
  blockedBodyText?: string;
  pageTitle?: string;
  requestedUrl?: string;
  fetchUrl?: string;
  finalUrl?: string;
  responseStatus?: number;
  scrapedAt?: string;
  transport?: string;
}

/** A post item as returned in listing-style responses */
export interface PostItem {
  id?: string;
  fullname?: string;
  subreddit?: string;
  subredditPrefixed?: string;
  author?: string;
  title?: string;
  permalink?: string;
  shortlink?: string;
  url?: string;
  domain?: string;
  createdAt?: string;
  flair?: string | null;
  score?: number;
  scoreText?: string;
  commentCount?: number;
  commentCountText?: string;
  previewText?: string;
  thumbnailUrl?: string | null;
  nsfw?: boolean;
  spoiler?: boolean;
  locked?: boolean;
  stickied?: boolean;
}

/** A comment item as returned in user comment listings */
export interface CommentItem {
  id?: string;
  fullname?: string;
  subreddit?: string;
  subredditPrefixed?: string;
  author?: string;
  parentPostTitle?: string;
  parentPostAuthor?: string;
  parentPostUrl?: string;
  permalink?: string;
  contextUrl?: string;
  fullCommentsUrl?: string;
  createdAt?: string;
  score?: number;
  scoreText?: string;
  replyCount?: number;
  replyCountText?: string;
  bodyText?: string;
  bodyHtml?: string;
  distinguished?: string | null;
  stickied?: boolean;
}

/** A community item as returned in search results */
export interface CommunityItem {
  subreddit?: string;
  subredditPrefixed?: string;
  title?: string;
  descriptionText?: string;
  descriptionHtml?: string;
  url?: string;
  metaText?: string;
  nsfw?: boolean;
}

/** A user item as returned in search results */
export interface UserItem {
  username?: string;
  displayName?: string;
  descriptionText?: string;
  descriptionHtml?: string;
  url?: string;
  metaText?: string;
}

/** Generic listing response (searchPosts, getCommunityPosts, getUserPosts, etc.) */
export interface ListingResponse<TItem = PostItem> extends BaseResponse {
  listingType?: string;
  listingTitle?: string;
  items?: TItem[];
  itemCount?: number;
  nextPageUrl?: string | null;
  prevPageUrl?: string | null;
  pagesRequested?: number;
  pagesScraped?: number;
  query?: string;
  sort?: string;
  time?: string;
  subredditFilter?: string | null;
  resultCountText?: string;
  subreddit?: string;
  subredditPrefixed?: string;
  username?: string;
}

/** Comment within a post thread */
export interface ThreadComment {
  id?: string;
  fullname?: string;
  author?: string;
  createdAt?: string;
  score?: number;
  scoreText?: string;
  bodyText?: string;
  bodyHtml?: string;
  permalink?: string;
  distinguished?: string | null;
  stickied?: boolean;
  replies?: ThreadComment[];
}

/** Response from getPost */
export interface PostDetailResponse extends BaseResponse {
  id?: string;
  fullname?: string;
  subreddit?: string;
  subredditPrefixed?: string;
  author?: string;
  title?: string;
  permalink?: string;
  shortlink?: string;
  url?: string;
  domain?: string;
  createdAt?: string;
  editedAt?: string | null;
  flair?: string | null;
  score?: number;
  scoreText?: string;
  commentCount?: number;
  commentCountText?: string;
  bodyText?: string;
  bodyHtml?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  locked?: boolean;
  stickied?: boolean;
  archived?: boolean;
  media?: JsonValue;
  outboundLinks?: JsonValue;
  comments?: ThreadComment[];
  commentCountFromTree?: number;
  remainingMoreCommentsCount?: number;
  commentPagesRequested?: number;
  commentPagesScraped?: number;
}

/** Response from getCommentPermalink */
export interface CommentPermalinkResponse extends BaseResponse {
  id?: string;
  fullname?: string;
  subreddit?: string;
  subredditPrefixed?: string;
  author?: string;
  parentPostTitle?: string;
  parentPostUrl?: string;
  permalink?: string;
  createdAt?: string;
  score?: number;
  scoreText?: string;
  bodyText?: string;
  bodyHtml?: string;
  replies?: ThreadComment[];
}

/** Response from getCommunityDetails */
export interface CommunityDetailsResponse extends BaseResponse {
  subreddit?: string;
  subredditPrefixed?: string;
  title?: string;
  descriptionText?: string;
  descriptionHtml?: string;
  memberCount?: number;
  memberCountText?: string;
  activeCount?: number;
  activeCountText?: string;
  createdAt?: string;
  nsfw?: boolean;
  iconUrl?: string | null;
  bannerUrl?: string | null;
  url?: string;
}

/** Response from getUserProfile */
export interface UserProfileResponse extends BaseResponse {
  username?: string;
  displayName?: string;
  aboutText?: string;
  aboutHtml?: string;
  postKarma?: number;
  postKarmaText?: string;
  commentKarma?: number;
  commentKarmaText?: string;
  createdAt?: string;
  ageText?: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  trophies?: JsonValue;
  isGold?: boolean;
  url?: string;
}

/** Response from resolveUrlType */
export interface ResolveUrlTypeResponse {
  inputUrl?: string;
  normalizedUrl?: string;
  target?: string;
  targetInput?: string;
  subreddit?: string | null;
  sort?: string | null;
  time?: string | null;
  username?: string | null;
  postId?: string | null;
  commentId?: string | null;
  query?: string | null;
}
