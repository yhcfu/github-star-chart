import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type FragmentOf, graphql, readFragment } from '@/lib/graphql';

export const STAR_HISTORY_HEADER_FRAGMENT = graphql(`
  fragment StarHistoryHeader on Repository {
    nameWithOwner
    url
    owner {
      avatarUrl
    }
  }
`);

interface StarHistoryHeaderProps {
  repository: FragmentOf<typeof STAR_HISTORY_HEADER_FRAGMENT>;
}

export function StarHistoryHeader({ repository }: StarHistoryHeaderProps) {
  const { nameWithOwner, url, owner } = readFragment(
    STAR_HISTORY_HEADER_FRAGMENT,
    repository,
  );
  return (
    <CardHeader>
      <CardTitle className="mb-2 flex items-center">
        <img
          src={owner.avatarUrl}
          alt={`${nameWithOwner} avatar`}
          className="mr-4 h-6 w-6 rounded-full"
        />
        <h1>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-2 text-3xl font-semibold text-primary
              hover:underline dark:text-blue-400"
          >
            {nameWithOwner}
          </a>
        </h1>
      </CardTitle>

      <CardDescription>時間経過によるスター数の成長を可視化</CardDescription>
    </CardHeader>
  );
}
