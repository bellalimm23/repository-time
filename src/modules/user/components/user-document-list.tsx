import { Box, Card, Flex } from '@mantine/core';
import Text from 'components/elements/text';
import { format } from 'date-fns';
import { DocumentModel } from 'modules/profile/form-type';

interface UserDocumentListProps {
  documents: DocumentModel[];
}

function UserDocumentItem(props: DocumentModel) {
  const labelDate = [
    format(props.tanggal_berlaku, 'dd MMM yyyy'),
    props.tanggal_kadaluarsa
      ? format(props.tanggal_kadaluarsa, 'dd MMM yyyy')
      : 'Sekarang',
  ].join(' - ');

  return (
    <Card withBorder shadow="xs" w="100%" radius="md">
      <Text textVariant="h3">{props.nama}</Text>
      <Text textColor="foregroundTertiary">{labelDate}</Text>
      <Text>{props.deskripsi}</Text>
      <Flex mt={8} direction="row" gap={16} wrap="wrap">
        {props.sertifikat.map((item) => {
          return <Box w={64} h={64} key={item.id} bg="gray" />;
        })}
      </Flex>
    </Card>
  );
}

export default function UserDocumentList(props: UserDocumentListProps) {
  return (
    <Flex gap={24} direction="column" w="100%">
      {props.documents.map((document) => {
        return <UserDocumentItem key={document.id} {...document} />;
      })}
    </Flex>
  );
}
