import { Burger, Card, Modal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  Books,
  GraduationCap,
  MagnifyingGlass,
  Pen,
  SignIn,
  SignOut,
  // SignOut,
  User,
  UserPlus,
} from '@phosphor-icons/react';
import classNames from 'classnames';
import { NavigationRoute } from 'common/routes/routes';
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
    (link: NavigationRoute) => pathname.includes(link),
    [pathname],
  );

  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const authActions = React.useMemo<ButtonProps[]>(() => {
    const size = isMobile ? 'small' : undefined;
    const miw = isMobile ? undefined : 120;
    return [
      // {
      //   key: 'login',
      //   variant: {
      //     size,
      //     variant: 'primary',
      //   },
      //   miw,
      //   leftSection: <SignIn size={14} />,
      //   onClick: () => push(NavigationRoute.Login),
      //   children: 'Login',
      // },
      // {
      //   key: 'register',
      //   variant: {
      //     size,
      //     variant: 'secondary',
      //   },
      //   miw,
      //   leftSection: <UserPlus size={14} />,
      //   onClick: () => push(NavigationRoute.Register),
      //   children: 'Register',
      // },
      {
        key: 'logout',
        miw: 120,
        variant: {
          size,
          variant: 'tertiaryError',
        },
        leftSection: <SignOut size={14} />,
        onClick: () => push(NavigationRoute.Login),
        children: 'Logout',
      },
    ];
  }, [isMobile, push]);

  const actions = React.useMemo<ButtonProps[]>(() => {
    return [
      {
        key: 'tugas-akhir',
        miw: 120,
        variant: {
          variant: isCurrent(NavigationRoute.ThesisList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Books size={14} />,
        onClick: () => push(NavigationRoute.ThesisList),
        children: 'Tugas Akhir',
      },
      {
        key: 'user',
        miw: 120,
        variant: {
          variant: isCurrent(NavigationRoute.StudentList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <GraduationCap size={14} />,
        onClick: () => push(NavigationRoute.StudentList),
        children: 'Mahasiswa',
      },
      {
        key: 'profile',
        miw: 120,
        variant: {
          variant: isCurrent(NavigationRoute.Profile) ? 'primary' : 'tertiary',
        },
        leftSection: <User size={14} />,
        onClick: () => push(NavigationRoute.Profile),
        children: 'Profil',
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
              {actions.map((action: any) => (
                <Button key={action.key} {...action} />
              ))}
            </>
          )}
          {authActions.map((action: any) => (
            <Button key={action.key} {...action} />
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
