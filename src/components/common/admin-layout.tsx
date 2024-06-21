import { AppShell, AppShellMainProps, Burger, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Bank,
  Book,
  GraduationCap,
  SignOut,
  User,
} from '@phosphor-icons/react';
import { useGetMe } from 'api-hooks/auth/query';
import { Brand } from 'common/constants/brand';
import { NavigationRoute } from 'common/routes/routes';
import Button, { ButtonProps } from 'components/elements/button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import { useRouter } from 'next/router';
import React from 'react';
import structuralStyles from 'styles/layout.css';

export interface AdminLayoutProps extends AppShellMainProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { pathname, push } = useRouter();
  const isCurrent = React.useCallback(
    (link: NavigationRoute) => {
      return pathname.includes(link);
    },
    [pathname],
  );

  const actions = React.useMemo<ButtonProps[]>(() => {
    return [
      {
        children: 'Tugas Akhir',
        onClick: () => push(NavigationRoute.AdminThesisList),
        variant: {
          variant: isCurrent(NavigationRoute.AdminThesisList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Book size={16} />,
      },
      {
        children: 'Mahasiswa',
        onClick: () => push(NavigationRoute.AdminStudentList),
        variant: {
          variant: isCurrent(NavigationRoute.AdminStudentList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <GraduationCap size={16} />,
      },
      {
        children: 'Program Studi',
        onClick: () => push(NavigationRoute.AdminStudyProgramList),
        variant: {
          variant: isCurrent(NavigationRoute.AdminStudyProgramList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Bank size={16} />,
      },
      {
        children: 'Admin',
        onClick: () => push(NavigationRoute.AdminEmployeeList),
        variant: {
          variant: isCurrent(NavigationRoute.AdminEmployeeList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <User size={16} />,
      },
    ];
  }, [isCurrent, push]);

  const queryMe = useGetMe();

  return (
    <LoaderView query={queryMe} isFullScreen>
      {({ data }) => {
        const isUser = data.type === 'user';

        if (isUser) {
          return (
            <Center pos="fixed" top={0} right={0} bottom={0} left={0}>
              <Text textVariant="display">404 Page Not Found</Text>
            </Center>
          );
        }

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
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
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
                  onClick={() => push(NavigationRoute.AdminLogin)}
                  leftSection={<SignOut size={16} />}
                >
                  Logout
                </Button>
              </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main {...props} />
          </AppShell>
        );
      }}
    </LoaderView>
  );
}
