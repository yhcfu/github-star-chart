'use client';

import { SINGIN_USER_ITEM_FRAGMENT } from './fragment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { signout } from '@/features/auth/actions';
import { type FragmentOf, readFragment } from '@/lib/graphql';
import { LogOut } from 'lucide-react';

export function SinginUserMenu({
  userItem,
}: {
  userItem: FragmentOf<typeof SINGIN_USER_ITEM_FRAGMENT>;
}) {
  const { id, login, name, avatarUrl } = readFragment(
    SINGIN_USER_ITEM_FRAGMENT,
    userItem,
  );

  const displayName = name || login;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar id={id} className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={login} />
                <AvatarFallback>
                  {login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{`${displayName} さんがサインイン中`}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>サインアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
