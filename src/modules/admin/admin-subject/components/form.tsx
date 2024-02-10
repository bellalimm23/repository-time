import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminSubjectFormSchema,
  AdminSubjectFormType,
  AdminSubjectMethodType,
} from './form-type';

interface AdminSubjectProps {
  adminSubject?: any;
  onSubmit: (
    values: AdminSubjectFormType,
    form: AdminSubjectMethodType,
  ) => Promise<any>;
}

export default function AdminSubjectForm(props: AdminSubjectProps) {
  const defaultValues = React.useMemo<AdminSubjectFormType>(() => {
    return {};
  }, []);

  const resolver = useYupValidationResolver(AdminSubjectFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminSubjectFormType) => {
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
      adminSubject
    </Form>
  );
}
