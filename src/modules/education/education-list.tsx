import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { EducationCard } from './education-card';
import EducationForm from './education-form';
import { EducationModel, educations } from './education-form-type';

interface EducationListProps {
  student: StudentModel;
  isEditable?: boolean;
}

export default function EducationList(props: EducationListProps) {
  const { isEditable } = props;
  // const { student } = props;
  const [education, setEducation] = React.useState<EducationModel | undefined>(
    undefined,
  );

  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');
  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setEducation(undefined);
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
      <Text textVariant="h1">Pendidikan</Text>
      {createComponent}
      <Flex direction="column" gap={8}>
        {educations.map((education, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setEducation(education);
                open();
              }}
              style={{
                position: 'relative',
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom:
                  index === educations.length - 1
                    ? undefined
                    : `1px solid ${colors.borderPrimary}`,
                cursor: 'pointer',
              }}
            >
              {deleteComponent}
              <EducationCard key={education.id} {...education} />
            </div>
          );
        })}
      </Flex>
      {(isAdmin || isEditable) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {education ? 'Detail Pendidikan' : 'Buat Pendidikan'}
            </Text>
          }
        >
          <EducationForm
            education={education}
            onSubmit={async (values) => {
              close();
              return undefined;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
