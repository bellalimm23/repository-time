import { useRouter } from 'next/router';

import AdminStudentForm from './components/student-form';
import { students } from './components/student-form-type';

export default function AdminStudentView() {
  const { query } = useRouter();
  const id = query.id as string;
  const student = students.find((student) => student.nomor_identitas === id);
  return (
    <AdminStudentForm
      student={student}
      onSubmit={async (value) => {
        return undefined;
      }}
    />
  );
}
