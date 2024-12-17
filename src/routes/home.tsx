import type { ClientLoaderFunctionArgs } from "react-router";
import { $path } from "safe-routes";
import IndexPage from "./_index";

export const clientLoader = ({ request }: ClientLoaderFunctionArgs) => {
  console.log("clientLoader", request);
};

export default IndexPage;
