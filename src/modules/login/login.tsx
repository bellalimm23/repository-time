import { BackgroundImage, Card, Center } from '@mantine/core';
import assets from 'assets/image';
import { StaticRoutes } from 'common/routes/routes';
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

import { LoginFormSchema, LoginFormType } from './login-form-type';

interface LoginProps {}

export default function Login(props: LoginProps) {
  const { push } = useRouter();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      password: '',
      username: '',
    };
  }, []);
  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: LoginFormType) => {}, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <BackgroundImage
        src={assets.timeBuilding}
        style={{
          opacity: 0.4,
          position: 'fixed',
          inset: 0,
          zIndex: -1,
        }}
      />
      <Container
        style={{
          position: 'fixed',
          zIndex: -2,
          inset: 0,
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
            Halaman Login
          </Text>
          <Separator gap={16} />
          <Input
            type="text"
            name="username"
            label="Username"
            placeholder="Username"
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
          <Input type="submit" text="Login" />
          <Separator gap={16} />
          <Button
            variant={{
              variant: 'secondary',
            }}
            onClick={() => push(StaticRoutes.register)}
          >
            Register
          </Button>
        </Card>
      </Container>
    </Form>
  );
}
