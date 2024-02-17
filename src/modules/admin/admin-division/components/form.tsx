import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormHeader from 'modules/components/form-header';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminDivisionFormSchema,
  AdminDivisionFormType,
  AdminDivisionMethodType,
  DivisionModel,
} from './form-type';

interface AdminDivisionProps {
  adminDivision?: DivisionModel;
  onSubmit: (
    values: AdminDivisionFormType,
    form: AdminDivisionMethodType,
  ) => Promise<any>;
}

export default function AdminDivisionForm(props: AdminDivisionProps) {
  const { adminDivision } = props;
  const defaultValues = React.useMemo<AdminDivisionFormType>(() => {
    return {
      nama: adminDivision?.nama || '',
    };
  }, [adminDivision]);

  const resolver = useYupValidationResolver(AdminDivisionFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: AdminDivisionFormType) => {
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

  const onClickDeleteDivision = React.useCallback(() => {}, []);

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!adminDivision}
    >
      <FormHeader
        title={adminDivision ? 'Edit Fakultas' : 'Buat Fakultas'}
        data={adminDivision}
        onClickDelete={onClickDeleteDivision}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nama"
        label="Nama Fakultas"
        placeholder="Nama Fakultas"
        required
      />
    </Form>
  );
}
