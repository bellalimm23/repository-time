import React from 'react';

import AdminUserForm from './components/form';
import { AdminUserFormType, AdminUserMethodType } from './components/form-type';

export default function AdminUserCreate() {
  const onSubmit = React.useCallback(
    async (values: AdminUserFormType, form: AdminUserMethodType) => {
      return undefined;
    },
    [],
  );
  return <AdminUserForm onSubmit={onSubmit} />;
}
