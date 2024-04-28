import { Flex, SimpleGrid } from '@mantine/core';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import TextInput from 'components/elements/text-input';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';

import {
  StudyProgramModel,
  studyPrograms,
} from './components/study-program-form-type';
import FormLabel from '../components/form-label';

export function useGetStudyProgramTableList(): Column<StudyProgramModel>[] {
  return [
    {
      label: 'Kode Program Studi - Program Studi',
      data: (row) =>
        [row.kode_program_studi, row.nama_program_studi].join(' - '),
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminStudyProgramView}
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

export default function StudyProgramList() {
  const columns = useGetStudyProgramTableList();
  const { push } = useRouter();
  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminStudyProgramCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          label="Filter"
          placeholder="Cari kode atau nama program studi"
        />
      </SimpleGrid>
      <TableComponent
        columns={columns}
        data={studyPrograms}
        rowKey={(row) => row.id}
        onClickRow={(row) =>
          push({
            pathname: NavigationRoute.AdminStudyProgramView,
            query: { id: row.id },
          })
        }
      />
    </>
  );
}
