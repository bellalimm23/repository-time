import { SimpleGrid, Tabs } from '@mantine/core';
import { userType } from 'common/constants/user';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { subjects } from 'modules/admin/admin-subject/components/form-type';
import { AdminThesisTable } from 'modules/admin/admin-thesis/list';
import FormHeader from 'modules/components/form-header';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminUserFormSchema,
  AdminUserFormType,
  AdminUserMethodType,
  UserModel,
  UserTab,
} from './form-type';

interface AdminUserProps {
  adminUser?: UserModel;
  onSubmit: (
    values: AdminUserFormType,
    form: AdminUserMethodType,
  ) => Promise<any>;
}

function UserInformationPanel() {
  const noMargin = true;

  return (
    <SimpleGrid cols={1}>
      <div>
        <Text>Foto Profil</Text>
        <Image
          src="/assets/photo-profile-example.jpeg"
          width={128}
          height={128}
          alt="photo-profile"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

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
        data={subjects.map((subject) => {
          return {
            value: subject.id,
            label: [subject.kode, subject.nama].join(' - '),
          };
        })}
        required
        noMargin={noMargin}
      />
      <Input
        type="text"
        name="nomor_identitas"
        label="Nomor Identitas"
        placeholder="Nomor Identitas"
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
            value: userType.admin,
          },
          {
            label: 'User',
            value: userType.user,
          },
        ]}
      />
    </SimpleGrid>
  );
}

export default function AdminUserForm(props: AdminUserProps) {
  const { adminUser } = props;
  const defaultValues = React.useMemo<AdminUserFormType>(() => {
    return {
      photo_url: adminUser?.photo_url || '',
      nama_belakang: adminUser?.nama_belakang || '',
      nama_depan: adminUser?.nama_depan || '',
      nama_tengah: adminUser?.nama_tengah || '',
      password: adminUser?.password || '',
      nomor_identitas: adminUser?.nomor_identitas || '',
      jurusan_id: adminUser?.jurusan?.id || '1',
      tipe_user: adminUser?.tipe_user || 'admin',
    };
  }, [adminUser]);

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

  const onClickDeleteUser = React.useCallback(() => {}, []);

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit} defaultEditable={!adminUser}>
        <FormHeader
          title={props.adminUser ? 'Edit User' : 'Buat User'}
          data={props.adminUser}
          onClickDelete={onClickDeleteUser}
        />
        <Separator gap={16} />
        {adminUser ? (
          <Tabs defaultValue={UserTab.information}>
            <Tabs.List>
              <Tabs.Tab value={UserTab.information}>Informasi User</Tabs.Tab>
              <Tabs.Tab value={UserTab.thesis}>Daftar Tugas Akhir</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={UserTab.information}>
              <Separator gap={16} />
              <UserInformationPanel />
            </Tabs.Panel>
            <Tabs.Panel value={UserTab.thesis}>
              <Separator gap={16} />
              <AdminThesisTable />
            </Tabs.Panel>
          </Tabs>
        ) : (
          <UserInformationPanel />
        )}
      </Form>
    </>
  );
}
