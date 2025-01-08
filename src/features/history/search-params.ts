import { HISTORY_PERIODS } from './definitions';
import { createSearchParamsCache, parseAsStringLiteral } from 'nuqs/server';

/**
 * スターの履歴を取得する際のクエリパラメータ
 */
export const starHistoryParser = {
  period: parseAsStringLiteral(HISTORY_PERIODS).withDefault('1Y'),
};

export const starHistoryQsCache = createSearchParamsCache(starHistoryParser);
