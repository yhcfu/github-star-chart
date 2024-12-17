import { graphql, readFragment } from "@/lib/graphql";
import { useQueryStateDebounced } from "@/lib/nuqs";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useQuery } from "urql";

import { Input } from "@/components/ui/input";

const RepositoryFragment = graphql(`
  fragment RepositoryFragment on Repository {
    __typename
    name
    stargazerCount
    forkCount
    primaryLanguage {
      name
    }
    url
  }
`);

// リポジトリ検索
const SearchRepositoriesQuery = graphql(
  `
    query SearchRepositories($query: String!, $first: Int!) {
      search(query: $query, type: REPOSITORY, first: $first) {
        edges {
          cursor
          node {
            ...RepositoryFragment
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `,
  [RepositoryFragment],
);

export const RepositorySearch = () => {
  const [query, setQuery] = useQueryStateDebounced(
    "q",
    parseAsString.withDefault("graphql"),
  );

  const [first, setFirst] = useState(10);

  const [{ data }] = useQuery({
    query: SearchRepositoriesQuery,
    variables: { query, first },
  });

  const edges = data?.search.edges?.filter((x) => !!x) ?? [];

  return (
    <div>
      <Input
        type="text"
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {edges.map((edge) => {
          const node = readFragment(RepositoryFragment, edge.node);
          if (node?.__typename === "Repository") {
            return (
              <li key={edge.cursor}>
                <a href={node.url as string}>{node.name}</a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
