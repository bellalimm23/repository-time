import { Card, Center, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BookSVG, BookshelfSVG, SeasonChangeSVG } from 'assets/svg';
import { Brand } from 'common/constants/brand';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import structuralStyles from 'styles/layout.css';

export default function Home() {
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  return (
    <>
      <Separator gap={64} />
      <Text
        textVariant="h1"
        textColor="mainWhite"
        ta="center"
        className={structuralStyles.fill({ width: true })}
      >
        Hello Bella, Welcome to {Brand.name}
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
      <SimpleGrid mx="auto" maw={550} cols={isMobile ? 1 : 3}>
        <Card withBorder shadow="xs">
          <Center>
            <BookSVG width={128} height={128} />
          </Center>
          <Text textVariant="body2Semibold" ta="center">
            Cari Skripsi Terlengkap STMIK TIME
          </Text>
        </Card>
        <Card withBorder shadow="xs">
          <Center>
            <BookshelfSVG width={128} height={128} />
          </Center>
          <Text ta="center" textVariant="body2Semibold">
            Cari dan Pilih Skripsi Alumni STMIK TIME
          </Text>
        </Card>
        <Card withBorder shadow="xs">
          <Center>
            <SeasonChangeSVG width={128} height={128} />
          </Center>
          <Text ta="center" textVariant="body2Semibold">
            Ingat Upload Skripsimu Sebelum Deadline
          </Text>
        </Card>
      </SimpleGrid>
      <Separator gap={64} />
    </>
  );
}
