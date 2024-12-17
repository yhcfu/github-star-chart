import { Button } from "@/components/ui/button";
import { type MetaFunction, useLocation } from "react-router";

import { RepositorySearch } from "@/features/repositories/repository-search";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "GitHub Start Chart - @yhcfu" },
    { name: "description", content: "TODO: サイトの説明をあとで書く" },
  ];
};

export default function Index() {
  return (
    <Suspense fallback={"Loading..."}>{/* <RepositorySearch /> */}</Suspense>
  );
}
