import { Anchor, Flex } from '@mantine/core';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';
import { thesis } from 'modules/admin/thesis/components/thesis-form-type';
import { useRouter } from 'next/router';

export default function ThesisView() {
  const { query } = useRouter();
  const id = query.id as string;
  const _thesis = thesis.find((_thesis) => _thesis.id === id);

  const student = _thesis?.mahasiswa;

  const name = [
    student?.nama_depan,
    student?.nama_tengah,
    student?.nama_belakang,
  ]
    .filter(Boolean)
    .join(' ');

  const nameLabel = [student?.nomor_identitas, name]
    .filter(Boolean)
    .join(' - ');

  const studyProgram = student?.program_studi;

  const studyProgramLabel = [
    studyProgram?.kode_program_studi,
    studyProgram?.nama_program_studi,
  ].join(' - ');
  const dateComponent = _thesis?.waktu_terbit && (
    <>
      <Text textVariant="body1Semibold">Waktu Terbit:</Text>
      <Text>{formatDate(_thesis.waktu_terbit)}</Text>
    </>
  );

  const files = _thesis.items?.map((item) => {
    const file = item.file_url.split('/');
    return (
      <Anchor
        fz={11}
        c="blue"
        href={item.file_url}
        target="_blank"
        key={item.file_url}
      >
        {file[file.length - 1]}
      </Anchor>
    );
  });

  if (_thesis) {
    return (
      <Flex mih="100vh" w="100%" maw={768} direction="column" gap={16} p={16}>
        <Text textVariant="h1" mb={16}>
          Detail Tugas Akhir
        </Text>
        <Text textVariant="body1Semibold">Judul:</Text>
        <Text>{_thesis.judul_tugas_akhir}</Text>
        <Text textVariant="body1Semibold">Penulis:</Text>
        <Text>{nameLabel}</Text>
        <Text textVariant="body1Semibold">Program Studi:</Text>
        <Text>{studyProgramLabel}</Text>
        <Text textVariant="body1Semibold">Abstrak:</Text>
        <Text>{_thesis.abstrak}</Text>
        {dateComponent}
        <Text textVariant="body1Semibold">Files:</Text>
        <Flex direction="column" gap={4} w="fit-content">
          {files}
        </Flex>
      </Flex>
    );
  }
  return <></>;
}
