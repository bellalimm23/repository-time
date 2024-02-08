import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminDivisionFormSchema,
  AdminDivisionFormType,
  AdminDivisionMethodType,
} from './form-type';

interface AdminDivisionProps {
  adminDivision?: any;
  onSubmit: (
    values: AdminDivisionFormType,
    form: AdminDivisionMethodType,
  ) => Promise<any>;
}

export default function AdminDivisionForm(props: AdminDivisionProps) {
  const defaultValues = React.useMemo<AdminDivisionFormType>(() => {
    return {};
  }, []);

  const resolver = useYupValidationResolver(AdminDivisionFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminDivisionMethodType) => {
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
      adminDivision
    </Form>
  );
}
