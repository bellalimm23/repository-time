import { BackgroundImage } from '@mantine/core';
import assets from 'assets/image';
import colors from 'common/styles/colors';
import Container, { ContainerProps } from 'modules/components/container';

import Footer from './footer';
import Header from './header';

interface UserLayoutProps extends ContainerProps {
  isShowBackground?: boolean;
}

export default function UserLayout(props: UserLayoutProps) {
  const { isShowBackground = false } = props;

  return (
    <Container>
      {isShowBackground && (
        <>
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
        </>
      )}
      <Header />
      <Container
        {...props}
        flexbox={{
          justify: 'center',
          direction: 'column',
        }}
        withHeader
      />
      <Footer />
    </Container>
  );
}
