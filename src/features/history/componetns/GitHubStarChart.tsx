'use client';

import type { StarHistory } from '../definitions.ts';
import {
  formatDateForPeriod,
  formatNumber,
  getTicksForFiveYears,
  getTicksForMonth,
  getTicksForYear,
} from '../utils';
import { PeriodSelect } from './PeriodSelect';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { starHistoryParser } from '@/features/history/search-params';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

type GitHubStarChartProps = {
  repository?: string;
  starHistories: StarHistory[];
};

export function GitHubStarChart({ starHistories }: GitHubStarChartProps) {
  const [isPending, startTransition] = useTransition();
  const [{ period }, setQuery] = useQueryStates(starHistoryParser, {
    startTransition,
    shallow: false,
  });

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PeriodSelect
        isLoading={isPending}
        defaultValue={period}
        onValueChange={(value) => setQuery({ period: value })}
      />
      <ChartContainer
        config={{
          totalStars: {
            label: '総スター数',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="mt-4 aspect-[21/9] w-full"
      >
        <LineChart data={starHistories} margin={{ top: 10, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted dark:stroke-muted/20"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDateForPeriod(value, period)}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            stroke="hsl(var(--foreground))"
            className="text-muted-foreground dark:text-muted-foreground/70"
            ticks={
              period === '1M' || period === '1Y' || period === '5Y'
                ? (period === '1M'
                    ? getTicksForMonth
                    : period === '1Y'
                      ? getTicksForYear
                      : getTicksForFiveYears)(starHistories)
                : undefined
            }
            minTickGap={20}
          />
          <YAxis
            tickFormatter={formatNumber}
            width={60}
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--foreground))"
            className="text-muted-foreground dark:text-muted-foreground/70"
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="totalStars"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 0,
            }}
          />
          <ChartLegend />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
