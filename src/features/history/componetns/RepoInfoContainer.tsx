import { fetchAllStarHistoryByPeriod, fetchRepoInfo } from '../api/query';
import { RepoInfoItem } from './RepoInfoItem';
import { formatDate } from '@/features/search/utils';
import { graphql, readFragment } from '@/lib/graphql';
import { Eye, GitFork, Star, TrendingUp } from 'lucide-react';

export const REPO_INFO_ITEM_FRAGMENT = graphql(`
  fragment RepoInfoItem on Repository {
    id
    stargazerCount
    forkCount
    watchers {
      totalCount
    }
    updatedAt
  }
`);

interface RepoInfoContainerProps {
  owner: string;
  name: string;
}

export async function RepoInfoContainer({
  owner,
  name,
}: RepoInfoContainerProps) {
  const [repoInfoRes, starHistoryByWeek] = await Promise.all([
    fetchRepoInfo({ owner, name }),
    fetchAllStarHistoryByPeriod({ owner, name }, '1W'),
  ]);

  const repoInfo = readFragment(
    REPO_INFO_ITEM_FRAGMENT,
    repoInfoRes.repository,
  );

  if (!repoInfo) {
    return null;
  }
  // 週間増加量
  const weeklyGrowth = starHistoryByWeek.length;

  return (
    <div>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RepoInfoItem
          icon={
            <Star
              className={'mb-1 h-6 w-6 text-yellow-400 dark:text-yellow-300'}
            />
          }
          value={repoInfo?.stargazerCount}
          label="スター"
        />
        <RepoInfoItem
          icon={
            <GitFork
              className={'mb-1 h-6 w-6 text-blue-400 dark:text-blue-300'}
            />
          }
          value={repoInfo.forkCount}
          label="フォーク"
        />
        <RepoInfoItem
          icon={
            <Eye
              className={'mb-1 h-6 w-6 text-green-400 dark:text-green-300'}
            />
          }
          value={repoInfo.watchers.totalCount}
          label="ウォッチャー"
        />
        <RepoInfoItem
          isGrowth
          icon={
            <TrendingUp
              className={'mb-1 h-6 w-6 text-red-400 dark:text-red-300'}
            />
          }
          value={weeklyGrowth}
          label="週間増加"
        />
      </div>

      <div className="mt-6 text-right text-sm text-muted-foreground">
        最終更新: {formatDate(repoInfo.updatedAt)}
      </div>
    </div>
  );
}
