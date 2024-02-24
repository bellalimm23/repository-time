import { Lock } from '@phosphor-icons/react';
import notification from 'common/helpers/notification';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import useDialog from 'hooks/use-dialog';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ChangePasswordFormSchema,
  ChangePasswordFormType,
  ChangePasswordMethodType,
} from './form-type';

interface ChangePasswordProps {
  onSubmit: (
    values: ChangePasswordFormType,
    form: ChangePasswordMethodType,
  ) => Promise<any>;
}

function ChangePasswordForm(props: ChangePasswordProps) {
  const defaultValues = React.useMemo<ChangePasswordFormType>(() => {
    return {
      currentPassword: '',
      currentPasswordConfirmation: '',
      oldPassword: '',
    };
  }, []);

  const resolver = useYupValidationResolver(ChangePasswordFormSchema());

  const methods = useForm<ChangePasswordFormType>({
    resolver,
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: ChangePasswordFormType) => {
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

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Input
        type="password"
        name="oldPassword"
        label="Password Sekarang"
        placeholder="Password Sekarang"
        required
      />
      <Input
        type="password"
        name="currentPassword"
        label="Password Baru"
        placeholder="Password Baru"
        required
      />

      <Input
        type="password"
        name="currentPasswordConfirmation"
        label="Password"
        placeholder="Password"
        required
      />
      <Input type="submit" text="Ganti" />
    </Form>
  );
}

export function ChangePassword() {
  const { Dialog, open } = useDialog({
    type: 'custom',
    children: <ChangePasswordForm onSubmit={async (values, form) => {}} />,
    dialogProps: {
      title: <Text textVariant="h1">Ganti Password</Text>,
      withCloseButton: true,
      closeOnClickOutside: false,
    },
  });

  return (
    <>
      <Button
        fullWidth
        leftSection={<Lock />}
        variant={{
          variant: 'secondary',
        }}
        onClick={open}
      >
        Ganti Password
      </Button>
      {Dialog}
    </>
  );
}
