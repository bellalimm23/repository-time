import { Flex, Tabs } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadPhotoProfile } from 'api/storage';
import { MeModel } from 'api-hooks/auth/model';
import { StudentModel } from 'api-hooks/student/model';
import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import React from 'react';
import { useForm } from 'react-hook-form';

import { StudentFormSchema, StudentFormType } from './student-form-type';
import StudentInformationForm from './student-information-form';

interface AdminStudentFormProps {
  student?: StudentModel | MeModel;
  onSubmit: (values: StudentFormType) => Promise<StudentModel | undefined>;
}

export default function AdminStudentForm(props: AdminStudentFormProps) {
  const { student } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<StudentFormType>(() => {
    return {
      nomor_identitas: student.nomorIdentitas || '',
      deskripsi: student?.deskripsi ?? '',
      nama_belakang: student?.namaBelakang ?? '',
      nama_depan: student?.namaDepan ?? '',
      nama_tengah: student?.namaTengah ?? '',
      program_studi_id: student?.programStudi?.id ?? '',
      data: student,
    };
  }, [student]);
  const resolver = useYupValidationResolver(StudentFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const [tab, setTab] = React.useState('information');

  const onSubmit = React.useCallback(
    async (values: StudentFormType) => {
      try {
        const result = await props.onSubmit(values);
        const file = files[0];
        file && (await uploadPhotoProfile(result.nomorIdentitas, file));
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [files, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!student}>
      <FormLabel />
      {student && (
        <Tabs value={tab} onChange={(value) => setTab(value)} mb={16}>
          <Tabs.List>
            <Tabs.Tab value="information">Informasi</Tabs.Tab>
            <Tabs.Tab value="details">Detail</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
      {tab === 'information' && (
        <>
          <StudentInformationForm files={files} setFiles={setFiles} />
          <FormAction isEdit={!!student} />
        </>
      )}
      {tab === 'details' && (
        <Flex direction="column" gap={16}>
          <ExperienceList student={student} isEditable />
          <EducationList student={student} isEditable />
          <CertificationList student={student} isEditable />
          <OrganizationList student={student} isEditable />
        </Flex>
      )}
    </Form>
  );
}
