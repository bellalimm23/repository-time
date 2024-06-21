import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  OrganizationFormSchema,
  OrganizationFormType,
  OrganizationModel,
} from './organization-form-type';

interface OrganizationFormProps {
  organization?: OrganizationModel;
  onSubmit: (
    value: OrganizationFormType,
  ) => Promise<OrganizationModel | undefined>;
}

export default function OrganizationForm(props: OrganizationFormProps) {
  const { onSubmit, organization } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<OrganizationFormType>(() => {
    return {
      deskripsi: organization?.deskripsi ?? '',
      nama_organisasi: organization?.nama_organisasi ?? '',
      nomor_identitas_mahasiswa: organization?.mahasiswa?.nomor_identitas ?? '',
      pengalaman_id: '',
      skills: organization?.skills?.split('|') ?? [],
      waktu_mulai: organization?.waktu_mulai ?? null,
      waktu_selesai: organization?.waktu_selesai ?? null,
      posisi: organization?.posisi ?? '',
      data: organization,
    };
  }, [organization]);

  const resolver = useYupValidationResolver(OrganizationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!organization}>
      <Input
        type="text"
        name="posisi"
        label="Posisi"
        placeholder="Masukkan Posisi"
      />
      <Input
        type="text"
        name="nama_organisasi"
        label="Nama Organisasi"
        placeholder="Masukkan Nama Organisasi"
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
        defaultUrls={organization?.items?.map((item) => item.file_url)}
      />
    </Form>
  );
}
