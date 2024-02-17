import { useMediaQuery } from '@mantine/hooks';
import * as Icons from '@phosphor-icons/react';
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

import { SubjectModel, subjects } from './components/form-type';
import ButtonRedirect from '../components/button-redirect';

function useGetAdminSubjectTableList() {
  const columns = React.useMemo<Column<SubjectModel>[]>(() => {
    return [
      {
        label: '',
        data: (row) => (
          <TableActionRedirect
            route={{
              type: 'dynamic',
              dynamicRoute: 'adminSubjectShow',
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
        data: (row) => [row.kode, row.nama].join('-'),
        label: 'Jurusan',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) => row.fakultas.nama,
        label: 'Fakultas',
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

export default function AdminSubjectList() {
  const columns = useGetAdminSubjectTableList();
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
        <Text textVariant="h1">Daftar Jurusan</Text>
        <ButtonRedirect
          route={{
            staticRoute: '/admin/subjects/create',
            type: 'static',
          }}
          leftSection={<Icons.Plus size={16} />}
        >
          Buat Jurusan
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
        <TextInput placeholder="Cari Nama Jurusan" noMargin />
        {!isMobile && (
          <Button
            leftSection={<Icons.MagnifyingGlass weight="bold" />}
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
        data={subjects}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
