import { useCallback, useMemo, useState } from "react";

import { DeepPartial } from "@/lib/types";
import { deepMerge } from "@/lib/utils";

export default function usePartialState<T extends object>(initialState: T) {
  const [partialState, setPartialState] = useState<DeepPartial<T>>({});

  const cleanEmptyObjects = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj;

    const cleanedObj = Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = cleanEmptyObjects(value);
      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        !(
          typeof cleanedValue === "object" &&
          Object.keys(cleanedValue).length === 0
        )
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {} as any);

    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  };

  const updateState = useCallback(
    (path: string, value: any) => {
      setPartialState((prev) => {
        const newState = { ...prev };
        const keys = path.split(".");
        let current: any = newState;

        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            const originalValue = keys.reduce(
              (acc: any, k) => acc?.[k],
              initialState,
            );
            if (value === originalValue) {
              delete current[key];
            } else {
              current[key] = value;
            }
          } else {
            current[key] = current[key] ? { ...current[key] } : {};
            current = current[key];
          }
        });
        return cleanEmptyObjects(newState) || {};
      });
    },
    [initialState],
  );

  const getCurrentValue = useCallback(
    (path: string, original: T): any => {
      const keys = path.split(".");
      let value: any = partialState;
      let originalValue: any = original;

      for (const key of keys) {
        value = value?.[key];
        originalValue = originalValue?.[key];
      }

      return value !== undefined ? value : originalValue;
    },
    [partialState],
  );

  const deleteState = useCallback((path: string) => {
    setPartialState((prev) => {
      const newState = { ...prev };
      const keys = path.split(".");
      let current: any = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          delete current[key];
        } else {
          current[key] = current[key] ? { ...current[key] } : {};
          current = current[key];
        }
      });
      return cleanEmptyObjects(newState) || {};
    });
  }, []);

  const resetState = useCallback(() => {
    setPartialState({});
  }, []);

  const hasChanges = useMemo(() => {
    return Object.keys(partialState).length > 0;
  }, [partialState]);

  const mergedState = useMemo(() => {
    return deepMerge(initialState, partialState);
  }, [initialState, partialState]);

  return {
    partialState,
    updateState,
    getCurrentValue,
    deleteState,
    resetState,
    hasChanges,
    mergedState,
    setPartialState,
  };
}
