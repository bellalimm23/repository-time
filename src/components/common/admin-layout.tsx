import { AppShell, AppShellMainProps, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { Bank, Book, Chair, SignOut, User } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import { Brand } from 'common/constants/brand';
import { StaticRoutes, StaticRoutesType } from 'common/routes/routes';
import Button, { ButtonProps } from 'components/elements/button';
import Text from 'components/elements/text';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import { useRouter } from 'next/router';
import React from 'react';
import structuralStyles from 'styles/layout.css';

export interface AdminLayoutProps extends AppShellMainProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { pathname, push } = useRouter();
  const isCurrent = React.useCallback(
    (link: StaticRoutesType) => {
      return pathname.includes(link);
    },
    [pathname],
  );

  const actions = React.useMemo<ButtonProps[]>(() => {
    return [
      {
        children: 'Tugas Akhir',
        onClick: () => push(StaticRoutes.adminThesis),
        variant: {
          variant: isCurrent(StaticRoutes.adminThesis) ? 'primary' : 'tertiary',
        },
        leftSection: <Icons.Book size={16} />,
      },
      {
        children: 'Users',
        onClick: () => push(StaticRoutes.adminUser),
        variant: {
          variant: isCurrent(StaticRoutes.adminUser) ? 'primary' : 'tertiary',
        },
        leftSection: <Icons.User size={16} />,
      },
      {
        children: 'Fakultas',
        onClick: () => push(StaticRoutes.adminDivision),
        variant: {
          variant: isCurrent(StaticRoutes.adminDivision)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Icons.Bank size={16} />,
      },
      {
        children: 'Jurusan',
        onClick: () => push(StaticRoutes.adminSubject),
        variant: {
          variant: isCurrent(StaticRoutes.adminSubject)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Icons.Chair size={16} />,
      },
    ];
  }, [isCurrent, push]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        className={structuralStyles.flexbox({
          direction: 'row',
          gap: 'xs',
        })}
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <BrandIconDirectHome isAdmin />
        <Text textVariant="body1Semibold">{Brand.name}</Text>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          {actions.map((action) => {
            return <Button {...action} fullWidth />;
          })}
        </AppShell.Section>
        <AppShell.Section>
          <Button
            variant={{
              variant: 'tertiaryError',
            }}
            fullWidth
            onClick={() => push(StaticRoutes.adminLogin)}
            leftSection={<Icons.SignOut size={16} />}
          >
            Logout
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main {...props} />
    </AppShell>
  );
}
