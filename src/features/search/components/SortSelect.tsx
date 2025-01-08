'use client';

import type { SearchSort } from '../definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortSelectProps {
  defaultValue?: SearchSort;
  onValueChange?: (value: SearchSort) => void;
}

export function SortSelect({ defaultValue, onValueChange }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">並び替え:</span>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="best-match">関連度が高い</SelectItem>
          <SelectItem value="stars-desc">スター数 (多い順)</SelectItem>
          <SelectItem value="stars-asc">スター数 (少ない順)</SelectItem>
          <SelectItem value="forks-desc">フォーク数 (多い順)</SelectItem>
          <SelectItem value="forks-asc">フォーク数 (少ない順)</SelectItem>
          <SelectItem value="updated-desc">最近の更新順</SelectItem>
          <SelectItem value="updated-asc">更新日が古い順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
