import type { FallbackProps } from "react-error-boundary";

type MainErrorFallbackProps = {} & FallbackProps;

export const MainErrorFallback = ({ error }: MainErrorFallbackProps) => {
  return <div>致命的エラー、後でいい感じにする</div>;
};
