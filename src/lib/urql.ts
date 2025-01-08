import { env } from '@/config/env';
import { getSinginToken } from '@/features/auth/actions';
import { retryExchange } from '@urql/exchange-retry';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import {
  type AnyVariables,
  type Client,
  CombinedError,
  type DocumentInput,
  type OperationContext,
  type OperationResult,
  cacheExchange,
  createClient,
  fetchExchange,
} from 'urql/core';

const retryOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: 2,
  retryIf: (err: Error) => {
    if (err instanceof CombinedError) {
      // ネットワークエラーじゃないときはリトライする
      return !!err.networkError;
    }
    return false;
  },
};

const makeClient = () => {
  return createClient({
    url: env.GITHUB_GRAPHQL_URL,
    exchanges: [cacheExchange, retryExchange(retryOptions), fetchExchange],
  });
};

export const getServerClient = cache(async () => {
  const client = makeClient();
  return new CustomClient(client);
});

/**
 * ShopifyFetch を参考にして、Data Cache を有効にした CustomClient。
 *
 * デフォルトでは fetchOptions に cache: 'force-cache' がセットされているため、必要に応じて上書きすること。
 *
 * 参考: https://github.com/vercel/commerce/blob/main/lib/shopify/index.ts#L61
 */
class CustomClient {
  constructor(private client: Client) {}
  async query<Data = unknown, Variables extends AnyVariables = AnyVariables>(
    query: DocumentInput<Data, Variables>,
    variables: Variables,
    fetchOptions?: Partial<RequestInit>,
    context?: Partial<OperationContext>,
  ) {
    const ctx = await getFetchContext(fetchOptions, context);
    const res = await this.client.query(query, variables, ctx).toPromise();
    return handleErrors(res);
  }
  async mutation<Data = unknown, Variables extends AnyVariables = AnyVariables>(
    query: DocumentInput<Data, Variables>,
    variables: Variables,
    context?: Partial<OperationContext>,
  ) {
    const res = await this.client
      .mutation(query, variables, context)
      .toPromise();
    return handleErrors(res);
  }
}

/**
 * fetchOptions と context をマージして返す。
 * また、Cookie からトークンを取得して Authorization ヘッダーにセットする。
 */
async function getFetchContext(
  fetchOptions: Partial<RequestInit> | undefined,
  context: Partial<OperationContext> | undefined,
) {
  const token = await getSinginToken();
  const { headers, ...restFetchOptions } = fetchOptions || {};
  const ctx = {
    ...context,
    fetchOptions: {
      headers: { authorization: token ? `Bearer ${token}` : '', ...headers },
      cache: 'force-cache',
      ...restFetchOptions,
    } satisfies RequestInit,
  };
  return ctx;
}

type SuccessResult<Data> = {
  data: Data;
  error: undefined;
  extensions?: Record<string, unknown>;
};

type ErrorResult = {
  data: undefined;
  error: CombinedError;
  extensions?: Record<string, unknown>;
};

type HandleErrorsResult<Data> = SuccessResult<Data> | ErrorResult;

function handleErrors<
  Data = unknown,
  Variables extends AnyVariables = AnyVariables,
>(result: OperationResult<Data, Variables>): HandleErrorsResult<Data> {
  const { data, error, extensions } = result;
  if (error?.message.includes('Unauthorized')) {
    return redirect('/signin');
  }
  if (!data && !error) {
    throw new Error('Fetch data is empty');
  }
  return { data, error, extensions } as HandleErrorsResult<Data>;
}

export const isNotFoundError = (error?: CombinedError) => {
  const firistOrignalError = error?.graphQLErrors[0].originalError ?? {};
  return (
    'type' in firistOrignalError && firistOrignalError.type === 'NOT_FOUND'
  );
};

export const getNodesFromEdges = <T>(
  edges?: ({ node: T } | null)[] | null,
): T[] => {
  return (
    edges?.map((edge) => edge?.node).filter((node) => node !== undefined) ?? []
  );
};
