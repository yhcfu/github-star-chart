import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import TokenInput from "@/features/auth/components/token-input";

import GitHubWhite from "@/assets/github-mark-white.svg?react";
import GitHub from "@/assets/github-mark.svg?react";
import { Suspense } from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const GitHubLink = () => {
  return (
    <Button variant="outline" size="icon" color="white" asChild>
      <a
        href="https://github.com/yhcfu/github-star-chart"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub
          viewBox="0 0 98 96"
          className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100
            transition-all dark:scale-0"
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

const DefaultHeader = () => {
  return (
    <header
      className="flex justify-between items-center p-4 bg-background shadow-md"
    >
      <TokenInput />

      <div className="flex items-center gap-4">
        <GitHubLink />
        <ModeToggle />
      </div>
    </header>
  );
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <DefaultHeader />
      <main>{children}</main>
    </div>
  );
};
