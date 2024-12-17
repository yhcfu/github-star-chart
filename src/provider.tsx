import { MainErrorFallback } from "@/components/errors/main-error";
import { client } from "@/lib/urql-client";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as UrqlProvider } from "urql";

import { ThemeProvider } from "@/components/theme-provider";

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * アプリケーション全体で使用するプロバイダーを集約する
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <NuqsAdapter>
          <UrqlProvider value={client}>{children}</UrqlProvider>
        </NuqsAdapter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
