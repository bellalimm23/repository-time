import { BackgroundImage, Card, SimpleGrid } from '@mantine/core';
import assets from 'assets/image';
import { BookSVG, BookshelfSVG, SeasonChangeSVG } from 'assets/svg';
import { Brand } from 'common/constants/brand';
import colors from 'common/styles/colors';
import Footer from 'components/common/footer';
import Header from 'components/common/header';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import Container from 'modules/components/container';
import structuralStyles from 'styles/layout.css';

export default function Home() {
  return (
    <Container>
      <Container
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          backgroundColor: colors.backgroundDark,
        }}
      />
      <BackgroundImage
        src={assets.repositoryBackground}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          opacity: 0.3,
        }}
      />
      <Header />
      <Container
        flexbox={{
          justify: 'center',
          direction: 'column',
        }}
      >
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
          maw={800}
          mx="auto"
        >
          {Brand.description}
        </Text>
        <Separator gap={64} />
        <SimpleGrid mx="auto" maw={550} cols={3}>
          <Card>
            <BookSVG width={128} height={128} />
            <Text textVariant="body2Semibold" ta="center">
              Cari Skripsi Terlengkap STMIK TIME
            </Text>
          </Card>
          <Card>
            <BookshelfSVG width={128} height={128} />
            <Text ta="center" textVariant="body2Semibold">
              Cari dan Pilih Skripsi Alumni STMIK TIME
            </Text>
          </Card>
          <Card>
            <SeasonChangeSVG width={128} height={128} />
            <Text ta="center" textVariant="body2Semibold">
              Ingat Upload Skripsimu Sebelum Deadline
            </Text>
          </Card>
        </SimpleGrid>
      </Container>
      <Footer />
    </Container>
  );
}
