import React from 'react';

import AdminSubjectForm from './components/form';
import {
  AdminSubjectFormType,
  AdminSubjectMethodType,
} from './components/form-type';

export default function AdminSubjectCreate() {
  const onSubmit = React.useCallback(
    async (values: AdminSubjectFormType, form: AdminSubjectMethodType) => {
      return undefined;
    },
    [],
  );
  return <AdminSubjectForm onSubmit={onSubmit} />;
}
