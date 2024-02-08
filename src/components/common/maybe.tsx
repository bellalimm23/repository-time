import Text, { TextProps } from 'components/elements/text';
import React from 'react';

interface MaybeTextProps extends TextProps {
  children: React.ReactNode;
}

export type MaybeFCType<T extends object> =
  | React.ReactNode
  | ((props: T) => React.ReactNode);
interface MaybeFCProps<T extends object> {
  props: T;
  children: MaybeFCType<T>;
  fallback?: MaybeFCType<T>;
}

interface OptionalWrapperProps<TProps extends object> {
  Wrapper?: (props: { children: React.ReactNode } & TProps) => React.ReactNode;
  wrapperProps: TProps;
  children: React.ReactNode;
}

/** Uses the \<Text\>-related props only if children is a string/number */
export function MaybeText(props: MaybeTextProps) {
  if (
    typeof props.children === 'string' ||
    typeof props.children === 'number'
  ) {
    return <Text {...props} />;
  }
  return props.children;
}

export function MaybeFC<T extends object>(props: MaybeFCProps<T>) {
  if (typeof props.children === 'function') {
    const Children = props.children;
    return <Children {...props.props} />;
  } else {
    if (props.children == null && props.fallback) {
      const Fallback = props.fallback;
      return <MaybeFC props={props.props}>{Fallback}</MaybeFC>;
    }
    return props.children;
  }
}

export function OptionalWrapper<TProps extends object>(
  props: OptionalWrapperProps<TProps>,
) {
  const { Wrapper, wrapperProps, children } = props;
  if (Wrapper) {
    return <Wrapper {...wrapperProps}>{children}</Wrapper>;
  } else {
    return children;
  }
}

export function callMaybeFunction<TParams extends unknown[], TReturn>(
  maybeFn: TReturn | ((...args: TParams) => TReturn),
  ...args: TParams
): TReturn {
  if (typeof maybeFn === 'function') {
    return (maybeFn as any)(...args);
  } else {
    return maybeFn;
  }
}
