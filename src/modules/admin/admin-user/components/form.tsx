import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
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
    return {};
  }, []);

  const resolver = useYupValidationResolver(AdminUserFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminUserMethodType) => {
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
      adminUser
    </Form>
  );
}
