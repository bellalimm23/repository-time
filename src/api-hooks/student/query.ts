import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  StudentLiteModel,
  StudentModel,
  GetStudentInput,
  GetStudentsInput,
} from './model';

export const studentKey = {
  list: (params?: GetStudentsInput) => ['get-students', params],
  view: (params: GetStudentInput) => ['get-student', params.id],
} as const;

export function useGetStudents(props?: {
  params?: GetStudentsInput;
  options?: UseQueryOptionsType<StudentLiteModel[]>;
}): UseQueryResultType<StudentLiteModel[]> {
  return useQuery({
    queryKey: studentKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.students].join('/'),
          params: props?.params,
        },
        StudentLiteModel,
      ),
    ...props?.params,
  });
}

export function useGetStudent(props: {
  params: GetStudentInput;
  options?: UseQueryOptionsType<StudentModel>;
}): UseQueryResultType<StudentModel> {
  return useQuery({
    queryKey: studentKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.students, props.params.id].join('/'),
        },
        StudentModel,
      ),
    ...props.options,
  });
}
