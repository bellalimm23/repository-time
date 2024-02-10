import { Card, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  Books,
  CheckCircle,
  ClockClockwise,
  User,
  UserGear,
  Users,
} from '@phosphor-icons/react';
import breakpoints from 'common/styles/breakpoint';
import { string2money } from 'common/utils/string';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';

export default function AdminHome() {
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const textVariantLabel = isMobile ? 'body2Semibold' : 'h2';
  const textVariantContent = isMobile ? 'body3Semibold' : 'body1Semibold';
  const iconSize = isMobile ? 16 : 36;
  return (
    <>
      <Text textVariant="h1">Beranda</Text>
      <Separator gap={24} />
      <SimpleGrid cols={3}>
        <Card withBorder shadow="xs">
          <Users size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Users</Text>
          <Text textVariant={textVariantContent}>{string2money(1200)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <User size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Mahasiswa</Text>
          <Text textVariant={textVariantContent}>{string2money(1997)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <UserGear size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Admin</Text>
          <Text textVariant={textVariantContent}>{string2money(3)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <Books size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Tesis</Text>
          <Text textVariant={textVariantContent}>{string2money(1000)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <CheckCircle size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Tesis Aktif</Text>
          <Text textVariant={textVariantContent}>{string2money(800)}</Text>
        </Card>
        <Card withBorder shadow="xs">
          <ClockClockwise size={iconSize} />
          <Text textVariant={textVariantLabel}>Jumlah Tesis Pending</Text>
          <Text textVariant={textVariantContent}>{string2money(200)}</Text>
        </Card>
      </SimpleGrid>
    </>
  );
}
