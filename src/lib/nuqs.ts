import { debounce } from "es-toolkit";
import {
  type UseQueryStateOptions,
  type UseQueryStateReturn,
  type UseQueryStatesKeysMap,
  useQueryState as nuqsUseQueryState,
  useQueryStates as nuqsUseQueryStates,
} from "nuqs";
import { startTransition, useCallback, useState } from "react";

/**
 * QueryParams の状態をデバウンスして更新する
 * https://github.com/47ng/nuqs/issues/291#issuecomment-2113921597
 */
export function useQueryStateDebounced<KeyMap>(
  key: string,
  options: UseQueryStateOptions<KeyMap> & {
    defaultValue: KeyMap;
  },
  debounceMs = 500,
): UseQueryStateReturn<
  NonNullable<ReturnType<typeof options.parse>>,
  typeof options.defaultValue
> {
  const [valueQs, setQs] = nuqsUseQueryState<KeyMap>(key, options);
  const [valueReact, setReact] = useState<KeyMap | null>(valueQs);

  const debouncedSetQs = useCallback(debounce(setQs, debounceMs), []);
  const set = (newValue: never) => {
    setReact(newValue);
    debouncedSetQs(newValue);
  };

  return [valueReact as typeof valueQs, set as typeof setQs];
}

/**
 * nuqs の useQueryStates をラップして、Hook を返す関数
 */
export const createQueryStates = <
  KeyMap extends UseQueryStatesKeysMap,
  Options extends UseQueryStateOptions<KeyMap>,
>(
  keyMap: KeyMap,
) => {
  return (options: Options) => {
    const [valueQs, setQs] = nuqsUseQueryStates(keyMap, options);

    const set = (newValue: never, ...rest: never[]) => {
      const nullableValues = Object.fromEntries(
        Object.entries(newValue).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ]),
      );

      setQs(newValue, ...rest);

      // TODO: これやるかどうか検討
      // if (startTransition) {
      //   startTransition(() => {
      //     setQs(nullableValues);
      //   });
      // }
    };

    return [valueQs, set as typeof setQs] as const;
  };
};

// Options extends Partial<UseQueryStateOptions<KeyMap>, "startTransaction"> & {
//   startTransaction: TransactionStartFunction
// }>,
// >(keyMap: KeyMap) => {
//   const keys = Object.keys(keyMap) as Key[];
//   const useQueryStates = <Options extends Partial<UseQueryStateOptions<KeyMap[Key]>>>(
//     options: Options,
//   ) => {
//     return keys.map((key) => useQueryState(key, options[key] as any));
//   };

//   return useQueryStates;
// }
