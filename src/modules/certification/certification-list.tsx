import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import { MeModel } from 'api-hooks/auth/model';
import { CertificationLiteModel } from 'api-hooks/certification/model';
import {
  useCreateCertification,
  useUpdateCertification,
} from 'api-hooks/certification/mutation';
import {
  certificationKey,
  useGetCertifications,
} from 'api-hooks/certification/query';
import { StudentLiteModel, StudentModel } from 'api-hooks/student/model';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';
import React from 'react';

import { CertificationCard } from './certification-card';
import CertificationForm from './certification-form';

interface CertificationListProps {
  student: StudentLiteModel | MeModel | StudentModel;

  isEditable?: boolean;
}

export default function CertificationList(props: CertificationListProps) {
  const { isEditable } = props;
  const [certification, setCertification] = React.useState<
    CertificationLiteModel | undefined
  >(undefined);

  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');
  const [isOpened, { open, close }] = useDisclosure();

  const queryCertifications = useGetCertifications({
    params: { nomor_identitas: props.student.nomorIdentitas },
  });

  const updateMutation = useUpdateCertification();
  const createMutation = useCreateCertification();

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
      <LoaderView query={queryCertifications}>
        {({ data }) => {
          const certifications = data;
          return (
            <Flex direction="column" gap={8}>
              {certifications.length === 0 && (
                <Text mt={16}>Tidak ada data</Text>
              )}
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
                    <CertificationCard
                      key={certification.id}
                      {...certification}
                    />
                  </div>
                );
              })}
            </Flex>
          );
        }}
      </LoaderView>
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
            onSubmit={async (values, lampiran) => {
              const result = certification
                ? await updateMutation.mutateAsync({
                    id: certification.id,
                    data: { ...values, lampiran },
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });
              queryClient.refetchQueries({
                queryKey: certificationKey.list({
                  nomor_identitas: result.data.nomorIdentitasMahasiswa,
                }),
              });
              notification.success({
                message: result.message,
              });
              close();
              return result.data;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
