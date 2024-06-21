import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import { MeModel } from 'api-hooks/auth/model';
import { OrganizationLiteModel } from 'api-hooks/organization/model';
import {
  useCreateOrganization,
  useUpdateOrganization,
} from 'api-hooks/organization/mutation';
import {
  organizationKey,
  useGetOrganizations,
} from 'api-hooks/organization/query';
import { StudentLiteModel, StudentModel } from 'api-hooks/student/model';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';
import React from 'react';

import { OrganizationCard } from './organization-card';
import OrganizationForm from './organization-form';

interface OrganizationListProps {
  student: StudentLiteModel | MeModel | StudentModel;

  isEditable?: boolean;
}

export default function OrganizationList(props: OrganizationListProps) {
  // const { student } = props;
  const { isEditable } = props;
  const [organization, setOrganization] = React.useState<
    OrganizationLiteModel | undefined
  >(undefined);
  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');

  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isEditable || isAdmin) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setOrganization(undefined);
        open();
      }}
    />
  );

  const deleteComponent = (isEditable || isAdmin) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={0}
      type="icon"
      color="red"
      variant="outline"
      children={<Trash size={16} />}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );

  const updateMutation = useUpdateOrganization();
  const createMutation = useCreateOrganization();
  const queryOrganizations = useGetOrganizations({
    params: { nomor_identitas: props.student.nomorIdentitas },
  });

  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Organisasi</Text>
      {createComponent}
      <LoaderView query={queryOrganizations}>
        {({ data }) => {
          const organizations = data;
          return (
            <Flex direction="column" gap={8}>
              {organizations.length === 0 && (
                <Text mt={16}>Tidak ada data</Text>
              )}

              {organizations.map((organization, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrganization(organization);
                      open();
                    }}
                    style={{
                      position: 'relative',
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom:
                        index === organizations.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                      cursor: 'pointer',
                    }}
                  >
                    {deleteComponent}
                    <OrganizationCard key={organization.id} {...organization} />
                  </div>
                );
              })}
            </Flex>
          );
        }}
      </LoaderView>
      {(isEditable || isAdmin) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {organization ? 'Detail Organisasi' : 'Buat Organisasi'}
            </Text>
          }
        >
          <OrganizationForm
            organization={organization}
            onSubmit={async (values, lampiran) => {
              const result = organization
                ? await updateMutation.mutateAsync({
                    data: { ...values, lampiran },
                    id: organization.id,
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });

              queryClient.refetchQueries({
                queryKey: organizationKey.list({
                  nomor_identitas: result.data.nomorIdentitasMahasiswa,
                }),
              });

              notification.success({
                message: result.message,
              });

              close();
              return undefined;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
