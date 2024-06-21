import { useUpdateStudent } from 'api-hooks/student/mutation';
import { studentKey, useGetStudent } from 'api-hooks/student/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import AdminStudentForm from './components/student-form';

export default function AdminStudentView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryStudent = useGetStudent({ params: { id } });
  const { mutateAsync } = useUpdateStudent();
  return (
    <LoaderView query={queryStudent}>
      {({ data }) => {
        const student = data;
        return (
          <AdminStudentForm
            student={student}
            onSubmit={async (value) => {
              const result = await mutateAsync({ data: value, id });
              queryClient.refetchQueries({
                queryKey: studentKey.list(),
              });
              queryClient.refetchQueries({
                queryKey: studentKey.view({ id }),
              });
              notification.success({
                message: result.message,
              });
              return result.data;
            }}
          />
        );
      }}
    </LoaderView>
  );
}
