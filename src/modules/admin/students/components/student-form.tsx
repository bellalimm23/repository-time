import { Flex, Tabs } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
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

import {
  StudentFormSchema,
  StudentFormType,
  StudentModel,
} from './student-form-type';
import StudentInformationForm from './student-information-form';

interface AdminStudentFormProps {
  student?: StudentModel;
  onSubmit: (values: StudentFormType) => Promise<StudentModel | undefined>;
}

export default function AdminStudentForm(props: AdminStudentFormProps) {
  const { student, onSubmit } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<StudentFormType>(() => {
    return {
      nomor_identitas: student.nomor_identitas || '',
      deskripsi: student?.deskripsi ?? '',
      nama_belakang: student?.nama_belakang ?? '',
      nama_depan: student?.nama_depan ?? '',
      nama_tengah: student?.nama_tengah ?? '',
      program_studi_id: student?.program_studi?.id ?? '',
      password: student?.password ?? '',
      data: student,
    };
  }, [student]);
  const resolver = useYupValidationResolver(StudentFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const [tab, setTab] = React.useState('information');

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
          <FormAction />
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
