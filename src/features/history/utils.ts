import type { HistoryPeriod, StarHistory } from './definitions.ts';
import {
  eachDayOfInterval,
  format,
  parseISO,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * 欠落している日付を補完する
 */
export const processData = (rawData: StarHistory[]): StarHistory[] => {
  // データを日付順にソート
  const sortedData = rawData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const filledData: StarHistory[] = [];

  for (let i = 0; i < sortedData.length; i++) {
    filledData.push(sortedData[i]);
    if (i < sortedData.length - 1) {
      const currentDate = parseISO(sortedData[i].date);
      const nextDate = parseISO(sortedData[i + 1].date);
      const daysBetween = eachDayOfInterval({
        start: currentDate,
        end: nextDate,
      });

      // 欠落している日付を補完
      for (let j = 1; j < daysBetween.length - 1; j++) {
        filledData.push({
          date: format(daysBetween[j], 'yyyy-MM-dd'),
          totalStars: sortedData[i].totalStars,
        });
      }
    }
  }

  return filledData;
};

/**
 * 指定された期間のデータをフィルタリングする
 */
export const filterDataByTimeRange = (
  data: StarHistory[],
  period: HistoryPeriod,
): StarHistory[] => {
  if (data.length === 0) return [];

  const endDate = new Date(data[data.length - 1].date);
  let startDate: Date;

  // 期間に応じて開始日を設定
  switch (period) {
    case '1M':
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case '1Y':
      startDate = new Date(endDate);
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    case '5Y':
      startDate = new Date(endDate);
      startDate.setFullYear(startDate.getFullYear() - 5);
      break;
    default:
      return data;
  }

  // 開始日以降のデータのみをフィルタリング
  return data.filter((item) => new Date(item.date) >= startDate);
};

/**
 * 日付文字列を期間に応じたフォーマットに変換する
 */
export const formatDateForPeriod = (dateStr: string, period: HistoryPeriod) => {
  const date = parseISO(dateStr);
  if (period === '1M') {
    return format(date, 'M/d', { locale: ja });
  }
  if (period === '1Y') {
    return format(date, 'yyyy/MM', { locale: ja });
  }
  if (period === '5Y') {
    return format(date, 'yyyy', { locale: ja });
  }
  return format(date, 'yyyy/MM/dd', { locale: ja });
};

/**
 * 数値を "," 区切りの文字列に変換する
 */
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ja-JP').format(num);
};

/**
 * 1ヶ月表示用のX軸目盛りを生成する
 */
export const getTicksForMonth = (data: StarHistory[]): string[] => {
  if (data.length < 4) return [];
  const interval = Math.floor(data.length / 4);
  return [
    data[0].date,
    data[interval].date,
    data[interval * 2].date,
    data[interval * 3].date,
    data[data.length - 1].date,
  ];
};

/**
 * 1年表示用のX軸目盛りを生成する
 */
export const getTicksForYear = (data: StarHistory[]): string[] => {
  if (data.length < 5) return [];
  const interval = Math.floor(data.length / 4);
  return [
    data[0].date,
    data[interval].date,
    data[interval * 2].date,
    data[interval * 3].date,
    data[data.length - 1].date,
  ];
};

/**
 * 5年表示用のX軸目盛りを生成する
 */
export const getTicksForFiveYears = (data: StarHistory[]): string[] => {
  if (data.length < 5) return [];
  const interval = Math.floor(data.length / 4);
  return [
    data[0].date,
    data[interval].date,
    data[interval * 2].date,
    data[interval * 3].date,
    data[data.length - 1].date,
  ];
};

/**
 * 週間成長率を計算する
 */
export const calculateWeeklyGrowth = (data: StarHistory[]): number => {
  if (data.length < 8) {
    return 0; // データが1週間分ない場合は0を返す
  }

  const lastWeekData = data.slice(-8); // 最新の8日分のデータを取得
  const oldestValue = lastWeekData[0].totalStars;
  const newestValue = lastWeekData[lastWeekData.length - 1].totalStars;

  return newestValue - oldestValue;
};

/**
 * 指定された期間の開始日を取得する
 */
export function getStartDate(period: HistoryPeriod | '1W'): Date {
  const now = new Date();
  return {
    '1W': subWeeks(now, 1),
    '1M': subMonths(now, 1),
    '1Y': subYears(now, 1),
    '5Y': subYears(now, 5),
  }[period];
}

/**
 * edges から starredAt を取得する
 */
export function getStarredAtsFromEdges(
  edges?: ({ starredAt: string } | null)[] | null,
): string[] {
  return (
    edges
      ?.map((edge) => edge?.starredAt)
      .filter((starredAt) => starredAt !== undefined) ?? []
  );
}

/**
 * 日別のスター数を計算する
 */
export function calculateDailyStarCounts(
  latestStarCount: number,
  starHistories: string[],
  period: '1M' | '1Y' | '5Y',
): StarHistory[] {
  // 日付ごとにグループ化
  const groupedByDate: Record<string, number> = {};

  for (const timestamp of starHistories) {
    const date = format(parseISO(timestamp), 'yyyy-MM-dd', { locale: ja }); // 日本時間でフォーマット
    if (!groupedByDate[date]) {
      groupedByDate[date] = 0;
    }
    groupedByDate[date]++;
  }

  // 表示する日付の範囲を生成
  const now = new Date();
  const startDate =
    period === '1M'
      ? subMonths(now, 1)
      : period === '1Y'
        ? subYears(now, 1)
        : subYears(now, 5);

  const dateRange = eachDayOfInterval({ start: startDate, end: now }).reverse();

  // 累計スター数を計算
  let cumulativeStars = latestStarCount;
  const result: StarHistory[] = [];

  for (const date of dateRange) {
    const dateStr = format(date, 'yyyy-MM-dd', { locale: ja });
    const starsOnDate = groupedByDate[dateStr] || 0;
    result.push({ date: dateStr, totalStars: cumulativeStars });
    cumulativeStars -= starsOnDate;
  }

  return result.reverse(); // 昇順に戻す
}
