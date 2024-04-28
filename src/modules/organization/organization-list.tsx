import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { OrganizationCard } from './organization-card';
import OrganizationForm from './organization-form';
import { OrganizationModel, organizations } from './organization-form-type';

interface OrganizationListProps {
  student: StudentModel;
  isEditable?: boolean;
}

export default function OrganizationList(props: OrganizationListProps) {
  // const { student } = props;
  const { isEditable } = props;
  const [organization, setOrganization] = React.useState<
    OrganizationModel | undefined
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

  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Organisasi</Text>
      {createComponent}
      <Flex direction="column" gap={8}>
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
      {(isEditable || isAdmin) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {organization ? 'Detail Sertifikasi' : 'Buat Sertifikasi'}
            </Text>
          }
        >
          <OrganizationForm
            organization={organization}
            onSubmit={async (values) => {
              close();
              return undefined;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
