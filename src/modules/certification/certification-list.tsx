import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { CertificationCard } from './certification-card';
import CertificationForm from './certification-form';
import { CertificationModel, certifications } from './certification-form-type';

interface CertificationListProps {
  student: StudentModel;
  isEditable?: boolean;
}

export default function CertificationList(props: CertificationListProps) {
  const { isEditable } = props;
  const [certification, setCertification] = React.useState<
    CertificationModel | undefined
  >(undefined);

  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');
  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setCertification(undefined);
        open();
      }}
    />
  );

  const deleteComponent = (isAdmin || isEditable) && (
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
      <Text textVariant="h1">Sertifikasi</Text>
      {createComponent}
      <Flex direction="column" gap={8}>
        {certifications.map((certification, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setCertification(certification);
                open();
              }}
              style={{
                position: 'relative',
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom:
                  index === certifications.length - 1
                    ? undefined
                    : `1px solid ${colors.borderPrimary}`,
                cursor: 'pointer',
              }}
            >
              {deleteComponent}
              <CertificationCard key={certification.id} {...certification} />
            </div>
          );
        })}
      </Flex>
      {(isAdmin || isEditable) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {certification ? 'Detail Sertifikat' : 'Buat Sertifikat'}
            </Text>
          }
        >
          <CertificationForm
            certification={certification}
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
