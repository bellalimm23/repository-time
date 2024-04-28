import { Flex } from '@mantine/core';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import Image from 'next/image';

export default function StudentItem(props: StudentModel) {
  const name = [props.nama_depan, props.nama_tengah, props.nama_belakang]
    .filter(Boolean)
    .join(' ');

  const label = [props.nomor_identitas, name].join(' - ');
  const studyProgram = props.program_studi;
  const studyProgramLabel = [
    studyProgram.kode_program_studi,
    studyProgram.nama_program_studi,
  ].join(' - ');
  return (
    <Flex direction="row" align="center" gap={8} w="100%">
      <Image
        width={64}
        height={64}
        alt={name}
        src={props.photo_url || '/android-chrome-512x512.png'}
        style={{
          border: `1px solid ${colors.borderOverlay}`,
          objectPosition: 'top',
          objectFit: 'cover',
        }}
      />
      <Flex direction="column" gap={4}>
        <Text textVariant="body1Medium">{label}</Text>
        <Text textVariant="body2Regular">{studyProgramLabel}</Text>
      </Flex>
    </Flex>
  );
}
