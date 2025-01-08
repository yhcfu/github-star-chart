import { graphql } from '@/lib/graphql';

// FIXME: フラグメントをコロケーションさせようと "use client"; なコンポーネントに記載するとエラーとなる
// そのため、フラグメントを定義するファイルを分けて記載する

export const REPOSITORY_ITEM_FRAGMENT = graphql(`
  fragment RepositoryItem on Repository {
    id
    nameWithOwner
    url
    owner {
      avatarUrl
    }
    description
    stargazerCount
    forkCount
    updatedAt
    primaryLanguage {
      name
      color
    }
  }
`);

export const REPOSITORY_LIST_FRAGMENT = graphql(
  `
    fragment RepositoryList on SearchResultItemConnection {
      edges {
        cursor
        node {
          ... on Repository {
            id
            __typename
          }
          ...RepositoryItem
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  `,
  [REPOSITORY_ITEM_FRAGMENT],
);
