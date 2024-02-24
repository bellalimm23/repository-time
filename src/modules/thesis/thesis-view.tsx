import { Card, FileInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classNames from 'classnames';
import notification from 'common/helpers/notification';
import breakpoints from 'common/styles/breakpoint';
import { capitalize, generateIEEEReference } from 'common/utils/string';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import { format } from 'date-fns';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FileDescriptor from 'modules/admin/admin-thesis/components/file-descriptor';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import { ThesisStatusPill } from 'modules/admin/admin-thesis/components/thesis-status-pill';
import Container from 'modules/components/container';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

import {
  UploadThesisFormSchema,
  UploadThesisFormType,
  files,
} from './components/form-type';

export default function ThesisView() {
  const { query } = useRouter();
  const { id } = query;
  const item = thesis.find((thesis) => thesis.id === id);
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const textVariantLabel = isMobile ? 'body1Semibold' : 'h3';

  const isContributor = React.useMemo(() => {
    return true;
  }, []);

  const isAllowUpload = React.useMemo(() => {
    switch (item.status) {
      case 'approved':
      case 'uploading':
        return isContributor && true;
      case 'uploaded':
      case 'finished':
      case 'pending':
      case 'takedown':
      case 'canceled':
        return isContributor && false;
    }
  }, [isContributor, item.status]);

  const defaultValues = React.useMemo<UploadThesisFormType>(() => {
    return {
      files: files.map((file) => {
        return {
          nama: file.nama,
          tipe: file.tipe,
        };
      }),
    };
  }, []);

  const resolver = useYupValidationResolver(UploadThesisFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async () => {
    try {
    } catch (e) {
      notification.error({
        message: e.message,
      });
    }
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container
        style={{
          padding: 24,
        }}
      >
        <Text textVariant="h1">{item.judul}</Text>
        <Text>
          {generateIEEEReference({
            publishYear: format(item.waktu_disetujui, 'yyyy'),
            title: item.judul,
            users: item.users.map((user) => {
              return {
                firstName: user.nama_depan,
                lastName: user.nama_belakang,
                middleName: user.nama_tengah,
              };
            }),
            publisher: 'STMIK TIME',
          })}
        </Text>
        {!isContributor && (
          <>
            <Separator gap={16} />
            <div
              className={structuralStyles.flexbox({
                direction: 'column',
                gap: 'md',
                align: 'start',
              })}
            >
              <FileDescriptor fileType="bagian_awal" permission="user" />
              <FileDescriptor fileType="bab_1" permission="user" />
              <FileDescriptor fileType="bab_2" permission="user" />
              <FileDescriptor fileType="bab_3" permission="user" />
              <FileDescriptor fileType="bab_4" permission="user" />
              <FileDescriptor fileType="bab_5" permission="user" />
              <FileDescriptor fileType="bagian_akhir" permission="user" />
            </div>
          </>
        )}
        <Separator gap={16} />
        <div
          className={structuralStyles.flexbox({
            direction: 'column',
            gap: 'md',
            align: 'start',
          })}
        >
          {isContributor && (
            <Text textVariant={textVariantLabel}>
              Status: &nbsp;
              <ThesisStatusPill status={item.status} />
            </Text>
          )}
          <Text textVariant={textVariantLabel}>Abstrak:</Text>
          <Text>{item.abstrak}</Text>
          <Text textVariant={textVariantLabel}>Jenis Tesis:</Text>
          <Text>{capitalize(item.tipe)}</Text>
          <Text textVariant={textVariantLabel}>Fakultas:</Text>
          <Text>{item.fakultas.nama}</Text>
          <Text textVariant={textVariantLabel}>Jurusan:</Text>
          <Text>
            {item.jurusan.kode} - {item.jurusan.nama}
          </Text>
          <Text textVariant={textVariantLabel}>Waktu Diterbitkan:</Text>
          <Text>{format(item.waktu_disetujui, 'dd MMM yyyy, HH:mm')}</Text>
          {isAllowUpload && (
            <>
              <Separator gap={24} />
              <Card
                withBorder
                shadow="xs"
                className={classNames(
                  structuralStyles.fill({ width: true }),
                  structuralStyles.flexbox({
                    direction: 'column',
                    gap: 'lg',
                    align: 'stretch',
                  }),
                )}
              >
                <Text textVariant="h2"> Upload Tugas Akhir</Text>
                {defaultValues.files.map((file, index) => {
                  return <FileInput placeholder={`Upload ${file.tipe} Anda`} />;
                })}
                <Input type="submit" text="Ajukan Publish" />
              </Card>
              <Separator gap={16} />
              <Text>
                Nb: untuk pengajuan pembatalan skripsi, silahkan kontak dosen
                pembimbing anda
              </Text>
            </>
          )}
        </div>
      </Container>
    </Form>
  );
}
