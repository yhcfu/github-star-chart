import * as v from 'valibot';

const GITHUB_TOKEN_REGEX = /^(ghp|github_pat)_[A-Za-z0-9_]+$/;

export const LOGIN_SCHEMA = v.object({
  token: v.pipe(
    v.string('入力してください'),
    v.trim(),
    v.maxLength(256, '256文字以内でなければなりません'),
    v.regex(GITHUB_TOKEN_REGEX, '無効なトークンです。もう一度お試しください'),
  ),
});

export type LoginSchema = v.InferInput<typeof LOGIN_SCHEMA>;
