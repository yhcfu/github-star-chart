'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 *
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
