import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import { useRouter } from 'next/router';
import React from 'react';

import AdminThesisForm from './components/form';
import {
  AdminThesisFormType,
  AdminThesisMethodType,
  thesis,
} from './components/form-type';

export default function AdminThesisView() {
  const onSubmit = React.useCallback(
    async (values: AdminThesisFormType, form: AdminThesisMethodType) => {
      return undefined;
    },
    [],
  );

  const { query } = useRouter();
  const { id } = query;
  const _thesis = thesis.find((thesis) => thesis.id === id);

  return (
    <FetchWrapperComponent
      component={<AdminThesisForm onSubmit={onSubmit} thesis={_thesis} />}
    />
  );
}
