import { SimpleGrid } from '@mantine/core';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormHeader from 'modules/components/form-header';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminUserFormSchema,
  AdminUserFormType,
  AdminUserMethodType,
} from './form-type';

interface AdminUserProps {
  adminUser?: any;
  onSubmit: (
    values: AdminUserFormType,
    form: AdminUserMethodType,
  ) => Promise<any>;
}

export default function AdminUserForm(props: AdminUserProps) {
  const defaultValues = React.useMemo<AdminUserFormType>(() => {
    return {
      nama_belakang: '',
      nama_depan: '',
      nama_tengah: '',
      password: '',
      username: '',
      jurusan_id: 'sistem_informasi',
      tipe_user: 'admin',
    };
  }, []);

  const resolver = useYupValidationResolver(AdminUserFormSchema());

  const methods = useForm<AdminUserFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminUserFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [methods, props],
  );

  const noMargin = true;

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormHeader
        title={props.adminUser ? 'Edit User' : 'Buat User'}
        data={props.adminUser}
      />
      <Separator gap={16} />
      <SimpleGrid cols={1}>
        <Input
          type="text"
          name="nama_depan"
          label="Nama Depan"
          placeholder="Nama Depan"
          required
          noMargin={noMargin}
        />
        <Input
          type="text"
          name="nama_tengah"
          label="Nama Tengah"
          placeholder="Nama Tengah"
          noMargin={noMargin}
        />
        <Input
          type="text"
          name="nama_belakang"
          label="Nama Belakang"
          placeholder="Nama Belakang"
          noMargin={noMargin}
        />
        <Input
          type="select"
          name="jurusan_id"
          label="Jurusan"
          placeholder="Jurusan"
          data={[
            { label: 'Sistem Informasi', value: 'sistem_informasi' },
            { label: 'Teknik Informatika', value: 'teknik_informatika' },
          ]}
          required
          noMargin={noMargin}
        />
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
          required
          noMargin={noMargin}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          required
          noMargin={noMargin}
        />
        <Input
          type="radio-group"
          name="tipe_user"
          label="Tipe User"
          data={[
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ]}
        />
      </SimpleGrid>
    </Form>
  );
}
