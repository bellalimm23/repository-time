import { useMediaQuery } from '@mantine/hooks';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import TableComponent from 'components/common/table/table';
import TableActionRedirect from 'components/common/table/table-action-redirect';
import { Column } from 'components/common/table/types';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import React from 'react';
import structuralStyles from 'styles/layout.css';

import { DivisionModel, divisions } from './components/form-type';
import ButtonRedirect from '../components/button-redirect';

function useGetAdminDivisionTableList() {
  const columns = React.useMemo<Column<DivisionModel>[]>(() => {
    return [
      {
        label: '',
        data: (row) => (
          <TableActionRedirect
            route={{
              type: 'dynamic',
              dynamicRoute: 'adminDivisionShow',
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
        data: (row) => row.nama,
        label: 'Nama Fakultas',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
    ];
  }, []);

  return columns;
}
export default function AdminDivisionList() {
  const columns = useGetAdminDivisionTableList();
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
        <Text textVariant="h1">Daftar Fakultas</Text>
        <ButtonRedirect
          route={{
            staticRoute: '/admin/divisions/create',
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
        <TextInput placeholder="Cari Nama Fakultas" noMargin />
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
        data={divisions}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
