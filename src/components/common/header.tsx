import { Card } from '@mantine/core';
import {
  MagnifyingGlass,
  SignIn,
  // SignOut,
  User,
  UserPlus,
} from '@phosphor-icons/react';
import classNames from 'classnames';
import { StaticRoutes, StaticRoutesType } from 'common/routes/routes';
import Button from 'components/elements/button';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import { useRouter } from 'next/router';
import React from 'react';
import structuralStyles from 'styles/layout.css';

export default function Header() {
  const { pathname, push } = useRouter();
  const isCurrent = (link: StaticRoutesType) => pathname.includes(link);
  return (
    <Card
      withBorder
      shadow="lg"
      className={classNames(
        structuralStyles.fill({ width: true }),
        structuralStyles.flexbox({
          direction: 'row',
          justify: 'between',
        }),
      )}
      radius={0}
      padding={0}
      px={16}
    >
      <BrandIconDirectHome />
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'row',
            gap: 'md',
          }),
        )}
      >
        <Button
          miw={120}
          variant={{
            variant: isCurrent(StaticRoutes.thesis) ? 'primary' : 'tertiary',
          }}
          leftSection={<MagnifyingGlass size={14} />}
          onClick={() => push(StaticRoutes.thesis)}
        >
          Cari Skripsi
        </Button>
        <Button
          miw={120}
          variant={{
            variant: isCurrent(StaticRoutes.users) ? 'primary' : 'tertiary',
          }}
          leftSection={<User size={14} />}
          onClick={() => push(StaticRoutes.users)}
        >
          Cari Penulis
        </Button>
        <Button
          miw={120}
          leftSection={<SignIn size={14} />}
          onClick={() => push(StaticRoutes.login)}
        >
          Login
        </Button>
        <Button
          variant={{
            variant: 'secondary',
          }}
          miw={120}
          leftSection={<UserPlus size={14} />}
          onClick={() => push(StaticRoutes.register)}
        >
          Register
        </Button>
        {/* <Button
          miw={120}
          variant={{
            variant: 'tertiaryError',
          }}
          leftSection={<SignOut size={14} />}
          onClick={() => push(StaticRoutes.login)}
        >
          Keluar
        </Button> */}
      </div>
    </Card>
  );
}
