import type { HistoryPeriod } from '../definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PERIODS = [
  { value: '1M', label: '1ヶ月' },
  { value: '1Y', label: '1年' },
  { value: '5Y', label: '5年' },
] as const;

interface PeriodSelectProps {
  defaultValue?: HistoryPeriod;
  onValueChange?: (value: HistoryPeriod) => void;
  isLoading?: boolean;
}

export function PeriodSelect({
  defaultValue,
  onValueChange,
  isLoading,
}: PeriodSelectProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">スター数の推移</h3>
      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="表示期間を選択" />
          {isLoading && <span className="ml-2">更新中...</span>}
        </SelectTrigger>
        <SelectContent>
          {PERIODS.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
