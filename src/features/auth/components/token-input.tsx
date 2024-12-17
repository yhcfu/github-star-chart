import { Input, InputAddon, InputGroup } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { graphql } from "@/lib/graphql";

import { debounce } from "es-toolkit";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "urql";

const GITHUB_TOKEN_REGEX = /^(ghp|github_pat)_[A-Za-z0-9_]+$/;
const MAX_TOKEN_LENGTH = 256;

const VerifyTokenQuery = graphql(`
  query VerifyToken {
    viewer {
      login
    }
  }
`);

/**
 * GitHub Access Token の入力を検知して、その有効性を確認します。
 */
const TokenInput = () => {
  const [token, setToken] = useState("");
  const isTokenValid = GITHUB_TOKEN_REGEX.test(token);

  const [{ data, error }] = useQuery({
    query: VerifyTokenQuery,
    pause: !isTokenValid,
    context: useMemo(() => {
      return {
        fetchOptions: {
          headers: { Authorization: `Bearer ${token}` },
        },
        requestPolicy: "network-only",
        suspense: false,
      };
    }, [token]),
  });

  let authStatus: "success" | "failure" | "pending" = "pending";
  if (isTokenValid && data) {
    authStatus = "success";
    sessionStorage.setItem("github_token", token);
  }
  if ((token && !isTokenValid) || (isTokenValid && error)) {
    authStatus = "failure";
  }

  const debouncedSetToken = useMemo(() => debounce(setToken, 500), []);

  // コンポーネントのマウント時、**開発のときのみ** sessionStorage からトークンを読み込む
  useEffect(() => {
    if (import.meta.env.DEV) {
      const savedToken = sessionStorage.getItem("github_token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  return (
    <InputGroup className="w-full max-w-xl">
      <InputAddon className="font-bold text-primary">Access Token</InputAddon>
      <div className="relative flex items-center w-full">
        <span
          className={cn("absolute left-2 h-3 w-3 rounded-full", {
            "bg-green-500": authStatus === "success",
            "bg-red-500": authStatus === "failure",
            "bg-gray-300": authStatus === "pending",
          })}
        />
        <Input
          id="github-token"
          type="text"
          defaultValue={token}
          maxLength={MAX_TOKEN_LENGTH}
          onChange={(e) => debouncedSetToken(e.target.value)}
          className={cn([
            "h-fit pl-8",
            {
              "border-red-500": !isTokenValid && token.length > 0,
            },
          ])}
          placeholder="あなたの GitHub アクセストークンを貼り付けてください"
        />
      </div>
    </InputGroup>
  );
};

export default TokenInput;
