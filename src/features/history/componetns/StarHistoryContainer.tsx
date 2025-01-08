import { starHistoryQsCache } from '../search-params';
import { calculateDailyStarCounts } from '../utils';
import { GitHubStarChart } from './GitHubStarChart';
import {
  fetchAllStarHistoryByPeriod,
  fetchRepoInfo,
} from '@/features/history/api/query';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

interface StarHistoryContainerProps {
  owner: string;
  name: string;
}

export async function StarHistoryContainer({
  owner,
  name,
}: StarHistoryContainerProps) {
  const { period } = starHistoryQsCache.all();
  const { repository } = await fetchRepoInfo({ owner, name });
  if (!repository) {
    return notFound();
  }

  const starHistories = await fetchAllStarHistoryByPeriod(
    { owner, name },
    period,
  );

  // 日付ごとに累計スター数を集計する
  const latestStarCount = repository.stargazerCount;
  const dailyStarCounts = calculateDailyStarCounts(
    latestStarCount,
    starHistories,
    period,
  );

  return (
    <Fragment key={period}>
      <GitHubStarChart starHistories={dailyStarCounts} />
    </Fragment>
  );
}
