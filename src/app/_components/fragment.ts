import { graphql } from '@/lib/graphql';

// FIXME: フラグメントをコロケーションさせようと "use client"; なコンポーネントに記載するとエラーとなる
// そのため、フラグメントを定義するファイルを分けて記載する
export const SINGIN_USER_ITEM_FRAGMENT = graphql(`
  fragment SinginUserItem on User {
    id
    login
    name
    avatarUrl
  }
`);
