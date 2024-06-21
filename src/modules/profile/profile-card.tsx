import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { Lock, Pen } from '@phosphor-icons/react';
import { MeModel } from 'api-hooks/auth/model';
import colors from 'common/styles/colors';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import Image from 'next/image';
import React from 'react';

import ChangePasswordForm from './change-password-form';
import ProfileForm from './profile-form';

interface ProfileCardProps {
  student: MeModel;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { student } = props;

  const [isOpened, { close, open }] = useDisclosure();
  const onChangePasswordClick = () =>
    modals.open({
      modalId: 'change-password',
      title: <Text textVariant="h1">Ganti Password</Text>,
      children: (
        <ChangePasswordForm onClose={() => modals.close('change-password')} />
      ),
    });

  return (
    <>
      <Card withBorder pos="relative">
        <Flex direction="column" gap={4}>
          <Text textVariant="h1">Profile</Text>
          <Text textVariant="body1Semibold">Foto Profil:</Text>
          <Image
            width={100}
            height={100}
            alt={student.nomorIdentitas}
            src={student.photoUrl || '/android-chrome-512x512.png'}
            style={{
              border: `1px solid ${colors.borderOverlay}`,
              objectPosition: 'top',
              objectFit: 'cover',
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/android-chrome-512x512.png';
            }}
          />
          <Text textVariant="body1Semibold">Nama Depan:</Text>
          <Text>{student.namaDepan}</Text>
          <Text textVariant="body1Semibold">Nama Tengah:</Text>
          <Text>{student.namaTengah || '-'}</Text>
          <Text textVariant="body1Semibold">Nama Belakang:</Text>
          <Text>{student.namaBelakang || '-'}</Text>
          <Text textVariant="body1Semibold">Program Studi:</Text>
          <Text>
            {[student.programStudi.kode, student.programStudi.nama].join(' - ')}
          </Text>
          <Text textVariant="body1Semibold">Deskripsi:</Text>
          <Text>{student.deskripsi || '-'}</Text>
          <Button mt={16} onClick={open} rightSection={<Pen size={16} />}>
            Ubah Profile
          </Button>
          <Button
            mt={8}
            variant={{
              variant: 'secondary',
            }}
            onClick={onChangePasswordClick}
            rightSection={<Lock size={16} />}
          >
            Ubah Password
          </Button>
        </Flex>
      </Card>
      <Drawer
        position="right"
        size="lg"
        onClose={close}
        opened={isOpened}
        title={<Text textVariant="h2">Ubah Profil</Text>}
      >
        <ProfileForm student={student} onClose={close} />
      </Drawer>
    </>
  );
}
