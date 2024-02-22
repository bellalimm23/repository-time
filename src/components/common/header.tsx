import { Burger, Card, Modal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import { MagnifyingGlass, SignIn, User, UserPlus } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import { StaticRoutes, StaticRoutesType } from 'common/routes/routes';
import breakpoints from 'common/styles/breakpoint';
import Button, { ButtonProps } from 'components/elements/button';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import { useRouter } from 'next/router';
import React from 'react';
import structuralStyles from 'styles/layout.css';

export default function Header() {
  const { pathname, push } = useRouter();
  const [isOpened, { open, close }] = useDisclosure();
  const isCurrent = React.useCallback(
    (link: StaticRoutesType) => pathname.includes(link),
    [pathname],
  );

  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const authActions = React.useMemo<ButtonProps[]>(() => {
    const size = isMobile ? 'small' : undefined;
    const miw = isMobile ? undefined : 120;
    return [
      {
        variant: {
          size,
          variant: 'primary',
        },
        miw,
        leftSection: <Icons.SignIn size={14} />,
        onClick: () => push(StaticRoutes.login),
        children: 'Login',
      },
      {
        variant: {
          size,
          variant: 'secondary',
        },
        miw,
        leftSection: <Icons.UserPlus size={14} />,
        onClick: () => push(StaticRoutes.register),
        children: 'Register',
      },
      // {
      //   miw: 120,
      //   variant: {
      //     variant: 'tertiaryError',
      //   },
      //   leftSection: <SignOut size={14} />,
      //   onClick: () => push(StaticRoutes.login),
      //   children: 'Logout',
      // },
    ];
  }, [isMobile, push]);

  const actions = React.useMemo<ButtonProps[]>(() => {
    return [
      {
        miw: 120,
        variant: {
          variant: isCurrent(StaticRoutes.thesis) ? 'primary' : 'tertiary',
        },
        leftSection: <Icons.MagnifyingGlass size={14} />,
        onClick: () => push(StaticRoutes.thesis),
        children: 'Cari Skripsi',
      },
      {
        miw: 120,
        variant: {
          variant: isCurrent(StaticRoutes.users) ? 'primary' : 'tertiary',
        },
        leftSection: <Icons.User size={14} />,
        onClick: () => push(StaticRoutes.users),
        children: 'Cari Penulis',
      },
    ];
  }, [isCurrent, push]);

  return (
    <>
      <Card
        withBorder
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
        <div
          className={structuralStyles.flexbox({
            direction: 'row',
            gap: 'sm',
          })}
        >
          {isMobile && <Burger size={16} opened={isOpened} onClick={open} />}
          <BrandIconDirectHome />
        </div>
        <div
          className={classNames(
            structuralStyles.flexbox({
              direction: 'row',
              gap: 'md',
            }),
          )}
        >
          {!isMobile && (
            <>
              {actions.map((action) => (
                <Button {...action} />
              ))}
            </>
          )}
          {authActions.map((action) => (
            <Button {...action} />
          ))}
        </div>
      </Card>
      <Modal opened={isOpened} onClose={close} withCloseButton={false} centered>
        <div
          className={structuralStyles.flexbox({
            direction: 'column',
            gap: 'md',
          })}
        >
          {actions.map((action) => (
            <Button fullWidth {...action} />
          ))}
        </div>
      </Modal>
    </>
  );
}
