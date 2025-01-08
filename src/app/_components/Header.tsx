import { SinginUserContainer } from './SinginUserContainer';
import { GitHubLink } from '@/components/ui/github-link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import NextLink from 'next/link';
import { Suspense } from 'react';

export function Header() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex w-full items-center
        justify-between bg-background/95 px-6 py-2 shadow-md backdrop-blur
        supports-[backdrop-filter]:bg-background/85 dark:border-b-[1px]"
    >
      <h1 className="text-xl font-bold">
        <NextLink href={'/'}>GitHub スター履歴</NextLink>
      </h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <GitHubLink />
          <ModeToggle />
        </div>
        <Suspense>
          <SinginUserContainer />
        </Suspense>
      </div>
    </header>
  );
}
