import { Card, Flex } from '@mantine/core';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import { students } from 'modules/admin/students/components/student-form-type';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import ThesisList from 'modules/thesis/thesis-list';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function StudentView() {
  const { query } = useRouter();
  const id = query.id as string;
  const student = students.find((student) => student.nomor_identitas === id);

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

  const descriptionComponent = !!student?.deskripsi && (
    <Flex direction="column">
      <Text textVariant="body2Semibold">Deskripsi: </Text>
      <Text textVariant="body2Regular">{student.deskripsi}</Text>
    </Flex>
  );

  if (student) {
    return (
      <Flex mih="100vh" w="100%" maw={768} direction="column" gap={16} p={24}>
        <Card withBorder>
          <Flex direction="column" mb={16} align="center" justify="center">
            <Text textVariant="h1" mb={8}>
              Informasi Mahasiswa
            </Text>
            <Image
              width={128}
              height={128}
              src={student.photo_url}
              alt={nameLabel}
              style={{
                border: `1px solid ${colors.borderOverlay}`,
                objectPosition: 'top',
                objectFit: 'cover',
              }}
            />
            <Text textVariant="body1Semibold">{nameLabel}</Text>
            <Text textVariant="body2Regular">{studyProgramLabel}</Text>
          </Flex>

          {descriptionComponent}
        </Card>
        <ExperienceList student={student} />
        <EducationList student={student} />
        <CertificationList student={student} />
        <OrganizationList student={student} />
        <ThesisList student={student} />
      </Flex>
    );
  }

  return <></>;
}
