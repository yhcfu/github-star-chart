import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// ファイルベースのルーティングを使うために、`flatRoutes` を使ってルートを取得します。
// https://reactrouter.com/how-to/file-route-conventions#file-route-conventions
export default flatRoutes() satisfies RouteConfig;
