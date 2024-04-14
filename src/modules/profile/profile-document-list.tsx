import { ActionIcon, Box, Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { Pen, Plus, Trash } from '@phosphor-icons/react';
import Text from 'components/elements/text';
import { format } from 'date-fns';
import React from 'react';

import { DocumentModel, documents } from './form-type';
import ProfileDocument from './profile-document';

export default function ProfileDocumentList() {
  const [document, setDocument] = React.useState<DocumentModel | null>(null);
  const [isOpenend, { close, open }] = useDisclosure();
  const onRemove = (document: DocumentModel) => () =>
    modals.openConfirmModal({
      title: `Apakah anda yakin untuk menghapus ${document.nama} ?`,
      labels: { confirm: 'Hapus', cancel: 'Batal' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return (
    <Card withBorder shadow="xs" radius="md" pos="relative">
      <Text textVariant="h1" mb={16}>
        Daftar Sertifikat / Lisensi
      </Text>
      <ActionIcon
        pos="absolute"
        top={16}
        right={16}
        variant="outline"
        onClick={() => {
          open();
          setDocument(null);
        }}
      >
        <Plus size={16} />
      </ActionIcon>
      <Flex direction="column" gap={16}>
        {documents.map((document) => {
          const labelDate = [
            format(document.tanggal_berlaku, 'dd MMM yyyy'),
            document.tanggal_kadaluarsa
              ? format(document.tanggal_kadaluarsa, 'dd MMM yyyy')
              : 'Sekarang',
          ].join(' - ');
          return (
            <Flex direction="column" pos="relative" key={document.id}>
              <Text textVariant="body1Semibold">{document.nama}</Text>
              <Text textVariant="body2Regular" textColor="foregroundTertiary">
                {labelDate}
              </Text>
              <Text>{document.deskripsi}</Text>
              <Flex direction="row" gap={8} wrap="wrap">
                {[1, 2].map((val) => {
                  return <Box w={64} h={64} bg="gray" />;
                })}
              </Flex>
              <Flex direction="row" gap={4} pos="absolute" top={4} right={4}>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={onRemove(document)}
                >
                  <Trash size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  onClick={() => {
                    setDocument(document);
                    open();
                  }}
                >
                  <Pen size={16} />
                </ActionIcon>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Drawer
        position="right"
        size={800}
        title={
          <Text textVariant="h1">
            {document
              ? 'Edit Sertifikat / Lisensi'
              : 'Tambah Sertifikat / Lisensi'}
          </Text>
        }
        opened={isOpenend}
        onClose={close}
      >
        <ProfileDocument document={document} onClose={close} />
      </Drawer>
    </Card>
  );
}
