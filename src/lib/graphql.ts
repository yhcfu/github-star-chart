import type { introspection } from '@/graphql-env.d.ts';
import { initGraphQLTada } from 'gql.tada';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    DateTime: string;
    URI: string;
  };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';
