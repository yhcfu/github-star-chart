'use server';

import { LOGIN_SCHEMA } from './form-schema';
import { COOKIE_GITHUB_TOKEN } from '@/features/auth/definitions';
import { graphql } from '@/lib/graphql';
import { getServerClient } from '@/lib/urql';
import { parseWithValibot } from 'conform-to-valibot';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LOGIN_QUERY = graphql(`
  query LoginQuery {
    viewer {
      login
    }
  }
`);

const TOKEN_EXPIRATION = 60 * 30; // 30 minutes

/**
 * GitHub トークンを検証し、有効であればクッキーに保存します。
 */
export const signin = async (prevState: unknown, formData: FormData) => {
  const cookieStore = await cookies();
  const submission = parseWithValibot(formData, {
    schema: LOGIN_SCHEMA,
  });

  if (submission.status !== 'success') {
    cookieStore.delete(COOKIE_GITHUB_TOKEN);
    return submission.reply();
  }

  const token = submission.value.token;
  const client = await getServerClient();
  const { data, error } = await client.query(
    LOGIN_QUERY,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-cache',
    },
  );

  // トークンが有効であればクッキーに保存
  if (data?.viewer.login) {
    cookieStore.set(COOKIE_GITHUB_TOKEN, token, {
      httpOnly: true,
      secure: true,
      maxAge: TOKEN_EXPIRATION,
      sameSite: 'strict',
    });
    redirect('/search');
  }

  // トークンが無効であればクッキーを削除し、エラーメッセージを表示
  if (error?.response?.status === 401) {
    cookieStore.delete(COOKIE_GITHUB_TOKEN);
    return submission.reply({
      fieldErrors: {
        token: [error.message],
      },
    });
  }

  // その他、想定外エラー
  throw error;
};

/**
 * Cookie から GitHub トークンを削除し、ログアウトします。
 */
export const signout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_GITHUB_TOKEN);
  redirect('/');
};

export const getSinginToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_GITHUB_TOKEN)?.value || '';
};

export const checkSingin = async () => {
  const token = await getSinginToken();
  return !!token;
};
