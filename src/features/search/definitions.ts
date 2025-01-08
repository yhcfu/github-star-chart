/**
 * リポジトリー検索の取得件数
 */
export const SEARCH_REPOSITORY_FIRST = 24;

export const SEARCH_SORTS = [
  'best-match',
  'stars-desc',
  'stars-asc',
  'forks-desc',
  'forks-asc',
  'updated-desc',
  'updated-asc',
] as const;

export type SearchSort = (typeof SEARCH_SORTS)[number];
