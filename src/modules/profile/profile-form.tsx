import { FileWithPath } from '@mantine/dropzone';
import { uploadPhotoProfile } from 'api/storage';
import { MeModel } from 'api-hooks/auth/model';
import { useProfile } from 'api-hooks/auth/mutation';
import { meKey } from 'api-hooks/auth/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import {
  StudentFormSchema,
  StudentFormType,
} from 'modules/admin/students/components/student-form-type';
import StudentInformationForm from 'modules/admin/students/components/student-information-form';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  student: MeModel;
  onClose: () => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { student } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<StudentFormType>(() => {
    return {
      deskripsi: student?.deskripsi ?? '',
      nama_belakang: student?.namaBelakang ?? '',
      nama_depan: student?.namaDepan ?? '',
      nama_tengah: student?.namaTengah ?? '',
      nomor_identitas: student.nomorIdentitas || '',
      program_studi_id: student?.programStudiId ?? '',
      data: student,
    };
  }, [student]);
  const resolver = useYupValidationResolver(StudentFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });
  const { mutateAsync } = useProfile();
  const onSubmit = React.useCallback(
    async (values: StudentFormType) => {
      try {
        const file = files[0];
        file && (await uploadPhotoProfile(student.nomorIdentitas, file));
        const result = await mutateAsync(values);
        notification.success({
          message: result.message,
        });
        queryClient.refetchQueries({
          queryKey: meKey.me,
        });
        props.onClose();
      } catch (e) {
        notification.error({ message: e.message });
      }
    },
    [files, mutateAsync, props, student.nomorIdentitas],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <StudentInformationForm files={files} setFiles={setFiles} />
    </Form>
  );
}
