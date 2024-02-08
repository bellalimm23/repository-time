import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import React from 'react';

import AdminThesisForm from './components/form';
import {
  AdminThesisFormType,
  AdminThesisMethodType,
} from './components/form-type';

export default function AdminThesisView() {
  const onSubmit = React.useCallback(
    async (values: AdminThesisFormType, form: AdminThesisMethodType) => {
      return undefined;
    },
    [],
  );

  return (
    <FetchWrapperComponent
      component={<AdminThesisForm onSubmit={onSubmit} />}
    />
  );
}
