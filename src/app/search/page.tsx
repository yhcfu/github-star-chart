import { Spinner } from '@/components/ui/spinner';
import { RepositorySearchContainer } from '@/features/search/components/RepositorySearchContainer';
import { SearchForm } from '@/features/search/components/SearchForm';
import { searchParamsCache } from '@/features/search/search-params';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  await searchParamsCache.parse(searchParams);
  return (
    <main className="bg-background text-foreground">
      <div className="container space-y-6 px-4 md:px-6">
        <div
          className="prose flex items-center justify-between dark:prose-invert"
        >
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              リポジトリ検索
            </h2>
            <p className="text-muted-foreground">
              GitHubリポジトリを検索し、スター履歴を確認できます
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <SearchForm />
          <Suspense fallback={<Spinner className="mx-auto" />}>
            <RepositorySearchContainer />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
