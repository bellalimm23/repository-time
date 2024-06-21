import { Flex } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import TextInput from 'components/elements/text-input';
import FormLabel from 'modules/admin/components/form-label';
import { students } from 'modules/admin/students/components/student-form-type';
import { useRouter } from 'next/router';

import StudentItem from './student-item';

export default function StudentList() {
  const { push } = useRouter();
  return (
    <Flex direction="column" w="100%" maw={768} mih="100vh" gap={4}>
      <FormLabel mx={16} mt={16} />
      <TextInput
        mx={16}
        leftSection={<MagnifyingGlass size={16} />}
        placeholder="Cari identitas mahasiswa"
      />
      {students.map((student, index) => {
        return (
          <div
            onClick={() => {
              push({
                pathname: NavigationRoute.StudentView,
                query: { id: student.nomor_identitas },
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
            <StudentItem key={student.nomor_identitas} {...student} />
          </div>
        );
      })}
    </Flex>
  );
}
