import { SEARCH_REPOSITORY_FIRST } from '../definitions';
import { RepositorySearchResults } from './RepositorySearchResults';
import { REPOSITORY_LIST_FRAGMENT } from './fragment';
import {
  buildSearchQuery,
  searchParamsCache,
} from '@/features/search/search-params';
import { type VariablesOf, graphql } from '@/lib/graphql';
import { getServerClient } from '@/lib/urql';
import { Fragment, cache } from 'react';

const SEARCH_REPOSITORYIES_QUERY = graphql(
  `
    query SearchRepositories($query: String!, $after: String) {
      search(query: $query, type: REPOSITORY, first: ${SEARCH_REPOSITORY_FIRST}, after: $after) {
        ...RepositoryList
      }
    }
  `,
  [REPOSITORY_LIST_FRAGMENT],
);

const searchRepositories = cache(
  async (variables: VariablesOf<typeof SEARCH_REPOSITORYIES_QUERY>) => {
    const client = await getServerClient();
    const { data, error } = await client.query(
      SEARCH_REPOSITORYIES_QUERY,
      variables,
      { cache: 'force-cache', next: { revalidate: 3600 /** 1日 */ } },
    );
    if (error) {
      throw error;
    }
    return data;
  },
);

export async function RepositorySearchContainer() {
  const { q, sort, starsLimit } = searchParamsCache.all();

  if (!q) {
    return (
      <div className="prose pt-8 dark:prose-invert">
        <p>検索してみましょう！</p>
        <p className="text-sm text-muted-foreground">
          GitHub のリポジトリ検索で使える Search 構文については
          <a
            href="https://docs.github.com/ja/search-github/searching-on-github/searching-for-repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            こちら
          </a>
          をご覧ください。
        </p>
      </div>
    );
  }

  const query = buildSearchQuery(q, sort, starsLimit);
  const { search } = await searchRepositories({ query });

  return (
    <Fragment key={query}>
      <RepositorySearchResults searchResult={search} />
    </Fragment>
  );
}
