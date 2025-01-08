'use client';

import { LOGIN_SCHEMA, type LoginSchema } from '../form-schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signin } from '@/features/auth/actions';
import { getInputProps, useForm } from '@conform-to/react';
import { getValibotConstraint } from 'conform-to-valibot';
import { useActionState } from 'react';

/**
 * Server Actions を利用して、GitHub トークンを検証するフォームです。
 */
export function SignInForm() {
  const [lastResult, action, isPending] = useActionState(signin, undefined);
  const [form, fields] = useForm<LoginSchema>({
    lastResult,
    constraint: getValibotConstraint(LOGIN_SCHEMA),
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>GitHubアクセストークンを入力</CardTitle>
          <CardDescription className="pt-2">
            Cookieに保存され、30分後に自動的に破棄されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id={form.id} action={action} noValidate>
            <Input
              {...getInputProps(fields.token, { type: 'text' })}
              key={fields.token.id}
              type="password"
              placeholder="GitHubアクセストークン"
              className="mb-4"
            />
            {fields.token.errors && (
              <p className="mb-4 text-sm text-red-500">
                {fields.token.errors[0]}
              </p>
            )}
            <Button type="submit" className="w-full" isLoading={isPending}>
              送信
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            トークンをお持ちでない場合は、
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              こちらで生成してください
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
