import "next";

/**
 * Next.js の searchParams の型を簡単に定義するための拡張
 * https://zenn.dev/chot/articles/validate-nextjs-searchparams#next.js%E3%81%AEsearchparams%E3%81%AE%E5%9E%8B%E5%95%8F%E9%A1%8C
 */
declare module "next" {
  export type NextSegmentPage<
    Props extends {
      params?: Record<string, string | string[]>;
    } = object,
  > = React.FC<{
    params: Promise<Props["params"]>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }>;
}
