import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import { useRouter } from 'next/router';
import React from 'react';

import AdminUserForm from './components/form';
import {
  AdminUserFormType,
  AdminUserMethodType,
  users,
} from './components/form-type';

export default function AdminUserView() {
  const { query } = useRouter();
  const onSubmit = React.useCallback(
    async (values: AdminUserFormType, form: AdminUserMethodType) => {
      return undefined;
    },
    [],
  );

  const { id } = query;

  const user = users.find((user) => user.id === id);

  return (
    <FetchWrapperComponent
      component={<AdminUserForm onSubmit={onSubmit} adminUser={user} />}
    />
  );
}
