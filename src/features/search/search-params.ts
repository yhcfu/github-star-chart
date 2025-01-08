import { SEARCH_SORTS, type SearchSort } from './definitions';
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

/**
 * 検索パラメーター
 */
export const searchParamsParsers = {
  q: parseAsString.withDefault(''),
  sort: parseAsStringLiteral(SEARCH_SORTS).withDefault('best-match'),
  starsLimit: parseAsBoolean.withDefault(true),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);

export const buildSearchQuery = (
  q: string,
  sort: SearchSort,
  starsLimit: boolean,
) => {
  let baseQuery = q;
  if (sort !== 'best-match') {
    baseQuery = `${baseQuery} sort:${sort}`;
  }
  if (starsLimit) {
    baseQuery = `${baseQuery} stars:<=1000`;
  }
  console.log(baseQuery);
  return baseQuery;
};
