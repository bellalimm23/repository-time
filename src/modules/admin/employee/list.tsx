import { Flex, SimpleGrid } from '@mantine/core';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import Select from 'components/elements/select';
import TextInput from 'components/elements/text-input';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  EmployeeModel,
  employees,
  EmployeeStatusEnum,
} from './components/employee-form-type';
import FormLabel from '../components/form-label';

export function useGetEmployeeTableList(): Column<EmployeeModel>[] {
  return [
    {
      label: 'Foto Profil',
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
      label: 'Nomor Identitas',
      data: (row) => row.nomor_identitas,
    },
    {
      label: 'Nama',
      data: (row) =>
        [row.nama_depan, row.nama_tengah, row.nama_belakang]
          .filter(Boolean)
          .join(' '),
    },
    {
      label: 'Status Karyawan',
      data: (row) => row.status,
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminEmployeeView}
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

export default function EmployeeList() {
  const columns = useGetEmployeeTableList();
  const { push } = useRouter();
  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminEmployeeCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          label="Filter"
          placeholder="Cari nomor identitas atau nama "
        />
        <Select
          label="Status"
          searchable
          defaultValue={EmployeeStatusEnum.active}
          placeholder="Filter Status"
          data={[
            { value: EmployeeStatusEnum.active, label: 'Aktif' },
            { value: EmployeeStatusEnum.inactive, label: 'Tidak Aktif' },
          ]}
        />
      </SimpleGrid>
      <TableComponent
        columns={columns}
        data={employees}
        rowKey={(row) => row.nomor_identitas}
        onClickRow={(row) =>
          push({
            pathname: NavigationRoute.AdminEmployeeView,
            query: { id: row.nomor_identitas },
          })
        }
      />
    </>
  );
}
