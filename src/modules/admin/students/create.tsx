import AdminStudentForm from './components/student-form';

export default function AdminStudentCreate() {
  return (
    <AdminStudentForm
      onSubmit={async (value) => {
        return undefined;
      }}
    />
  );
}
