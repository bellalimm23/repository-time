import { Card, Center, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetMe } from 'api-hooks/auth/query';
import { BookSVG, CertificateSVG } from 'assets/svg';
import { Brand } from 'common/constants/brand';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import structuralStyles from 'styles/layout.css';

export default function Home() {
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const { data } = useGetMe();
  const me = data?.data;
  const label = ['Hello', me?.namaDepan, me?.namaTengah, me?.namaBelakang]
    .filter(Boolean)
    .join(' ');
  return (
    <>
      <Separator gap={64} />
      <Text
        textVariant="h1"
        textColor="mainWhite"
        ta="center"
        className={structuralStyles.fill({ width: true })}
      >
        {label}, Welcome to {Brand.name}
      </Text>
      <Separator gap={24} />
      <Text
        textColor="mainWhite"
        textVariant="body1Regular"
        ta="center"
        maw={isMobile ? 375 : 800}
        mx="auto"
      >
        {Brand.description}
      </Text>
      <Separator gap={64} />
      <SimpleGrid mx="auto" maw={550} cols={isMobile ? 1 : 2}>
        <Card withBorder shadow="xs">
          <Center>
            <CertificateSVG width={128} height={128} />
          </Center>
          <Text textVariant="body2Semibold" ta="center">
            Cari Penghargaan dan Pencapaian dari Alumni STMIK TIME
          </Text>
        </Card>
        <Card withBorder shadow="xs">
          <Center>
            <BookSVG width={128} height={128} />
          </Center>
          <Text textVariant="body2Semibold" ta="center">
            Cari Tugas Akhir Terlengkap STMIK TIME
          </Text>
        </Card>
      </SimpleGrid>
      <Separator gap={64} />
    </>
  );
}
