import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import React from 'react';

import AdminSubjectForm from './components/form';
import {
  AdminSubjectFormType,
  AdminSubjectMethodType,
} from './components/form-type';

export default function AdminSubjectView() {
  const onSubmit = React.useCallback(
    async (values: AdminSubjectFormType, form: AdminSubjectMethodType) => {
      return undefined;
    },
    [],
  );

  return (
    <FetchWrapperComponent
      component={<AdminSubjectForm onSubmit={onSubmit} />}
    />
  );
}
