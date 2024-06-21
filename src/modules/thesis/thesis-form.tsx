import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import { ThesisLiteModel, ThesisModel } from 'api-hooks/thesis/model';
import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import ThesisFormInformation from 'modules/admin/thesis/components/thesis-form-information';
import {
  ThesisFormSchema,
  ThesisFormType,
  ThesisStatusEnum,
} from 'modules/admin/thesis/components/thesis-form-type';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ThesisFormProps {
  thesis?: ThesisLiteModel;
  onSubmit: (
    value: ThesisFormType,
    lampiran: string[],
  ) => Promise<ThesisModel | undefined>;
}

export default function ThesisForm(props: ThesisFormProps) {
  const { thesis } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<ThesisFormType>(() => {
    return {
      abstrak: thesis?.abstrak ?? '',
      judul_tugas_akhir: thesis?.judulTugasAkhir ?? '',
      nomor_identitas_mahasiswa: thesis?.nomorIdentitasMahasiswa ?? '',
      nomor_identitas_pic: '',
      status: thesis?.status ?? ThesisStatusEnum.pending,
      waktu_terbit: thesis?.tanggalTerbit ?? null,
      data: thesis,
    };
  }, [thesis]);

  const resolver = useYupValidationResolver(ThesisFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const oldAttachments = (thesis?.lampiranTugasAkhir || []).map(
    (item) => item.fileUrl,
  );

  const onSubmit = React.useCallback(
    async (values: ThesisFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_thesis',
          values.nomor_identitas_mahasiswa,
          files,
          oldAttachments,
        );
        await props.onSubmit(values, results);
        await onDeleteFiles();
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [files, oldAttachments, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!thesis}>
      <ThesisFormInformation files={files} setFiles={setFiles} />
    </Form>
  );
}
