import { Badge, Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import { ThesisStatus, ThesisType } from 'common/constants/tesis';
import breakpoints from 'common/styles/breakpoint';
import { IEEEFormatName } from 'common/utils/string';
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

import { ThesisModel, thesis } from './components/form-type';
import {
  ThesisStatusPill,
  getThesisStatusStyle,
} from './components/thesis-status-pill';
import ButtonRedirect from '../components/button-redirect';

function useGetAdminThesisTableList() {
  const columns = React.useMemo<Column<ThesisModel>[]>(() => {
    return [
      {
        label: '',
        data: (row) => (
          <TableActionRedirect
            route={{
              type: 'dynamic',
              dynamicRoute: 'adminThesisShow',
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
        data: (row) => <ThesisStatusPill status={row.status} />,
        label: 'Status',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) => row.judul,
        label: 'Judul',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) =>
          row.users
            .map((user) => {
              return IEEEFormatName(
                user.nama_depan,
                user.nama_belakang,
                user.nama_depan,
              );
            })
            .join(', '),
        label: 'Penulis',
        tdProps: () => {
          return {
            maw: 180,
          };
        },
      },
      {
        data: (row) => [row.jurusan.kode, row.jurusan.nama].join(' - '),
        label: 'Tipe Thesis',
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

export function AdminThesisTable() {
  const columns = useGetAdminThesisTableList();
  return (
    <TableComponent columns={columns} data={thesis} rowKey={(row) => row.id} />
  );
}

export default function AdminThesisList() {
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
        <Text textVariant="h1">Daftar Tugas Akhir</Text>
        <ButtonRedirect
          route={{
            staticRoute: '/admin/thesis/create',
            type: 'static',
          }}
          leftSection={<Icons.Plus size={16} />}
        >
          Buat Tugas Akhir
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
        <TextInput placeholder="Cari judul, nama penulis" noMargin />
        <Select
          placeholder="Cari Tipe"
          noMargin
          w="120px"
          clearable
          data={[
            {
              label: 'Skripsi',
              value: ThesisType.skripsi,
            },
            {
              label: 'Tesis',
              value: ThesisType.tesis,
            },
          ]}
        />
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
      <Tabs defaultValue={ThesisStatus.pending}>
        <Tabs.List>
          <Tabs.Tab
            value={ThesisStatus.pending}
            rightSection={
              <Badge color={getThesisStatusStyle('pending')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Pending</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.approved}
            rightSection={
              <Badge color={getThesisStatusStyle('approved')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Diterima</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.uploading}
            rightSection={
              <Badge color={getThesisStatusStyle('uploading')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Sedang Upload</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.uploaded}
            rightSection={
              <Badge color={getThesisStatusStyle('uploaded')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Telah Upload</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.finished}
            rightSection={
              <Badge color={getThesisStatusStyle('finished')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Selesai</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.canceled}
            rightSection={
              <Badge color={getThesisStatusStyle('canceled')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Batal</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={ThesisStatus.takedown}
            rightSection={
              <Badge color={getThesisStatusStyle('takedown')}>12</Badge>
            }
          >
            <Text textVariant="body1Regular">Takedown</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Separator gap={16} />
      <AdminThesisTable />
    </div>
  );
}
