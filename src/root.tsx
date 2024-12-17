import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";

import styles from "./styles/global.css?url";

import { RootErrorFallback } from "./components/errors/root-error";
import { DefaultLayout } from "./components/layouts/default-layout";

import { AppProvider } from "./provider";

// React Router のルートファイル
// https://reactrouter.com/explanation/special-files#roottsx

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

/**
 * https://reactrouter.com/explanation/special-files#layout-export
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
        {children}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </AppProvider>
  );
}

export const ErrorBoundary = RootErrorFallback;
