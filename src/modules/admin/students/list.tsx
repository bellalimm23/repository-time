import { Flex, SimpleGrid } from '@mantine/core';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import TextInput from 'components/elements/text-input';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { StudentModel, students } from './components/student-form-type';
import FormLabel from '../components/form-label';

export function useGetStudentTableList(): Column<StudentModel>[] {
  return [
    {
      label: '',
      tdProps(row) {
        return {
          style: {
            width: 64,
            height: 64,
          },
        };
      },
      data: (row) => (
        <Image
          alt={row.nomor_identitas}
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          width={64}
          height={64}
          src={row.photo_url || '/android-chrome-512x512.png'}
        />
      ),
    },
    {
      label: 'Nomor Identitas - Nama',
      data: (row) => {
        const name = [row.nama_depan, row.nama_tengah, row.nama_belakang]
          .filter(Boolean)
          .join(' ');
        return [row.nomor_identitas, name].join(' - ');
      },
    },
    {
      label: 'Program Studi',
      data: (row) =>
        [
          row.program_studi.kode_program_studi,
          row.program_studi.nama_program_studi,
        ].join(' - '),
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminStudentView}
              id={row.nomor_identitas}
              type="icon"
            />
            <DeleteButton type="icon" onClick={() => {}} />
          </Flex>
        );
      },
    },
  ];
}

export default function StudentList() {
  const columns = useGetStudentTableList();
  const { push } = useRouter();
  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminStudentCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          label="Filter"
          placeholder="Cari nomor identitas atau nama"
        />
      </SimpleGrid>
      <TableComponent
        columns={columns}
        data={students}
        rowKey={(row) => row.nomor_identitas}
        onClickRow={(row) =>
          push({
            pathname: NavigationRoute.AdminStudentView,
            query: { id: row.nomor_identitas },
          })
        }
      />
    </>
  );
}
