import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { divisions } from 'modules/admin/admin-division/components/form-type';
import FormHeader from 'modules/components/form-header';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AdminSubjectFormSchema,
  AdminSubjectFormType,
  AdminSubjectMethodType,
  SubjectModel,
} from './form-type';

interface AdminSubjectProps {
  adminSubject?: SubjectModel;
  onSubmit: (
    values: AdminSubjectFormType,
    form: AdminSubjectMethodType,
  ) => Promise<any>;
}

export default function AdminSubjectForm(props: AdminSubjectProps) {
  const { adminSubject } = props;
  const defaultValues = React.useMemo<AdminSubjectFormType>(() => {
    return {
      fakultas_id: adminSubject?.fakultas?.id || '',
      kode: adminSubject?.kode || '',
      nama: adminSubject?.nama || '',
    };
  }, [adminSubject]);

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

  const onClickDeleteSubject = React.useCallback(() => {}, []);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!adminSubject}>
      <FormHeader
        title={adminSubject ? 'Edit Jurusan' : 'Buat Jurusan'}
        data={adminSubject}
        onClickDelete={onClickDeleteSubject}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nama"
        label="Nama Jurusan"
        placeholder="Nama Jurusan"
      />
      <Input
        type="text"
        name="kode"
        label="Kode Jurusan"
        placeholder="Kode Jurusan"
      />
      <Input
        type="select"
        name="fakultas_id"
        label="Fakultas"
        placeholder="fakultas"
        data={divisions.map((division) => {
          return {
            value: division.id,
            label: division.nama,
          };
        })}
      />
    </Form>
  );
}
