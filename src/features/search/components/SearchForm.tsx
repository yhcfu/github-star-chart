'use client';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { searchParamsParsers } from '@/features/search/search-params';
import { HelpCircle, SearchIcon, X } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useEffect, useRef, useState, useTransition } from 'react';

export function SearchForm() {
  const [isPending, startTransition] = useTransition();
  const [{ q, starsLimit }, setQuery] = useQueryStates(searchParamsParsers, {
    startTransition,
    shallow: false,
  });

  const [searchTerm, setSearchTerm] = useState(q);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery({ q: searchTerm });
  };

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
      <div
        className="relative flex flex-wrap items-center justify-between gap-2"
      >
        <div className="relative flex-1">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex
              items-center pl-3"
          >
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative min-w-[320px] max-w-2xl">
            <Input
              ref={inputRef}
              value={searchTerm}
              type="text"
              placeholder="リポジトリを検索..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-16 sm:pr-24"
            />

            {!isPending && searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            {!isFocused && !searchTerm && (
              <kbd
                className="pointer-events-none absolute right-3 top-2 hidden h-5
                  select-none items-center gap-1 rounded border bg-muted px-1.5
                  font-mono text-xs font-medium opacity-100 sm:flex"
              >
                /
              </kbd>
            )}
          </div>
        </div>

        <div className="mt-1 flex items-center space-x-2">
          <Switch
            checked={starsLimit}
            onCheckedChange={(checked) => setQuery({ starsLimit: checked })}
            className="mt-0.5 data-[state=checked]:bg-primary"
          />
          <span className="text-sm">1,000スター以下のみ</span>
          <Popover>
            <PopoverTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p>
                GitHub GraphQL API
                でスターを全件取得するには速度の限界があるため、デモとして時間のかからないリポジトリのみ抽出します
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </form>
  );
}
