import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { ExperienceCard } from './experience-card';
import ExperienceForm from './experience-form';
import { ExperienceModel, experiences } from './experience-form-type';

interface ExperienceListProps {
  student: StudentModel;
  isEditable?: boolean;
}

export default function ExperienceList(props: ExperienceListProps) {
  const { isEditable } = props;
  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');

  const [experience, setExperience] = React.useState<
    ExperienceModel | undefined
  >(undefined);
  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setExperience(undefined);
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
      <Text textVariant="h1">Pengalaman</Text>
      {createComponent}
      <Flex direction="column" gap={8}>
        {experiences.map((experience, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setExperience(experience);
                open();
              }}
              style={{
                position: 'relative',
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom:
                  index === experiences.length - 1
                    ? undefined
                    : `1px solid ${colors.borderPrimary}`,
                cursor: 'pointer',
              }}
            >
              {deleteComponent}
              <ExperienceCard key={experience.id} {...experience} />
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
              {experience ? 'Detail Pengalaman' : 'Buat Pengalaman'}
            </Text>
          }
        >
          <ExperienceForm
            experience={experience}
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
