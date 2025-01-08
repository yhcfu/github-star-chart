import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { fetchRepoInfo } from '@/features/history/api/query';
import { RepoInfoContainer } from '@/features/history/componetns/RepoInfoContainer';
import { StarHistoryContainer } from '@/features/history/componetns/StarHistoryContainer';
import { StarHistoryHeader } from '@/features/history/componetns/StarHistoryHeader';
import { starHistoryQsCache } from '@/features/history/search-params';
import { ArrowLeft } from 'lucide-react';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

interface HistoryPageProps {
  params: Promise<{
    owner: string;
    name: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export default async function HistoryPage({
  params,
  searchParams,
}: HistoryPageProps) {
  const { owner, name } = await params;
  const { repository } = await fetchRepoInfo({ owner, name });
  await starHistoryQsCache.parse(searchParams);

  if (!repository) {
    notFound();
  }

  return (
    <main className="container mx-auto p-8">
      <div className="mx-auto max-w-6xl">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <NextLink href={'/search'}>
            <ArrowLeft className="h-4 w-4" />
            検索に戻る
          </NextLink>
        </Button>

        <Card className="mx-auto mt-6 w-full">
          <StarHistoryHeader repository={repository} />
          <CardContent>
            <Suspense
              fallback={
                <div className="flex items-center justify-center md:h-[414px]">
                  <Spinner className={'mx-auto'} />
                </div>
              }
            >
              <StarHistoryContainer owner={owner} name={name} />
            </Suspense>
            <RepoInfoContainer owner={owner} name={name} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
