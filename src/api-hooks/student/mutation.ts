import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  StudentDeleteType,
  StudentInputType,
  StudentModel,
  StudentUpdateType,
} from './model';

export function useCreateStudent(
  options?: UseMutationOptionsType<StudentModel, StudentInputType>,
): UseMutationResultType<StudentModel, StudentInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.students].join('/'),
          method: 'POST',
          data,
        },
        StudentModel,
      );
    },
    ...options,
  });
}

export function useUpdateStudent(
  options?: UseMutationOptionsType<StudentModel, StudentUpdateType>,
): UseMutationResultType<StudentModel, StudentUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.students, id].join('/'),
          method: 'PUT',
          data,
        },
        StudentModel,
      );
    },
    ...options,
  });
}

export function useDeleteStudent(
  options?: UseMutationOptionsType<any, StudentDeleteType>,
): UseMutationResultType<any, StudentDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.students, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
