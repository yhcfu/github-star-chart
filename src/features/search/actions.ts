'use server';

import { REPOSITORY_LIST_FRAGMENT } from './components/fragment';
import { SEARCH_REPOSITORY_FIRST } from './definitions';
import { type VariablesOf, graphql } from '@/lib/graphql';
import { getServerClient } from '@/lib/urql';
import { cache } from 'react';

const LOAD_MORE_REPOSITORYIES_QUERY = graphql(
  `
    query LoadMoreRepositories($query: String!, $after: String) {
      search(query: $query, type: REPOSITORY, first: ${SEARCH_REPOSITORY_FIRST}, after: $after) {
        ...RepositoryList
      }
    }
  `,
  [REPOSITORY_LIST_FRAGMENT],
);

/**
 * 無限スクロール用のリポジトリ検索
 */
export const loadMoreRepositories = cache(
  async (variables: VariablesOf<typeof LOAD_MORE_REPOSITORYIES_QUERY>) => {
    const client = await getServerClient();
    const { data, error } = await client.query(
      LOAD_MORE_REPOSITORYIES_QUERY,
      variables,
      { cache: 'force-cache', next: { revalidate: 60 /** 秒 */ } },
    );
    if (error) {
      throw error;
    }
    return data;
  },
);
