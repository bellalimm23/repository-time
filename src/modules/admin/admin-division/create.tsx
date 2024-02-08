import React from 'react';

import AdminDivisionForm from './components/form';
import {
  AdminDivisionFormType,
  AdminDivisionMethodType,
} from './components/form-type';

export default function AdminDivisionCreate() {
  const onSubmit = React.useCallback(
    async (values: AdminDivisionFormType, form: AdminDivisionMethodType) => {
      return undefined;
    },
    [],
  );
  return <AdminDivisionForm onSubmit={onSubmit} />;
}
