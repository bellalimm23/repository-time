import { FileWithPath } from '@mantine/dropzone';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import {
  StudentFormSchema,
  StudentFormType,
  StudentModel,
} from 'modules/admin/students/components/student-form-type';
import StudentInformationForm from 'modules/admin/students/components/student-information-form';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  student: StudentModel;
  onClose: () => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { student } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<StudentFormType>(() => {
    return {
      deskripsi: student?.deskripsi ?? '',
      nama_belakang: student?.nama_belakang ?? '',
      nama_depan: student?.nama_depan ?? '',
      nama_tengah: student?.nama_tengah ?? '',
      program_studi_id: student?.program_studi?.id ?? '',
      password: student?.password ?? '',
      data: student,
    };
  }, [student]);
  const resolver = useYupValidationResolver(StudentFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const onSubmit = React.useCallback(async () => {
    props.onClose();
  }, [props]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <StudentInformationForm files={files} setFiles={setFiles} />
    </Form>
  );
}
