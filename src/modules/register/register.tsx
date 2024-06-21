import { BackgroundImage, Card, Center } from '@mantine/core';
import assets from 'assets/image';
import notification from 'common/helpers/notification';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import Container from 'modules/components/container';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { RegisterFormSchema, RegisterFormType } from './register-form-type';

export default function Register() {
  const { push } = useRouter();
  const defaultValues = React.useMemo<RegisterFormType>(() => {
    return {
      jurusan: '',
      nama_belakang: '',
      nama_depan: '',
      nama_tengah: '',
      password: '',
      nomor_identitas: '',
      deskripsi: '',
      program_studi_id: '',
    };
  }, []);

  const resolver = useYupValidationResolver(RegisterFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: RegisterFormType) => {
    try {
    } catch (e) {
      notification.error({
        message: e.message,
      });
    }
  }, []);
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container>
        <BackgroundImage
          src={assets.timeBuilding}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            opacity: 0.4,
          }}
        />
        <Container
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -2,
            backgroundColor: colors.mainBlack,
          }}
        />
        <Container
          flexbox={{
            justify: 'center',
          }}
        >
          <Card withBorder shadow="xs" miw={320} w={420} radius="md">
            <Center>
              <BrandIconDirectHome />
            </Center>
            <Text textVariant="h3" ta="center">
              Repository STMIK TIME
            </Text>
            <Separator gap={16} />
            <Text textVariant="h1" ta="center">
              Halaman Register
            </Text>
            <Separator gap={16} />
            <Input
              type="text"
              name="nomor_identitas"
              label="Nomor Identitas"
              placeholder="Nomor Identitas"
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
            <Input
              type="select"
              name="program_studi_id"
              label="Program Studi"
              placeholder="Program Studi"
              required
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              required
            />
            <Separator gap={24} />
            <Input type="submit" text="Register" />
            <Separator gap={16} />
            <Button
              variant={{
                variant: 'secondary',
              }}
              onClick={() => push(NavigationRoute.Login)}
            >
              Login
            </Button>
          </Card>
        </Container>
      </Container>
    </Form>
  );
}
