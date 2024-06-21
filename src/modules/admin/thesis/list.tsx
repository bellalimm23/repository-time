import { Flex, SimpleGrid } from '@mantine/core';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import Select from 'components/elements/select';
import TextInput from 'components/elements/text-input';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';

import {
  thesis,
  ThesisModel,
  ThesisStatusEnum,
} from './components/thesis-form-type';
import FormLabel from '../components/form-label';

export function useGetThesisTableList(): Column<ThesisModel>[] {
  return [
    {
      label: 'Mahasiswa',
      data: (row) => {
        const mahasiswa = row.mahasiswa;
        const labelMahasiswa = [
          mahasiswa.nama_depan,
          mahasiswa.nama_tengah,
          mahasiswa.nama_belakang,
        ]
          .filter(Boolean)
          .join(' ');
        return [mahasiswa.nomor_identitas, labelMahasiswa].join(' - ');
      },
    },
    {
      label: 'Judul Tugas Akhir',
      data: (row) => row.judul_tugas_akhir,
    },
    {
      label: 'Status',
      data: (row) => row.status,
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.ThesisView}
              id={row.id}
              type="icon"
            />
            <DeleteButton type="icon" onClick={() => {}} />
          </Flex>
        );
      },
    },
  ];
}

export default function ThesisList() {
  const columns = useGetThesisTableList();
  const { push } = useRouter();
  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminThesisCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          label="Filter"
          placeholder="Cari identitas mahasiswa, atau judul"
        />
        <Select
          label="Status"
          searchable
          defaultValue={ThesisStatusEnum.pending}
          placeholder="Filter Status"
          data={[
            { value: ThesisStatusEnum.pending, label: 'Pending' },
            { value: ThesisStatusEnum.approve, label: 'Approve' },
            { value: ThesisStatusEnum.reject, label: 'Reject' },
          ]}
        />
      </SimpleGrid>
      <TableComponent
        columns={columns}
        data={thesis}
        rowKey={(row) => row.id}
        onClickRow={(row) =>
          push({
            pathname: NavigationRoute.AdminThesisView,
            query: { id: row.id },
          })
        }
      />
    </>
  );
}
