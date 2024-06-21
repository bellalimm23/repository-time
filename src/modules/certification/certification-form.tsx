import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  CertificationFormSchema,
  CertificationFormType,
  CertificationModel,
} from './certification-form-type';

interface CertificationFormProps {
  certification?: CertificationModel;
  onSubmit: (
    value: CertificationFormType,
  ) => Promise<CertificationModel | undefined>;
}

export default function CertificationForm(props: CertificationFormProps) {
  const { onSubmit, certification } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<CertificationFormType>(() => {
    return {
      nomor_identitas_mahasiswa:
        certification?.mahasiswa?.nomor_identitas ?? '',
      deskripsi: certification?.deskripsi ?? '',
      nama_institusi: certification?.nama_institusi ?? '',
      nama_sertifikasi: certification?.nama_sertifikasi ?? '',
      nilai_akhir: certification?.nilai_akhir ?? '',
      skills: certification?.skills?.split('|') ?? [],
      waktu_kadaluarsa: certification?.waktu_kadaluarsa ?? null,
      waktu_terbit: certification?.waktu_terbit || new Date(),
      data: certification,
    };
  }, [certification]);

  const resolver = useYupValidationResolver(CertificationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!certification}
    >
      <Input
        type="text"
        name="nama_sertifikasi"
        label="Nama Sertifikasi"
        placeholder="Masukan Nama Sertifikasi"
      />
      <Input
        type="text"
        name="nama_institusi"
        label="Nama Institusi"
        placeholder="Masukan Nama Institusi"
      />
      <SimpleGrid cols={2}>
        <Input
          type="date"
          name="waktu_terbit"
          label="Waktu Terbit"
          placeholder="Masukkan Waktu Terbit"
        />
        <Input
          type="date"
          name="waktu_kadaluarsa"
          label="Waktu Kadaluarsa"
          placeholder="Masukkan Waktu Kadaluarsa"
        />
      </SimpleGrid>
      <Input
        type="text"
        name="nilai_akhir"
        label="Nilai Akhir"
        placeholder="Masukan Nilai Akhir"
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
        defaultUrls={certification?.items?.map((item) => item.file_url)}
      />
    </Form>
  );
}
