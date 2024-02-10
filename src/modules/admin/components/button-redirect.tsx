import {
  DynamicRouteType,
  DynamicRoutes,
  StaticRouteType,
} from 'common/routes/routes';
import Button, { ButtonProps } from 'components/elements/button';
import { useRouter } from 'next/router';
import React from 'react';

export interface ButtonRedirectProps extends ButtonProps {
  id?: string;
  route: StaticRouteType | DynamicRouteType;
}

export default function ButtonRedirect(props: ButtonRedirectProps) {
  const { route, ...rest } = props;
  const { push } = useRouter();

  const onClick = React.useCallback(() => {
    if (route.type === 'static') {
      push(route.staticRoute);
    } else {
      push(DynamicRoutes[route.dynamicRoute](route.id));
    }
  }, [push, route]);

  return (
    <Button
      variant={{
        variant: 'primary',
      }}
      onClick={onClick}
      {...rest}
    />
  );
}
