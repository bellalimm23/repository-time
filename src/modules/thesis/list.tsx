import { Flex } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useGetThesisList } from 'api-hooks/thesis/query';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import FormLabel from 'modules/admin/components/form-label';
import { useRouter } from 'next/router';

import ThesisItem from './thesis-item';

export default function ThesisList() {
  const { push } = useRouter();
  const queryThesisList = useGetThesisList();
  return (
    <Flex direction="column" w="100%" maw={768} mih="100vh" gap={4}>
      <FormLabel mx={16} mt={16} />
      <TextInput
        mx={16}
        leftSection={<MagnifyingGlass size={16} />}
        placeholder="Cari identitas mahasiswa, atau judul"
      />
      <LoaderView query={queryThesisList}>
        {({ data }) => {
          const thesis = data;
          return (
            <>
              {thesis.length === 0 && <Text p={16}>Tidak ada data</Text>}
              {thesis.map((_thesis, index) => {
                return (
                  <div
                    onClick={() => {
                      push({
                        pathname: NavigationRoute.ThesisView,
                        query: { id: _thesis.id },
                      });
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: 8,
                      marginLeft: 8,
                      marginRight: 8,
                      borderBottom:
                        index === thesis.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                    }}
                  >
                    <ThesisItem key={_thesis.id} {..._thesis} />
                  </div>
                );
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
