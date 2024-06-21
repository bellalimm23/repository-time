import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  EducationFormSchema,
  EducationFormType,
  EducationModel,
} from './education-form-type';

interface EducationFormProps {
  education?: EducationModel;
  onSubmit: (value: EducationFormType) => Promise<EducationModel | undefined>;
}

export default function EducationForm(props: EducationFormProps) {
  const { onSubmit, education } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<EducationFormType>(() => {
    return {
      deskripsi: education?.deskripsi ?? '',
      nama_institusi: education?.nama_institusi ?? '',
      nomor_identitas_mahasiswa: education?.mahasiswa?.nomor_identitas ?? '',
      skills: education?.skills?.split('|') ?? [],
      waktu_mulai: null,
      waktu_selesai: null,
      bidang_studi: education?.bidang_studi ?? '',
      gelar: education?.gelar ?? '',
      nilai_akhir: education?.nilai_akhir ?? '',
      data: education,
    };
  }, [education]);

  const resolver = useYupValidationResolver(EducationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!education}>
      <Input
        type="text"
        name="nama_institusi"
        label="Nama Institusi"
        placeholder="Masukkan Nama Institusi"
      />
      <Input
        type="text"
        name="bidang_studi"
        label="Bidang Studi"
        placeholder="Masukkan Bidang Studi"
      />
      <Input
        type="text"
        name="gelar"
        label="Gelar"
        placeholder="Masukkan Gelar"
      />
      <SimpleGrid cols={2}>
        <Input
          type="date"
          name="waktu_mulai"
          label="Waktu Mulai"
          placeholder="Masukkan Waktu Mulai"
        />
        <Input
          type="date"
          name="waktu_selesai"
          label="Waktu Selesai"
          placeholder="Masukkan Waktu Selesai"
        />
      </SimpleGrid>
      <Input
        type="text"
        name="nilai_akhir"
        label="Nilai Akhir"
        placeholder="Masukkan Nilai Akhir"
      />
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
      <Input type="tags" name="skills" label="Skills" />
      <FileInput
        files={files}
        onDrop={setFiles}
        label="Files"
        defaultUrls={education?.items?.map((item) => item.file_url)}
      />
    </Form>
  );
}
