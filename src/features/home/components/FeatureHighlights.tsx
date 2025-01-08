import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';

export function FeatureHighlights() {
  const features = [
    {
      title: 'スター履歴の追跡',
      description: '任意のリポジトリのスター数の成長を時系列で可視化します。',
      icon: <LineChart className="h-6 w-6 text-purple-600" />,
    },
    {
      title: '比較分析（近日公開）',
      description: '複数のリポジトリのスター履歴を比較できます。（現在開発中）',
      icon: <BarChart className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: 'トレンド分析（近日公開）',
      description:
        'リポジトリの人気度の傾向に関する貴重な洞察を得られます。（現在開発中）',
      icon: <PieChart className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <section
      className="bg-gradient-to-br from-background via-background to-muted/50
        px-4 py-20 md:px-6"
    >
      <div className="prose mx-auto max-w-6xl dark:prose-invert">
        <h2
          className="mb-12 text-center text-3xl font-bold text-purple-800
            dark:text-purple-200"
        >
          主な機能
        </h2>
        <div className="not-prose grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex h-full flex-col bg-white shadow-lg
                transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2 text-xl text-purple-700
                    dark:text-purple-300"
                >
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
