import { Button } from '@/components/ui/button';
import { checkSingin } from '@/features/auth/actions';
import NextLink from 'next/link';

export async function ForwardLink() {
  const isSignin = await checkSingin();
  const href = isSignin ? '/search' : '/signin';
  return (
    <Button
      asChild
      size="lg"
      className="rounded-full bg-white px-8 py-3 text-lg font-bold
        text-purple-700 transition-all duration-200 ease-in-out
        hover:bg-purple-100 hover:shadow-md focus-visible:ring-2
        focus-visible:ring-gray-400"
    >
      <NextLink href={href}>試してみる</NextLink>
    </Button>
  );
}
