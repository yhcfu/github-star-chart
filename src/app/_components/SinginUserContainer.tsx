import { SinginUserMenu } from './SinginUserMenu';
import { SINGIN_USER_ITEM_FRAGMENT } from './fragment';
import { checkSingin } from '@/features/auth/actions';
import { graphql } from '@/lib/graphql';
import { getServerClient } from '@/lib/urql';
import { cache } from 'react';

const USER_QUERY = graphql(
  `
    query SinginUser {
      viewer {
        ...SinginUserItem
      }
    }
  `,
  [SINGIN_USER_ITEM_FRAGMENT],
);

const fetchSinginUser = cache(async () => {
  const client = await getServerClient();
  const { data, error } = await client.query(
    USER_QUERY,
    {},
    { cache: 'no-store' /* キャッシュを利用しない */ },
  );
  if (error) {
    throw error;
  }
  return data;
});

export async function SinginUserContainer() {
  if (!(await checkSingin())) {
    return null;
  }
  const { viewer } = await fetchSinginUser();

  return <SinginUserMenu userItem={viewer} />;
}
