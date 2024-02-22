import { Center, Grid, Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ArrowsDownUp, Bank, MagnifyingGlass } from '@phosphor-icons/react';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import Select from 'components/elements/select';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import { subjects } from 'modules/admin/admin-subject/components/form-type';
import { users } from 'modules/admin/admin-user/components/form-type';
import Container from 'modules/components/container';
import structuralStyles from 'styles/layout.css';

import UserTableList from './components/table.desktop';

export default function UserList() {
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const size = isMobile ? 'sm' : 'lg';

  return (
    <Container style={{ padding: 16 }}>
      <div
        className={structuralStyles.fill({
          width: true,
        })}
      >
        <Text textVariant="h1">Daftar Penulis</Text>
        <Separator gap={16} />
        <Grid>
          <Grid.Col span={isMobile ? 12 : 4}>
            <TextInput
              placeholder="Cari Penulis, Nomor Indentitas"
              leftSection={<MagnifyingGlass size={16} />}
              noMargin
              size={size}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              searchable
              clearable
              placeholder="Cari Jurusan"
              size={size}
              noMargin
              leftSection={<Bank size={16} />}
              data={subjects.map((subject) => {
                return {
                  value: subject.id,
                  label: [subject.kode, subject.nama].join(' - '),
                };
              })}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              size={size}
              noMargin
              leftSection={<ArrowsDownUp size={16} />}
              defaultValue="asc-name"
              data={[
                {
                  label: 'Descending ID Number',
                  value: 'desc-id',
                },
                {
                  label: 'Ascending ID Number',
                  value: 'asc-id',
                },
                {
                  label: 'Descending Name',
                  value: 'desc-name',
                },
                {
                  label: 'Ascending Name',
                  value: 'asc-name',
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 1.5}>
            <Button fullWidth>Cari</Button>
          </Grid.Col>
        </Grid>
        <Separator gap={16} />
        <UserTableList
          users={users.filter((user) => user.tipe_user === 'user')}
        />
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
