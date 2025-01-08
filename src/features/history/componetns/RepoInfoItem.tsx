'use client';

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import type React from 'react';
import type { ReactNode } from 'react';

interface RepoInfoItemProps {
  icon: ReactNode;
  value: number;
  label: string;
  isGrowth?: boolean;
}

export function RepoInfoItem({
  icon,
  value,
  label,
  isGrowth = false,
}: RepoInfoItemProps) {
  const formattedValue = isGrowth
    ? value > 0
      ? `+${value.toLocaleString()}`
      : value.toLocaleString()
    : value.toLocaleString();

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border
        border-border bg-background p-3`}
    >
      {icon}
      <div className="flex items-center">
        {isGrowth && value > 0 && (
          <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
        )}
        {isGrowth && value < 0 && (
          <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
        )}
        <span className="text-lg font-semibold text-foreground">
          {formattedValue}
        </span>
      </div>
      <span className="mt-0.5 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
