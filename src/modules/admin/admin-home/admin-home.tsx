import { Card, SimpleGrid } from '@mantine/core';
import {
  Books,
  CheckCircle,
  ClockClockwise,
  User,
  UserGear,
  Users,
} from '@phosphor-icons/react';
import { string2money } from 'common/utils/string';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';

export default function AdminHome() {
  return (
    <>
      <Text textVariant="h1">Beranda</Text>
      <Separator gap={24} />
      <SimpleGrid cols={3}>
        <Card withBorder shadow="xs">
          <Users size={36} />
          <Text textVariant="h2">Jumlah Users</Text>
          <Text textVariant="body1Semibold">{string2money(1200)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <User size={36} />
          <Text textVariant="h2">Jumlah Mahasiswa</Text>
          <Text textVariant="body1Semibold">{string2money(1997)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <UserGear size={36} />
          <Text textVariant="h2">Jumlah Admin</Text>
          <Text textVariant="body1Semibold">{string2money(3)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <Books size={36} />
          <Text textVariant="h2">Jumlah Tesis</Text>
          <Text textVariant="body1Semibold">{string2money(1000)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <CheckCircle size={36} />
          <Text textVariant="h2">Jumlah Tesis Aktif</Text>
          <Text textVariant="body1Semibold">{string2money(800)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <ClockClockwise size={36} />
          <Text textVariant="h2">Jumlah Tesis Pending</Text>
          <Text textVariant="body1Semibold">{string2money(200)}</Text>
        </Card>
      </SimpleGrid>
    </>
  );
}
