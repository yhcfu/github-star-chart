'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Moon
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
          dark:-rotate-90 dark:scale-0"
      />
      <Sun
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
          transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}