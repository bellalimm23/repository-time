import { useMediaQuery } from '@mantine/hooks';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import TableComponent from 'components/common/table/table';
import TableActionRedirect from 'components/common/table/table-action-redirect';
import { Column } from 'components/common/table/types';
import Button from 'components/elements/button';
import Select from 'components/elements/select';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import React from 'react';
import structuralStyles from 'styles/layout.css';

import { UserModel, users } from './components/form-type';
import ButtonRedirect from '../components/button-redirect';

function useGetAdminUserTableList() {
  const columns = React.useMemo<Column<UserModel>[]>(() => {
    return [
      {
        label: '',
        data: (row) => (
          <TableActionRedirect
            route={{
              type: 'dynamic',
              dynamicRoute: 'adminUserShow',
              id: row.id,
            }}
          />
        ),
        tdProps(row) {
          return {
            width: 48,
          };
        },
      },
      {
        data: (row) => row.username,
        label: 'Username',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) =>
          [row.nama_depan, row.nama_tengah, row.nama_belakang]
            .filter((val) => !!val)
            .join(' '),
        label: 'Nama',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) => row.jurusan,
        label: 'Jurusan',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) => row.tipe_user,
        label: 'Tipe User',
        tdProps: () => {
          return {
            maw: 100,
          };
        },
      },
    ];
  }, []);

  return columns;
}

export default function AdminUserList() {
  const columns = useGetAdminUserTableList();
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  return (
    <div>
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'row',
            justify: 'between',
          }),
        )}
      >
        <Text textVariant="h1">Daftar User</Text>
        <ButtonRedirect
          route={{
            staticRoute: '/admin/users/create',
            type: 'static',
          }}
          leftSection={<Plus size={16} />}
        >
          Buat User
        </ButtonRedirect>
      </div>
      <Separator gap={16} />
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'row',
            gap: 'md',
          }),
        )}
      >
        <TextInput placeholder="Cari username, nama" noMargin />
        <Select
          defaultValue="user"
          data={[
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ]}
          noMargin
        />
        {!isMobile && (
          <Button
            leftSection={<MagnifyingGlass weight="bold" />}
            variant={{
              variant: 'tertiary',
            }}
          >
            Filter
          </Button>
        )}
      </div>
      <Separator gap={16} />
      <TableComponent
        columns={columns}
        data={users}
        rowKey={(row) => row.username}
      />
    </div>
  );
}
