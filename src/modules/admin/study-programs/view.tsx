import { useRouter } from 'next/router';

import AdminStudyProgramForm from './components/study-program-form';
import { studyPrograms } from './components/study-program-form-type';

export default function AdminStudyProgramView() {
  const { query } = useRouter();
  const id = query.id as string;
  const studyProgram = studyPrograms.find(
    (studyProgram) => studyProgram.id === id,
  );
  return (
    <AdminStudyProgramForm
      onSubmit={async (value) => {
        return undefined;
      }}
      studyProgram={studyProgram}
    />
  );
}
