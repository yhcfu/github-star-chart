// アプリケーション全体に globals.css を適用する
import './globals.css';
import { Header } from '@/app/_components/Header';
import { ThemeProvider } from '@/app/_components/ThemeProvider';
import { env } from '@/config/env';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';

const author = '@yhcfu';
const siteName = `GitHub スター履歴 - ${author}`;
const description =
  'Next.js（App Router）と GraphQL で作られた GitHub スター履歴アプリです。Server Component の学習用途';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: siteName,
  description,
  metadataBase: new URL(env.SITE_URL),
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    // NOTE: next-themes の関係で、いまのところ `suppressHydrationWarning` しておくしかないっぽい
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <TooltipProvider>
              <Header />
              <div className="pt-[52px]">{children}</div>
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
