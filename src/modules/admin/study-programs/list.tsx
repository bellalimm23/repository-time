import { Flex, SimpleGrid } from '@mantine/core';
import { StudyProgramLiteModel } from 'api-hooks/study-program/model';
import { useGetStudyPrograms } from 'api-hooks/study-program/query';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';

import FormLabel from '../components/form-label';

export function useGetStudyProgramTableList(): Column<StudyProgramLiteModel>[] {
  return [
    {
      label: 'Kode Program Studi - Program Studi',
      data: (row) => [row.kode, row.nama].join(' - '),
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
  const queryStudyPrograms = useGetStudyPrograms();
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
      <LoaderView query={queryStudyPrograms}>
        {({ data }) => {
          return (
            <TableComponent
              columns={columns}
              data={data}
              rowKey={(row) => row.id}
              onClickRow={(row) =>
                push({
                  pathname: NavigationRoute.AdminStudyProgramView,
                  query: { id: row.id },
                })
              }
            />
          );
        }}
      </LoaderView>
    </>
  );
}
