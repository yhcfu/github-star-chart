'use client';

import { REPOSITORY_ITEM_FRAGMENT } from './fragment';
import { Button } from '@/components/ui/button';
import { formatDate, formatNumber } from '@/features/search/utils';
import { type FragmentOf, readFragment } from '@/lib/graphql';
import { graphql } from '@/lib/graphql';
import { GitFork, Star } from 'lucide-react';
import NextLink from 'next/link';

interface RepositoryCardProps {
  repo: FragmentOf<typeof REPOSITORY_ITEM_FRAGMENT>;
}

/**
 * リポジトリの検索結果を表示するカード
 */
export function RepositoryCard({ repo }: RepositoryCardProps) {
  const {
    id,
    nameWithOwner,
    description,
    owner: { avatarUrl },
    stargazerCount,
    forkCount,
    updatedAt,
    primaryLanguage,
  } = readFragment(REPOSITORY_ITEM_FRAGMENT, repo);

  return (
    <div
      id={id}
      className="relative flex max-w-full flex-col justify-between rounded-lg
        border p-3 transition-colors hover:border-primary"
    >
      <div className="mb-2">
        <div className="mb-2 flex items-center">
          <img
            src={avatarUrl}
            alt={`${nameWithOwner} avatar`}
            className="mr-2 h-6 w-6 rounded-full"
          />
          <span
            className="line-clamp-2 break-words break-all text-lg font-semibold
              text-primary"
          >
            {nameWithOwner}
          </span>
        </div>
        <p
          className="mt-1 line-clamp-2 break-words break-all text-sm
            text-muted-foreground"
        >
          {description || 'リポジトリの説明はありません'}
        </p>
      </div>
      <div
        className="flex flex-wrap items-center gap-3 text-xs
          text-muted-foreground"
      >
        <div className="flex items-center gap-1">
          <span
            className="inline-block h-3 w-3 rounded-full border
              dark:border-gray-600"
            style={{ backgroundColor: primaryLanguage?.color ?? undefined }}
          />
          {primaryLanguage?.name ?? '言語不明'}
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          {formatNumber(stargazerCount)}
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          {formatNumber(forkCount)}
        </div>
        <div>更新: {formatDate(updatedAt)}</div>
      </div>
      <div className="mt-2">
        <Button asChild variant="outline" size="sm" className="w-full">
          <NextLink href={`/history/${nameWithOwner}`}>履歴を表示</NextLink>
        </Button>
      </div>
    </div>
  );
}
