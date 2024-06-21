import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  StudyProgramFormSchema,
  StudyProgramFormType,
  StudyProgramModel,
} from './study-program-form-type';

interface AdminStudyProgramFormProps {
  studyProgram?: StudyProgramModel;
  onSubmit: (
    values: StudyProgramFormType,
  ) => Promise<StudyProgramModel | undefined>;
}

export default function AdminStudyProgramForm(
  props: AdminStudyProgramFormProps,
) {
  const { studyProgram, onSubmit } = props;
  const defaultValues = React.useMemo<StudyProgramFormType>(() => {
    return {
      kode_program_studi: studyProgram?.kode_program_studi || '',
      nama_program_studi: studyProgram?.nama_program_studi || '',
      data: studyProgram,
    };
  }, [studyProgram]);
  const resolver = useYupValidationResolver(StudyProgramFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!studyProgram}>
      <FormLabel />
      <Input
        type="text"
        name="kode_program_studi"
        label="Kode Program Studi"
        placeholder="Masukkan Kode Program Studi"
      />
      <Input
        type="text"
        name="nama_program_studi"
        label="Nama Program Studi"
        placeholder="Masukkan Nama Program Studi"
      />
      <FormAction />
    </Form>
  );
}
