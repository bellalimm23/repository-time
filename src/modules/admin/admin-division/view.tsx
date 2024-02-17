import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import { useRouter } from 'next/router';
import React from 'react';

import AdminDivisionForm from './components/form';
import {
  AdminDivisionFormType,
  AdminDivisionMethodType,
  divisions,
} from './components/form-type';

export default function AdminDivisionView() {
  const onSubmit = React.useCallback(
    async (values: AdminDivisionFormType, form: AdminDivisionMethodType) => {
      return undefined;
    },
    [],
  );

  const { query } = useRouter();
  const { id } = query;
  const division = divisions.find((division) => division.id === id);

  return (
    <FetchWrapperComponent
      component={
        <AdminDivisionForm onSubmit={onSubmit} adminDivision={division} />
      }
    />
  );
}
