import { Card } from '@mantine/core';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { useFormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import {
  generateSubjectName,
  subjects,
} from 'modules/admin/admin-subject/components/form-type';
import { users } from 'modules/admin/admin-user/components/form-type';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import ButtonForm from './button-form';
import { ChangePassword } from './change-password';
import { ProfileFormSchema, ProfileFormType } from './form-type';

function ProfileButtonContainer() {
  const { editable } = useFormState();

  if (editable) {
    return <ButtonForm />;
  } else {
    return (
      <>
        <ButtonForm />
        <Separator gap={16} />
        <ChangePassword />
      </>
    );
  }
}

export default function Profile() {
  const defaultValues = React.useMemo<ProfileFormType>(() => {
    return {
      photo_url: users[0].photo_url || '',
      jurusan_id: users[0].jurusan.id || '',
      nama_belakang: users[0].nama_belakang || '',
      nama_depan: users[0].nama_depan || '',
      nama_tengah: users[0].nama_tengah || '',
      nomor_identitas: users[0].nomor_identitas || '',
    };
  }, []);

  const resolver = useYupValidationResolver(ProfileFormSchema());

  const methods = useForm<ProfileFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: ProfileFormType) => {
    try {
    } catch (e) {
      notification.error({
        message: e.message,
      });
    }
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!users[0]}>
      <Card withBorder radius="md" shadow="xs">
        <Text textVariant="h1">Profil</Text>
        <Separator gap={24} />
        <Text>Foto Profil</Text>
        <Image
          src="/assets/photo-profile-example.jpeg"
          width={128}
          height={128}
          alt="photo-profile"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <Input
          mt={16}
          type="text"
          name="nomor_identitas"
          label="Nomor Identitas"
          placeholder="Nomor Identitas"
          required
        />
        <Input
          type="select"
          name="jurusan_id"
          label="Jurusan"
          placeholder="Jurusan"
          data={subjects.map((subject) => {
            return {
              value: subject.id,
              label: generateSubjectName(subject),
            };
          })}
          required
        />
        <Input
          type="text"
          name="nama_depan"
          label="Nama Depan"
          placeholder="Nama Depan"
          required
        />
        <Input
          type="text"
          name="nama_tengah"
          label="Nama Tengah"
          placeholder="Nama Tengah"
        />
        <Input
          type="text"
          name="nama_belakang"
          label="Nama Belakang"
          placeholder="Nama Belakang"
        />
        <Separator gap={16} />
        <ProfileButtonContainer />
      </Card>
    </Form>
  );
}
