import { Image, ImageProps } from '@mantine/core';
import assets from 'assets/image';
import { StaticRoutes } from 'common/routes/routes';
import { useRouter } from 'next/router';
import React from 'react';

interface BrandIconDirectHomeProps extends ImageProps {
  isAdmin?: boolean;
}

export default function BrandIconDirectHome(props: BrandIconDirectHomeProps) {
  const {
    src = assets.brandLogo,
    w = 64,
    h = 64,
    style,
    isAdmin = false,
    ...rest
  } = props;
  const { push } = useRouter();

  return (
    <Image
      src={src}
      w={w}
      h={h}
      onClick={() => push(isAdmin ? StaticRoutes.adminHome : StaticRoutes.home)}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    />
  );
}
