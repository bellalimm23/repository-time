import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import React from 'react';

import AdminUserForm from './components/form';
import { AdminUserFormType, AdminUserMethodType } from './components/form-type';

export default function AdminUserView() {
  const onSubmit = React.useCallback(
    async (values: AdminUserFormType, form: AdminUserMethodType) => {
      return undefined;
    },
    [],
  );

  return (
    <FetchWrapperComponent component={<AdminUserForm onSubmit={onSubmit} />} />
  );
}
