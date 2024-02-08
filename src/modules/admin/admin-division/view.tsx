import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import React from 'react';

import AdminDivisionForm from './components/form';
import {
  AdminDivisionFormType,
  AdminDivisionMethodType,
} from './components/form-type';

export default function AdminDivisionView() {
  const onSubmit = React.useCallback(
    async (values: AdminDivisionFormType, form: AdminDivisionMethodType) => {
      return undefined;
    },
    [],
  );

  return (
    <FetchWrapperComponent
      component={<AdminDivisionForm onSubmit={onSubmit} />}
    />
  );
}
