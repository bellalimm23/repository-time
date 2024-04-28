import { FileWithPath } from '@mantine/dropzone';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import ThesisFormInformation from 'modules/admin/thesis/components/thesis-form-information';
import {
  ThesisFormSchema,
  ThesisFormType,
  ThesisModel,
  ThesisStatusEnum,
} from 'modules/admin/thesis/components/thesis-form-type';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ThesisFormProps {
  thesis?: ThesisModel;
  onSubmit: (value: ThesisFormType) => Promise<ThesisModel | undefined>;
}

export default function ThesisForm(props: ThesisFormProps) {
  const { onSubmit, thesis } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<ThesisFormType>(() => {
    return {
      abstrak: thesis?.abstrak ?? '',
      judul_tugas_akhir: thesis?.judul_tugas_akhir ?? '',
      nomor_identitas_mahasiswa: thesis?.mahasiswa?.nomor_identitas ?? '',
      nomor_identitas_pic: thesis?.pic?.nomor_identitas ?? '',
      status: thesis?.status ?? ThesisStatusEnum.pending,
      waktu_terbit: thesis?.waktu_terbit ?? null,
      data: thesis,
    };
  }, [thesis]);

  const resolver = useYupValidationResolver(ThesisFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!thesis}>
      <ThesisFormInformation files={files} setFiles={setFiles} />
    </Form>
  );
}
