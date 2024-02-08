import React from 'react';

import AdminThesisForm from './components/form';
import {
  AdminThesisFormType,
  AdminThesisMethodType,
} from './components/form-type';

export default function AdminThesisCreate() {
  const onSubmit = React.useCallback(
    async (values: AdminThesisFormType, form: AdminThesisMethodType) => {
      return undefined;
    },
    [],
  );
  return <AdminThesisForm onSubmit={onSubmit} />;
}
