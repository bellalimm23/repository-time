import { useCreateStudent } from 'api-hooks/student/mutation';
import { studentKey } from 'api-hooks/student/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';

import AdminStudentForm from './components/student-form';

export default function AdminStudentCreate() {
  const { replace } = useRouter();
  const { mutateAsync } = useCreateStudent();
  return (
    <AdminStudentForm
      onSubmit={async (value) => {
        const result = await mutateAsync(value);
        notification.success({
          message: result.message,
        });
        replace({
          pathname: NavigationRoute.AdminStudentView,
          query: { id: result.data.nomorIdentitas },
        });
        queryClient.refetchQueries({
          queryKey: studentKey.list(),
        });
        return result.data;
      }}
    />
  );
}
