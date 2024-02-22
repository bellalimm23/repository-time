import { Drawer } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import { ThesisStatus, ThesisType } from 'common/constants/tesis';
import { userType } from 'common/constants/user';
import notification from 'common/helpers/notification';
import breakpoints from 'common/styles/breakpoint';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Select from 'components/elements/select';
import Text from 'components/elements/text';
import useDialog from 'hooks/use-dialog';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import {
  SubjectModel,
  subjects,
} from 'modules/admin/admin-subject/components/form-type';
import {
  generateName,
  users,
} from 'modules/admin/admin-user/components/form-type';
import FormHeader from 'modules/components/form-header';
import React from 'react';
import { useForm } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

import FileDescriptor from './file-descriptor';
import {
  AdminThesisSchema,
  AdminThesisFormType,
  AdminThesisMethodType,
  ThesisModel,
} from './form-type';

interface AdminThesisProps {
  thesis?: ThesisModel;
  onSubmit: (
    values: AdminThesisFormType,
    form: AdminThesisMethodType,
  ) => Promise<ThesisModel>;
}

export default function AdminThesis(props: AdminThesisProps) {
  const { thesis } = props;
  const defaultValues = React.useMemo<AdminThesisFormType>(() => {
    return {
      abstrak: thesis?.abstrak || '',
      fakultas_id: thesis?.fakultas?.id || '',
      judul: thesis?.judul || '',
      jurusan_id: thesis?.jurusan?.id || '',
      status: thesis?.status || ThesisStatus.pending,
      tipe: thesis?.tipe || ThesisType.skripsi,
      user_ids:
        thesis?.users?.map((user) => {
          return user.id;
        }) || [],
      waktu_disetujui: thesis?.waktu_disetujui || new Date(),
    };
  }, [thesis]);

  const resolver = useYupValidationResolver(AdminThesisSchema());

  const methods = useForm<AdminThesisFormType>({
    defaultValues,
    resolver,
  });

  const { setValue } = methods;

  const onSubmit = React.useCallback(
    async (values: AdminThesisFormType) => {
      try {
        await props.onSubmit(values, methods);
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [methods, props],
  );

  const onClickDeleteSubject = React.useCallback(() => {}, []);

  const { Dialog, open } = useDialog({
    type: 'confirmation',
    title: 'Ubah Status',
    content: 'Apakah anda yakin untuk mengubah status?',
    confirmationButtonProps: {
      children: 'Ok',
      onClick: ({ onClose }) => {
        onClose();
      },
    },
    cancelButtonProps: {
      children: 'Batal',
      onClick: ({ onClose }) => {
        onClose();
      },
    },
  });

  const [isOpened, { open: openFile, close: closeFile }] = useDisclosure(false);
  const isMobile = useMediaQuery(breakpoints.screenMaxXs);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!thesis}>
      <FormHeader
        title={thesis ? 'Edit Tugas Akhir' : 'Buat Tugas Akhir'}
        data={thesis}
        onClickDelete={onClickDeleteSubject}
        rightComponent={
          thesis && !isMobile ? (
            <Select
              name="status"
              size="xs"
              allowDeselect={false}
              noMargin
              w="110px"
              defaultValue={methods.getValues('status')}
              data={[
                {
                  label: 'Pending',
                  value: ThesisStatus.pending,
                },
                {
                  label: 'Approved',
                  value: ThesisStatus.approved,
                },
                {
                  label: 'Canceled',
                  value: ThesisStatus.canceled,
                },
                {
                  label: 'Uploading',
                  value: ThesisStatus.uploading,
                },
                {
                  label: 'Uploaded',
                  value: ThesisStatus.uploaded,
                },
                {
                  label: 'Finished',
                  value: ThesisStatus.finished,
                },
              ]}
              onChange={() => {
                open();
              }}
            />
          ) : undefined
        }
      />
      {isMobile && thesis && (
        <Select
          name="status"
          size="xs"
          allowDeselect={false}
          noMargin
          w="110px"
          defaultValue={methods.getValues('status')}
          data={[
            {
              label: 'Pending',
              value: ThesisStatus.pending,
            },
            {
              label: 'Approved',
              value: ThesisStatus.approved,
            },
            {
              label: 'Canceled',
              value: ThesisStatus.canceled,
            },
            {
              label: 'Uploading',
              value: ThesisStatus.uploading,
            },
            {
              label: 'Uploaded',
              value: ThesisStatus.uploaded,
            },
            {
              label: 'Finished',
              value: ThesisStatus.finished,
            },
          ]}
          onChange={() => {
            open();
          }}
        />
      )}
      <Separator gap={16} />

      <Input
        type="radio-group"
        orientation="horizontal"
        data={[
          {
            label: 'Skripsi',
            value: ThesisType.skripsi,
          },
          {
            label: 'Tesis',
            value: ThesisType.tesis,
          },
        ]}
        name="tipe"
        label="Tipe Tugas Akhir"
      />
      <Input type="text" name="judul" label="Judul" placeholder="Judul" />
      <Input
        type="textarea"
        name="abstrak"
        label="Abstrak"
        placeholder="Abstrak"
        minRows={5}
      />
      <Input
        type="select"
        name="jurusan_id"
        label="Jurusan"
        placeholder="Jurusan"
        data={subjects.map((subject) => {
          return {
            label: [subject.kode, subject.nama].join(' - '),
            value: subject.id,
            extra: subject,
          };
        })}
        onAfterChange={(value, option) => {
          const subject = (option as any).extra as never as SubjectModel;
          setValue('fakultas_id', subject.fakultas.id);
        }}
      />

      {/* <Input
        type="select"
        name="fakultas_id"
        label="Fakultas"
        placeholder="Fakultas"
        data={divisions.map((division) => {
          return {
            label: division.nama,
            value: division.id,
          };
        })}
        disabled
      /> */}

      <Input
        type="multi-select"
        name="user_ids"
        label="Penulis"
        placeholder="Penulis"
        data={users
          .filter((user) => user.tipe_user === userType.user)
          .map((user) => {
            return {
              value: user.id,
              label: [user.nomor_identitas, generateName(user)].join(' - '),
            };
          })}
      />
      {thesis && (
        <Button
          onClick={openFile}
          w={150}
          leftSection={<Icons.Eye size={16} />}
          variant={{
            variant: 'secondary',
            size: 'small',
          }}
        >
          Lihat Dokumen
        </Button>
      )}
      <Drawer
        opened={isOpened}
        onClose={closeFile}
        title={<Text textVariant="h3">Daftar Dokumen</Text>}
        position="right"
        size="lg"
      >
        <div
          className={classNames(
            structuralStyles.flexbox({
              direction: 'column',
              gap: 'lg',
            }),
          )}
        >
          <FileDescriptor fileType="bagian_awal" />
          <FileDescriptor fileType="bab_1" />
          <FileDescriptor fileType="bab_2" />
          <FileDescriptor fileType="bab_3" />
          <FileDescriptor fileType="bab_4" />
          <FileDescriptor fileType="bab_5" />
          <FileDescriptor fileType="bagian_akhir" />
        </div>
      </Drawer>
      {Dialog}
    </Form>
  );
}
