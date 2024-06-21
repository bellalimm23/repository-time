import { ComboboxItem } from '@mantine/core';
import { StudentLiteModel } from 'api-hooks/student/model';
import { useGetStudents } from 'api-hooks/student/query';
import { Input } from 'components/elements/fields';
import { SelectFieldProps } from 'components/elements/fields/select';

interface StudentSelectProps extends Omit<SelectFieldProps, 'data' | 'type'> {}

export function studentTransformer(value: StudentLiteModel): ComboboxItem {
  return {
    label: [
      value.nomorIdentitas,
      [value.namaDepan, value.namaTengah, value.namaBelakang]
        .filter(Boolean)
        .join(' '),
    ].join(' - '),
    value: value.nomorIdentitas,
  };
}

export default function StudentSelect(props: StudentSelectProps) {
  const { data } = useGetStudents();
  const options = (data?.data || []).map((item) => studentTransformer(item));

  return (
    <Input
      type="select"
      label="Mahasiswa"
      placeholder="Mahasiswa"
      data={options}
      {...props}
    />
  );
}
