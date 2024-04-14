import { Card, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import { generateSubjectName } from 'modules/admin/admin-subject/components/form-type';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import {
  generateName,
  users,
} from 'modules/admin/admin-user/components/form-type';
import Container from 'modules/components/container';
import { documents } from 'modules/profile/form-type';
import ThesisTableList from 'modules/thesis/components/table.desktop';
import { useRouter } from 'next/router';
import structuralStyles from 'styles/layout.css';

import LabelContent from './components/label-content';
import UserDocumentList from './components/user-document-list';

export default function UserView() {
  const { query } = useRouter();
  const { id } = query;
  const user = users.find((user) => user.id === id);
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const label = [user.nomor_identitas, generateName(user)].join(' - ');

  const span = isMobile ? 12 : 6;

  const idNumber = (
    <Grid.Col span={span}>
      <LabelContent label="Nomor Identitas: " content={user.nomor_identitas} />
    </Grid.Col>
  );

  const subject = (
    <Grid.Col span={span}>
      <LabelContent
        label="Fakultas: "
        content={user.jurusan.fakultas.nama || '-'}
      />
    </Grid.Col>
  );

  const division = (
    <Grid.Col span={span}>
      <LabelContent
        label="Jurusan: "
        content={generateSubjectName(user.jurusan)}
      />
    </Grid.Col>
  );

  const firstName = (
    <Grid.Col span={span}>
      <LabelContent label="Nama Depan: " content={user.nama_depan} />
    </Grid.Col>
  );

  const middleName = (
    <Grid.Col span={span}>
      <LabelContent label="Nama Tengah: " content={user.nama_tengah || '-'} />
    </Grid.Col>
  );

  const lastName = (
    <Grid.Col span={span}>
      <LabelContent
        label="Nama Belakang: "
        content={user.nama_belakang || '-'}
      />
    </Grid.Col>
  );

  const contents = isMobile
    ? [idNumber, firstName, middleName, lastName, division, subject]
    : [firstName, idNumber, middleName, division, lastName, subject];

  return (
    <Container
      style={{
        padding: 24,
      }}
    >
      <Text textVariant="h1">
        User &nbsp;&nbsp;
        <Text span>({label})</Text>
      </Text>
      <Separator gap={16} />
      <Card
        withBorder
        radius="md"
        shadow="xs"
        className={classNames(
          structuralStyles.fill({
            width: true,
          }),
        )}
      >
        <Grid>{contents.map((content) => content)}</Grid>
      </Card>

      <Separator gap={32} direction="vertical" />
      <Text textVariant="h2">Sertifikat / Lisensi</Text>
      <Separator gap={24} />
      <UserDocumentList documents={documents} />
      <Separator gap={24} />
      <Text textVariant="h2">Tugas Akhir</Text>
      <Separator gap={24} />
      <ThesisTableList thesis={thesis} />
    </Container>
  );
}
