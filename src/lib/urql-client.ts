import { Client, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url:
    import.meta.env.VITE_GITHUB_GRAPHQL_URL || "https://api.github.com/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = sessionStorage.getItem("github_token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  suspense: true,
});
