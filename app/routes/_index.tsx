import { Button } from "@/components/ui/button";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return <Button>テスト</Button>;
}
