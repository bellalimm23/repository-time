import FetchWrapperComponent from 'components/common/fetch-wrapper-component';
import { useRouter } from 'next/router';
import React from 'react';

import AdminSubjectForm from './components/form';
import {
  AdminSubjectFormType,
  AdminSubjectMethodType,
  subjects,
} from './components/form-type';

export default function AdminSubjectView() {
  const onSubmit = React.useCallback(
    async (values: AdminSubjectFormType, form: AdminSubjectMethodType) => {
      return undefined;
    },
    [],
  );

  const { query } = useRouter();
  const { id } = query;
  const subject = subjects.find((subject) => subject.id === id);

  return (
    <FetchWrapperComponent
      component={
        <AdminSubjectForm onSubmit={onSubmit} adminSubject={subject} />
      }
    />
  );
}
