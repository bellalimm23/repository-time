import { Box, Flex, SimpleGrid } from '@mantine/core';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import ButtonForm from './button-form';
import {
  DocumentFormSchema,
  DocumentFormType,
  DocumentModel,
} from './form-type';

interface ProfileDocumentProps {
  document?: DocumentModel;
  onClose: () => void;
}

export default function ProfileDocument(props: ProfileDocumentProps) {
  const { document, onClose } = props;
  const defaultValues = React.useMemo<DocumentFormType>(() => {
    return {
      deskripsi: document?.deskripsi || '',
      file_sertifikat:
        document?.sertifikat?.map((item) => {
          return {
            file_url: item.file_url,
          };
        }) || [],
      nama: document?.nama || '',
      tanggal_berlaku: document?.tanggal_berlaku || new Date(),
      tanggal_kadaluarsa: document?.tanggal_kadaluarsa || null,
    };
  }, [document]);

  const resolver = useYupValidationResolver(DocumentFormSchema());

  const methods = useForm<DocumentFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: DocumentFormType) => {
      onClose();
    },
    [onClose],
  );

  const isEdit = !!props.document;

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={isEdit}>
      <Flex direction="column" gap={12} pos="relative">
        <Input type="text" name="nama" label="Nama" />
        <SimpleGrid cols={2}>
          <Input type="date" name="tanggal_berlaku" label="Tanggal Berlaku" />
          <Input
            type="date"
            name="tanggal_kadaluarsa"
            label="Tanggal Kadaluarsa"
          />
        </SimpleGrid>
        <Input type="text" name="deskripsi" label="Deskripsi" />
        <div>
          <Text textVariant="body1Regular">File</Text>
          <Flex gap={12} direction="row" wrap="wrap" mb={16}>
            {[1, 2].map((val) => {
              return <Box w={64} h={64} bg="gray" />;
            })}
          </Flex>
        </div>
      </Flex>
      <ButtonForm />
    </Form>
  );
}
