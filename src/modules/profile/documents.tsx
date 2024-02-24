import { ActionIcon, Card, Center, FileInput, Flex } from '@mantine/core';
import { Download, Plus } from '@phosphor-icons/react';
import { downloadFile } from 'api/storage';
import { EmptyDataSVG } from 'assets/svg';
import classNames from 'classnames';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { useFormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

import ButtonForm from './button-form';
import {
  DocumentFormType,
  UploadDocumentFormSchema,
  UploadDocumentFormType,
} from './form-type';

const name = 'documents' as const;

function DocumentField(props: {
  document: DocumentFormType;
  onRemove: () => void;
  index: number;
}) {
  const parentName = `${name}.${props.index}` as const;

  const onDownload = React.useCallback(() => {
    downloadFile(props.document.path);
  }, [props.document.path]);

  const { editable } = useFormState();

  if (editable) {
    return (
      <div>
        <Input
          type="text"
          name={`${parentName}.nama`}
          label="Nama Dokumen"
          placeholder="Nama Dokumen"
          size="md"
          noMargin
        />
        <Separator gap={16} />
        <FileInput placeholder="Upload Dokumen Anda" />
      </div>
    );
  }
  return (
    <>
      <Text textVariant="body1Semibold">{props.document.nama}</Text>
      <ActionIcon onClick={onDownload}>
        <Download size={16} />
      </ActionIcon>
    </>
  );
}

function DocumentFields() {
  const { control } = useFormContext<UploadDocumentFormType>();
  const { editable } = useFormState();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
    keyName: 'customId',
  });

  const onAdd = React.useCallback(() => {
    append({
      nama: '',
      path: '',
    });
  }, [append]);

  const onRemove = React.useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  return (
    <>
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'column',
            gap: 'md',
            align: 'stretch',
          }),
          structuralStyles.fill({
            width: true,
          }),
        )}
      >
        {fields.length === 0 && (
          <Center>
            <Flex direction="column">
              <EmptyDataSVG width={256} height={256} />
              <Separator gap={16} />
              <Text textVariant="body1Semibold" ta="center">
                Tidak Ada Dokumen
              </Text>
            </Flex>
          </Center>
        )}
        {fields.map((field, index) => {
          return (
            <>
              {fields.length > 1 && !!index && editable && (
                <Separator gap={16} direction="vertical">
                  <hr />
                </Separator>
              )}
              <DocumentField
                key={field.customId}
                document={field}
                index={index}
                onRemove={onRemove(index)}
              />
            </>
          );
        })}
      </div>
      <Separator gap={16} />
      {editable && (
        <>
          <Button
            onClick={onAdd}
            variant={{
              variant: 'secondary',
            }}
            leftSection={<Plus />}
          >
            Tambah Dokumen
          </Button>
          <Separator gap={24} />
        </>
      )}
      <ButtonForm />
    </>
  );
}

export default function Document() {
  const defaultValues = React.useMemo<UploadDocumentFormType>(() => {
    return {
      documents: [],
    };
  }, []);

  const resolver = useYupValidationResolver(UploadDocumentFormSchema());

  const methods = useForm<UploadDocumentFormType>({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: UploadDocumentFormType) => {
    try {
    } catch (e) {
      notification.error({
        message: e.message,
      });
    }
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={false}>
      <Card withBorder radius="md" shadow="xs" pos="relative">
        <Text textVariant="h1">Dokumen</Text>
        <Separator gap={24} />
        <DocumentFields />
      </Card>
    </Form>
  );
}
