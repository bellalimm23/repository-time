import React, { useEffect } from 'react';

export type RefListener<T> = React.MutableRefObject<T> | ((value: T) => void);

interface UseBindValueOptions {
  // Is the ``listener`` called on mount? Default is false.6o=
  leading: boolean;
}

/** Sets the value for a ref listener type, which can be a mutable ref or a function */
export function applyRefListener<T>(
  ref: RefListener<T> | null | undefined,
  value: T,
) {
  if (ref == null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
}

/** Sets the value to the provided ``listener`` whenever ``dependent`` changes. */
export function useBindValue<T>(
  listener: RefListener<T> | null | undefined,
  dependent: T,
  options?: Partial<UseBindValueOptions>,
) {
  const isInitial = React.useRef(true);
  useEffect(() => {
    if (isInitial.current && !options?.leading) {
      isInitial.current = false;
      return;
    }
    applyRefListener(listener, dependent);
    isInitial.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependent]);
}
