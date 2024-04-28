import AdminStudyProgramForm from './components/study-program-form';

export default function AdminStudyProgramCreate() {
  return (
    <AdminStudyProgramForm
      onSubmit={async (value) => {
        return undefined;
      }}
    />
  );
}
