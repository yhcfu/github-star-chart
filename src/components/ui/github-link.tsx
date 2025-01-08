'use client';

import { Button } from './button';
import GitHubWhite from '@/assets/github-mark-white.svg';
import GitHub from '@/assets/github-mark.svg';

export const GitHubLink = () => {
  return (
    <Button variant="ghost" size="icon" color="white" asChild>
      <a
        href="https://github.com/yhcfu/github-star-chart"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub
          viewBox="0 0 98 96"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
            dark:-rotate-90 dark:scale-0"
        />
        <GitHubWhite
          viewBox="0 0 98 96"
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
            transition-all dark:rotate-0 dark:scale-100"
        />
      </a>
    </Button>
  );
};
