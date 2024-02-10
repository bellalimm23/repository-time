import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminThesisSchema,
  AdminThesisFormType,
  AdminThesisMethodType,
} from './form-type';

interface AdminThesisProps {
  adminUser?: any;
  onSubmit: (
    values: AdminThesisFormType,
    form: AdminThesisMethodType,
  ) => Promise<any>;
}

export default function AdminThesis(props: AdminThesisProps) {
  const defaultValues = React.useMemo<AdminThesisFormType>(() => {
    return {};
  }, []);

  const resolver = useYupValidationResolver(AdminThesisSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminThesisFormType) => {
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
