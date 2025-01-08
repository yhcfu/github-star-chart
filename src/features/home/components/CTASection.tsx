import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section
      className="bg-gradient-to-b from-purple-700 to-indigo-600 px-4 py-20
        text-white md:px-6"
    >
      <div className="prose prose-invert mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-3xl font-bold">
          GitHubのリポジトリを可視化する準備はできましたか？
        </h2>
        <p className="mx-auto mb-8 text-center text-xl">
          今すぐリポジトリのスター履歴の追跡を開始し、プロジェクトの成長と人気度に関する貴重な洞察を得ましょう。
        </p>
        <div className="text-center">
          <Link href="/signin">
            <Button
              size="lg"
              variant="secondary"
              className="rounded bg-white px-4 py-2 font-bold text-purple-700
                hover:bg-purple-100 dark:bg-gray-200 dark:text-purple-800
                dark:hover:bg-gray-300"
            >
              今すぐ始める
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
