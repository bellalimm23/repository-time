import { Flex } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useGetStudents } from 'api-hooks/student/query';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import FormLabel from 'modules/admin/components/form-label';
import { useRouter } from 'next/router';

import StudentItem from './student-item';

export default function StudentList() {
  const { push } = useRouter();
  const queryStudents = useGetStudents();
  return (
    <Flex direction="column" w="100%" maw={768} mih="100vh" gap={4}>
      <FormLabel mx={16} mt={16} />
      <TextInput
        mx={16}
        leftSection={<MagnifyingGlass size={16} />}
        placeholder="Cari identitas mahasiswa"
      />
      <LoaderView query={queryStudents}>
        {({ data }) => {
          const students = data;
          return (
            <>
              {students.length === 0 && <Text p={16}>Tidak ada data</Text>}
              {students.map((student, index) => {
                return (
                  <div
                    onClick={() => {
                      push({
                        pathname: NavigationRoute.StudentView,
                        query: { id: student.nomorIdentitas },
                      });
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: 8,
                      marginLeft: 8,
                      marginRight: 8,
                      borderBottom:
                        index === students.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                    }}
                  >
                    <StudentItem key={student.nomorIdentitas} {...student} />
                  </div>
                );
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
