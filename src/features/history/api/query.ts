import { REPO_INFO_ITEM_FRAGMENT } from '../componetns/RepoInfoContainer';
import { STAR_HISTORY_HEADER_FRAGMENT } from '../componetns/StarHistoryHeader';
import type { HistoryPeriod } from '../definitions';
import { getStarredAtsFromEdges, getStartDate } from '../utils';
import { type VariablesOf, graphql } from '@/lib/graphql';
import { getServerClient, isNotFoundError } from '@/lib/urql';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const REPO_INFO_QUERY = graphql(
  `
    query getRepoInfo($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        nameWithOwner
        stargazerCount
        forkCount
        ...RepoInfoItem
        ...StarHistoryHeader
      }
    }
  `,
  [REPO_INFO_ITEM_FRAGMENT, STAR_HISTORY_HEADER_FRAGMENT],
);

/**
 * リポジトリー情報を取得する
 */
export const fetchRepoInfo = cache(
  async (variables: VariablesOf<typeof REPO_INFO_QUERY>) => {
    const client = await getServerClient();
    const { data, error } = await client.query(REPO_INFO_QUERY, variables, {
      cache: 'force-cache',
      next: { revalidate: 60 /** 60秒 */ },
    });

    if (isNotFoundError(error)) {
      notFound();
    }
    if (error) {
      throw error;
    }
    return data;
  },
);

// --------------------------------------------------

const MAX_REQUESTS = 200; // 最大リクエスト回数を制限

// FIXME: GitHub の GraphQL API は cursor ベースかつ100件までしか取得できないため、履歴が多いと気が遠くなるほど時間がかかる・・・。
const STAR_HISTORY_QUERY = graphql(`
  query StarHistory($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      stargazers(
        first: 100
        after: $cursor
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        edges {
          starredAt
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`);

/**
 * スターの履歴を取得する
 */
export const fetchStarHistory = cache(
  async (variables: VariablesOf<typeof STAR_HISTORY_QUERY>) => {
    const client = await getServerClient();
    const { data, error } = await client.query(STAR_HISTORY_QUERY, variables, {
      cache: 'force-cache',
      next: { revalidate: 3600 /** 1日 */ },
    });
    if (error) {
      throw error;
    }
    return data;
  },
);

/**
 * 指定した期間のスターの履歴をすべて取得する（降順）
 */
export const fetchAllStarHistoryByPeriod = cache(
  async (
    variables: VariablesOf<typeof STAR_HISTORY_QUERY>,
    period: HistoryPeriod | '1W',
  ): Promise<string[]> => {
    // 履歴の取得開始日を決める
    const startDate = getStartDate(period);
    const { repository } = await fetchStarHistory(variables);
    let starredAts = getStarredAtsFromEdges(repository?.stargazers?.edges);
    let hasNextPage = repository?.stargazers.pageInfo.hasNextPage;
    let endCursor = repository?.stargazers.pageInfo.endCursor;
    let reqCount = 1;

    // この段階で取得したスター履歴が対象範囲の開始日より古い場合は終了
    if (starredAts[starredAts.length - 1] < startDate.toISOString()) {
      // 100件単位で取得しているので、開始日より古いデータが含まれていたら除外する
      starredAts = starredAts.filter(
        (starredAts) => starredAts >= startDate.toISOString(),
      );
      return starredAts;
    }

    // ループでスター履歴を取得し続ける
    // NOTE: 1000回以上リクエストを送信しないように制限を設ける
    while (
      hasNextPage &&
      reqCount < MAX_REQUESTS &&
      starredAts[starredAts.length - 1] >= startDate.toISOString()
    ) {
      const { repository: nextRepo } = await fetchStarHistory({
        ...variables,
        cursor: endCursor,
      });

      const nextStarredAts = getStarredAtsFromEdges(
        nextRepo?.stargazers?.edges,
      );
      // スター履歴を追加
      starredAts = [...starredAts, ...nextStarredAts];
      hasNextPage = nextRepo?.stargazers.pageInfo.hasNextPage;
      endCursor = nextRepo?.stargazers.pageInfo.endCursor;
      reqCount++;
    }

    // 100件単位で取得しているので、開始日より古いデータが含まれていたら除外する
    const filterdNextStarredAts = starredAts.filter(
      (starredAts) => starredAts >= startDate.toISOString(),
    );

    return filterdNextStarredAts;
  },
);
