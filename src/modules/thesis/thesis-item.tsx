import { Flex } from '@mantine/core';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import Text from 'components/elements/text';

export default function ThesisItem(props: ThesisLiteModel) {
  const student = props.mahasiswa;
  const name = [student.namaDepan, student.namaTengah, student.namaBelakang]
    .filter(Boolean)
    .join(' ');

  const label = [student.nomorIdentitas, name].join(' - ');
  const studyProgram = student.programStudi;
  const studyProgramLabel = [studyProgram.kode, studyProgram.nama].join(' - ');

  return (
    <Flex direction="column" gap={8} w="100%">
      <Text textVariant="body1Medium">{props.judulTugasAkhir}</Text>
      <Text textVariant="body2Regular">{label}</Text>
      <Text textVariant="body2Regular">{studyProgramLabel}</Text>
    </Flex>
  );
}
