import { FileWithPath } from '@mantine/dropzone';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import PhotoProfileInput from 'components/photo-profile-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  EmployeeFormSchema,
  EmployeeFormType,
  EmployeeModel,
  EmployeeStatusEnum,
} from './employee-form-type';

interface EmployeeFormProps {
  employee?: EmployeeModel;
  onSubmit: (values: EmployeeFormType) => Promise<EmployeeModel | undefined>;
}

export default function EmployeeForm(props: EmployeeFormProps) {
  const { onSubmit, employee } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<EmployeeFormType>(() => {
    return {
      nama_depan: employee?.nama_depan || '',
      nama_tengah: employee?.nama_tengah || '',
      nama_belakang: employee?.nama_belakang || '',
      deskripsi: employee?.deskripsi || '',
      password: employee?.password || '',
      status: employee?.status || EmployeeStatusEnum.active,
      data: employee,
    };
  }, [employee]);

  const resolver = useYupValidationResolver(EmployeeFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!employee}>
      <FormLabel />
      <PhotoProfileInput
        label="Foto Profil"
        defaultImage={employee?.photo_url}
        files={files}
        onDrop={setFiles}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nama_depan"
        label="Nama Depan"
        placeholder="Masukkan Nama Depan"
      />
      <Input
        type="text"
        name="nama_tengah"
        label="Nama Tengah"
        placeholder="Masukkan Nama Tengah"
      />
      <Input
        type="text"
        name="nama_belakang"
        label="Nama Belakang"
        placeholder="Masukkan Nama Belakang"
      />
      {!props.employee && (
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Masukkan Password"
        />
      )}
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
      <FormAction />
    </Form>
  );
}
