import { Flex } from '@mantine/core';
import { students } from 'modules/admin/students/components/student-form-type';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import ThesisList from 'modules/thesis/thesis-list';
import React from 'react';

import ProfileCard from './profile-card';

export default function Profile() {
  const student = students[0];

  return (
    <>
      <Flex mih="100vh" w="100%" maw={768} direction="column" gap={16} p={16}>
        <ProfileCard student={student} />
        <ExperienceList student={student} isEditable />
        <EducationList student={student} isEditable />
        <CertificationList student={student} isEditable />
        <OrganizationList student={student} isEditable />
        <ThesisList student={student} isEditable />
      </Flex>
    </>
  );
}
