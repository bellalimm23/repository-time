import React from 'react';

/**
 * Debug hook to count the number of re-renders a component has went through throughout its lifespan.
 * @param tag Tag for console logs
 * @param dependencies Additional dependency array to constrain when the logs occur to pinpoint which variable is causing rerendering.
 */
export function useCountRender(tag?: string, dependencies?: any[]) {
  const renderCount = React.useRef(0);
  React.useEffect(() => {
    renderCount.current++;
    console.log(`${tag ?? 'Default'}: ${renderCount.current}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

type UseCompareWithPastSettings = {
  logWhen: 'always' | 'change' | 'stay';
};
export function useCompareWithPast<T>(
  tag: string,
  value: T,
  _settings?: Partial<UseCompareWithPastSettings>,
) {
  const settings: UseCompareWithPastSettings = {
    logWhen: _settings?.logWhen || 'change',
  };
  const pastValue = React.useRef(value);
  React.useEffect(() => {
    if (pastValue.current !== value) {
      const logWhenChanged =
        settings.logWhen === 'change' || settings.logWhen === 'always';
      if (logWhenChanged) {
        console.log(`${tag}:`, pastValue.current, '-->', value);
      }
    } else if (pastValue.current === value) {
      const logWhenNotChanged =
        settings.logWhen === 'stay' || settings.logWhen === 'always';
      if (logWhenNotChanged) {
        console.log(`${tag}:`, value);
      }
    }
    pastValue.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
