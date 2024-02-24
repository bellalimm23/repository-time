import { Center, Grid, Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ArrowsDownUp, MagnifyingGlass } from '@phosphor-icons/react';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import Select from 'components/elements/select';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import Container from 'modules/components/container';
import structuralStyles from 'styles/layout.css';

import ThesisTableList from './components/table.desktop';

export default function ThesisList() {
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const size = isMobile ? 'sm' : 'lg';

  return (
    <Container style={{ padding: 16 }}>
      <div
        className={structuralStyles.fill({
          width: true,
        })}
      >
        <Text textVariant="h1">Daftar Tugas Akhir</Text>
        <Separator gap={16} />
        <Grid>
          <Grid.Col span={isMobile ? 12 : 4}>
            <TextInput
              placeholder="Cari Penulis, Judul"
              leftSection={<MagnifyingGlass size={16} />}
              noMargin
              size={size}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              size={size}
              noMargin
              leftSection={<ArrowsDownUp size={16} />}
              defaultValue="desc-year"
              data={[
                {
                  label: 'Descending Year',
                  value: 'desc-year',
                },
                {
                  label: 'Ascending Year',
                  value: 'asc-year',
                },
                {
                  label: 'Descending Title',
                  value: 'desc-title',
                },
                {
                  label: 'Ascending Title',
                  value: 'asc-title',
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 1.5}>
            <Button fullWidth>Cari</Button>
          </Grid.Col>
        </Grid>
        <Separator gap={16} />
        <ThesisTableList thesis={thesis} />
        <Separator gap={16} />
        <Text ta="center" textVariant="body2Medium">
          15/100
        </Text>
        <Separator gap={16} />
        <Center>
          <Pagination total={8} />
        </Center>
      </div>
    </Container>
  );
}
