import { Flex } from '@mantine/core';
import { StudentLiteModel } from 'api-hooks/student/model';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import Image from 'next/image';

export default function StudentItem(props: StudentLiteModel) {
  const name = [props.namaDepan, props.namaTengah, props.namaBelakang]
    .filter(Boolean)
    .join(' ');

  const label = [props.nomorIdentitas, name].join(' - ');
  const studyProgram = props.programStudi;
  const studyProgramLabel = [studyProgram.kode, studyProgram.nama].join(' - ');
  return (
    <Flex direction="row" align="center" gap={8} w="100%">
      <Image
        width={64}
        height={64}
        alt={name}
        src={props.photoUrl || '/android-chrome-512x512.png'}
        style={{
          border: `1px solid ${colors.borderOverlay}`,
          objectPosition: 'top',
          objectFit: 'cover',
        }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = '/android-chrome-512x512.png';
        }}
      />
      <Flex direction="column" gap={4}>
        <Text textVariant="body1Medium">{label}</Text>
        <Text textVariant="body2Regular">{studyProgramLabel}</Text>
      </Flex>
    </Flex>
  );
}
