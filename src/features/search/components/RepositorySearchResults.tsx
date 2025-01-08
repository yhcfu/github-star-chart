'use client';

import { RepositoryCard } from './RepositoryCard';
import { SortSelect } from './SortSelect';
import { REPOSITORY_LIST_FRAGMENT } from './fragment';
import { Spinner } from '@/components/ui/spinner';
import { loadMoreRepositories } from '@/features/search/actions';
import {
  buildSearchQuery,
  searchParamsParsers,
} from '@/features/search/search-params';
import { type FragmentOf, readFragment } from '@/lib/graphql';
import { getNodesFromEdges } from '@/lib/urql';
import { unionBy } from 'es-toolkit';
import { useQueryStates } from 'nuqs';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * リポジトリの検索結果を表示します。
 * また、無限スクロールで追加のリポジトリを読み込みます。
 */
export function RepositorySearchResults({
  searchResult,
}: {
  searchResult: FragmentOf<typeof REPOSITORY_LIST_FRAGMENT>;
}) {
  const { ref, inView } = useInView();
  const [isPending, startTransition] = useTransition();
  const [{ q: query, sort, starsLimit }, setQuery] = useQueryStates(
    searchParamsParsers,
    {
      startTransition,
      shallow: false,
    },
  );

  const {
    edges,
    pageInfo: initPageInfo,
    repositoryCount,
  } = readFragment(REPOSITORY_LIST_FRAGMENT, searchResult);

  const initialRepos = getNodesFromEdges(edges).filter(
    (node) => node?.__typename === 'Repository',
  );

  const [repos, setEdges] = useState(initialRepos);
  const [pageInfo, setPageInfo] = useState(initPageInfo);

  // 無限スクロール用の追加フェッチ
  const loadMore = useCallback(async () => {
    // TODO: エラーの考慮
    const { search } = await loadMoreRepositories({
      query: buildSearchQuery(query, sort, starsLimit),
      after: pageInfo.endCursor,
    });
    const { edges: moreEdge, pageInfo: morePageInfo } = readFragment(
      REPOSITORY_LIST_FRAGMENT,
      search,
    );
    const newRepos = getNodesFromEdges(moreEdge).filter(
      (node) => node?.__typename === 'Repository',
    );
    setEdges((pre) => unionBy(pre, newRepos, (repo) => repo.id));
    setPageInfo(morePageInfo);
  }, [query, sort, pageInfo, starsLimit]);

  // 無限スクロールの監視
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-1">
          <p className="text-sm text-muted-foreground">
            {repositoryCount.toLocaleString()} 件の結果
          </p>
          {isPending && <Spinner className="h-4" />}
        </div>
        <SortSelect
          defaultValue={sort}
          onValueChange={(value) =>
            setQuery({
              sort: value,
            })
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {pageInfo.hasNextPage ? (
        <div ref={ref} className="flex h-8 w-full justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex h-8 w-full justify-center">
          <p className="text-muted-foreground">これ以上の結果はありません</p>
        </div>
      )}
    </>
  );
}
