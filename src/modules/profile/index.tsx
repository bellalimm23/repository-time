import { Card, Drawer, Grid } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import AdminThesisCreate from 'modules/admin/admin-thesis/create';
import Container from 'modules/components/container';
import ThesisTableList from 'modules/thesis/components/table.desktop';
import structuralStyles from 'styles/layout.css';

import Document from './documents';
import Profile from './profile';

export default function ProfileIndex() {
  const isMobile = useMediaQuery(breakpoints.screenMaxLg);
  const span = isMobile ? 12 : 6;

  const [isOpenend, { open, close }] = useDisclosure();
  return (
    <Container
      style={{
        padding: 16,
      }}
    >
      <Grid className={structuralStyles.fill({ width: true })}>
        <Grid.Col span={span}>
          <Profile />
        </Grid.Col>
        <Grid.Col span={span} order={{ base: 3, md: 2 }}>
          <Card withBorder radius="md" shadow="xs">
            <Text textVariant="h1">Daftar Tugas Akhir</Text>
            <Separator gap={16} />
            <ThesisTableList thesis={thesis} />
            <Separator gap={16} />
            <Button onClick={open}>Ajukan Tugas Akhir</Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={span} order={{ base: 2, md: 3 }}>
          <Document />
        </Grid.Col>
      </Grid>
      <Drawer
        position="right"
        withCloseButton={false}
        size={800}
        opened={isOpenend}
        onClose={close}
      >
        <AdminThesisCreate />
      </Drawer>
    </Container>
  );
}
