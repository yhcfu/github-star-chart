import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="prose mt-8 flex w-full max-w-none flex-col items-center
        justify-center p-6 dark:prose-invert"
    >
      <h2 className="text-2xl">ページがみつかりませんでした 🥲</h2>
      <p className="text-muted-foreground">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Button asChild className="mt-4">
        <Link href="/">トップに戻る</Link>
      </Button>
    </div>
  );
}
