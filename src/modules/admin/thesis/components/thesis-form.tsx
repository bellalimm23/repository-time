import { FileWithPath } from '@mantine/dropzone';
import Separator from 'components/common/separator';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import ThesisFormInformation from './thesis-form-information';
import {
  ThesisFormSchema,
  ThesisFormType,
  ThesisModel,
  ThesisStatusEnum,
} from './thesis-form-type';

interface ThesisFormProps {
  thesis?: ThesisModel;
  onSubmit: (value: ThesisFormType) => Promise<ThesisModel | undefined>;
}

export default function ThesisForm(props: ThesisFormProps) {
  const { thesis, onSubmit } = props;
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
    resolver,
    defaultValues,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!thesis}>
      <FormLabel />
      <ThesisFormInformation files={files} setFiles={setFiles} />
      <Separator gap={16} />
      <FormAction />
    </Form>
  );
}
