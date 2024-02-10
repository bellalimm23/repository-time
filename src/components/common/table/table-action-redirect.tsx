import { ActionIcon, ActionIconProps } from '@mantine/core';
// import { Eye } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import {
  DynamicRouteType,
  DynamicRoutes,
  StaticRouteType,
} from 'common/routes/routes';
import { useRouter } from 'next/router';
import React from 'react';

interface TableActionRedirectProps extends ActionIconProps {
  route: DynamicRouteType | StaticRouteType;
}

export default function TableActionRedirect(props: TableActionRedirectProps) {
  const { route, ...rest } = props;
  const { push } = useRouter();

  const onClick = React.useCallback(() => {
    if (route.type === 'static') {
      const { staticRoute } = route;
      push(staticRoute);
    } else {
      const { dynamicRoute, id } = route;
      push(DynamicRoutes[dynamicRoute](id));
    }
  }, [push, route]);

  return (
    <ActionIcon onClick={onClick} variant="transparent" {...rest}>
      <Icons.Eye />
    </ActionIcon>
  );
}
