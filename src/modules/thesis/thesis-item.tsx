import { Flex } from '@mantine/core';
import Text from 'components/elements/text';
import { ThesisModel } from 'modules/admin/thesis/components/thesis-form-type';

export default function ThesisItem(props: ThesisModel) {
  const student = props.mahasiswa;
  const name = [student.nama_depan, student.nama_tengah, student.nama_belakang]
    .filter(Boolean)
    .join(' ');

  const label = [student.nomor_identitas, name].join(' - ');
  const studyProgram = student.program_studi;
  const studyProgramLabel = [
    studyProgram.kode_program_studi,
    studyProgram.nama_program_studi,
  ].join(' - ');

  return (
    <Flex direction="column" gap={8} w="100%">
      <Text textVariant="body1Medium">{props.judul_tugas_akhir}</Text>
      <Text textVariant="body2Regular">{label}</Text>
      <Text textVariant="body2Regular">{studyProgramLabel}</Text>
    </Flex>
  );
}
