import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const libraryCategories = [
  {
    category: 'コアライブラリ',
    libraries: [
      {
        name: 'Next.js 15',
        description:
          'Reactベースのフルスタックフレームワーク (app router + RSC)',
        reason:
          '高速なパフォーマンス、SEO最適化、サーバーサイドレンダリングのため選択しました。App RouterとReact Server Componentsにより、より効率的な開発が可能になります。',
        link: 'https://nextjs.org/',
      },
      {
        name: 'Tailwind CSS',
        description: 'ユーティリティファーストのCSSフレームワーク',
        reason:
          '迅速な開発、カスタマイズ性、一貫したデザインを実現するために採用しました。',
        link: 'https://tailwindcss.com/',
      },
      {
        name: 'shadcn/ui',
        description: '再利用可能なReactコンポーネントライブラリ',
        reason:
          '美しくカスタマイズ可能なUIコンポーネントを提供し、開発速度を向上させるために選択しました。',
        link: 'https://ui.shadcn.com/',
      },
      {
        name: 'Recharts',
        description: 'Reactチャートライブラリ',
        reason:
          'GitHubのスター履歴を視覚化するための柔軟で使いやすいチャートコンポーネントを提供するために採用しました。',
        link: 'https://recharts.org/',
      },
    ],
  },
  {
    category: 'GraphQL クライアント',
    libraries: [
      {
        name: 'urql',
        description: '高度にカスタマイズ可能なGraphQLクライアント',
        reason:
          '軽量で柔軟性が高く、パフォーマンスに優れているため選択しました。',
        link: 'https://formidable.com/open-source/urql/',
      },
      {
        name: 'gql.tada',
        description: 'TypeScriptのためのGraphQLコード生成ツール',
        reason:
          '型安全なGraphQLクエリの作成を可能にし、開発効率を向上させるために採用しました。',
        link: 'https://github.com/0no-co/gql.tada',
      },
    ],
  },
  {
    category: 'フォームバリデーション',
    libraries: [
      {
        name: 'valibot',
        description: '型安全なスキーマ検証ライブラリ',
        reason:
          '軽量で高速、TypeScriptと相性が良く、ランタイムとビルドタイムの両方でスキーマ検証が可能なため採用しました。',
        link: 'https://valibot.dev/',
      },
      {
        name: 'conform',
        description: 'Reactのためのフォーム管理ライブラリ',
        reason:
          'プログレッシブエンハンスメントを重視し、サーバーサイドバリデーションとシームレスに統合できるため選択しました。',
        link: 'https://conform.guide/',
      },
    ],
  },
  {
    category: 'プログラミング支援AI',
    libraries: [
      {
        name: 'v0',
        description: 'AIによるコーディング支援ツール',
        reason:
          '開発プロセスを加速し、コードの品質を向上させるために利用しました。',
        link: 'https://v0.dev/',
      },
    ],
  },
  {
    category: 'エコシステム',
    libraries: [
      {
        name: 'Biome',
        description: '高速で設定不要なコードフォーマッター',
        reason:
          '一貫したコードスタイルを維持し、開発効率を向上させるために採用しました。',
        link: 'https://biomejs.dev/',
      },
      {
        name: 'Prettier',
        description: 'オピニオネイテッドなコードフォーマッター',
        reason:
          'コードの一貫性を保ち、チーム全体で統一されたコードスタイルを維持するために使用しています。',
        link: 'https://prettier.io/',
      },
      {
        name: 'lefthook',
        description: '高速で柔軟なGitフック管理ツール',
        reason:
          'コミット前のコード品質チェックを自動化し、一貫した開発プラクティスを確保するために導入しました。',
        link: 'https://github.com/evilmartians/lefthook',
      },
    ],
  },
];

export function UsedLibraries() {
  return (
    <section
      className="bg-gradient-to-b from-background to-muted px-4 py-20 md:px-6"
    >
      <div className="prose mx-auto max-w-6xl dark:prose-invert">
        <h2
          className="mb-12 text-center text-3xl font-bold text-blue-800
            dark:text-blue-200"
        >
          使用ライブラリと選定理由
        </h2>
        {libraryCategories.map((category) => (
          <div key={category.category} className="mb-12">
            <h3
              className="mb-6 text-2xl font-semibold text-purple-700
                dark:text-purple-300"
            >
              {category.category}
            </h3>
            <div className="not-prose grid grid-cols-1 gap-6 md:grid-cols-2">
              {category.libraries.map((lib) => (
                <Card
                  key={lib.name}
                  className="flex h-full flex-col bg-white shadow-md
                    transition-shadow duration-300 hover:shadow-lg
                    dark:bg-gray-800"
                >
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={lib.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline
                          dark:text-indigo-400"
                      >
                        {lib.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      {lib.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lib.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
