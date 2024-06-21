import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ExperienceFormSchema,
  ExperienceFormType,
  ExperienceModel,
} from './experience-form-type';

interface ExperienceFormProps {
  experience?: ExperienceModel;
  onSubmit: (value: ExperienceFormType) => Promise<ExperienceModel | undefined>;
}

export default function ExperienceForm(props: ExperienceFormProps) {
  const { onSubmit, experience } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<ExperienceFormType>(() => {
    return {
      deskripsi: experience?.deskripsi ?? '',
      lokasi: experience?.lokasi ?? '',
      nama_perusahaan: experience?.nama_perusahaan ?? '',
      nomor_identitas_mahasiswa: experience?.mahasiswa?.nomor_identitas ?? '',
      posisi: experience?.posisi ?? '',
      skills: experience?.skills?.split('|') ?? [],
      waktu_mulai: experience?.waktu_mulai ?? null,
      waktu_selesai: experience?.waktu_selesai ?? null,
      data: experience,
    };
  }, [experience]);
  const resolver = useYupValidationResolver(ExperienceFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!experience}>
      <Input
        type="text"
        name="posisi"
        label="Posisi"
        placeholder="Masukkan Posisi"
      />
      <Input
        type="text"
        name="nama_perusahaan"
        label="Nama Perusahaan"
        placeholder="Masukkan Nama Perusahaan"
      />
      <Input
        type="text"
        name="lokasi"
        label="Lokasi"
        placeholder="Masukkan Lokasi"
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
        defaultUrls={experience?.items?.map((item) => item.file_url)}
      />
    </Form>
  );
}
