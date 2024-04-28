import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import { StudentModel } from 'modules/admin/students/components/student-form-type';
import {
  thesis,
  ThesisModel,
} from 'modules/admin/thesis/components/thesis-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { ThesisCard } from './thesis-card';
import ThesisForm from './thesis-form';

interface ThesisListProps {
  student: StudentModel;
  isEditable?: boolean;
}

export default function ThesisList(props: ThesisListProps) {
  const { isEditable } = props;
  const [_thesis, setThesis] = React.useState<ThesisModel | undefined>(
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
        setThesis(undefined);
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
      <Text textVariant="h1">Tugas Akhir</Text>
      {createComponent}
      <Flex direction="column" gap={8}>
        {thesis.map((_thesis, index) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setThesis(_thesis);
                open();
              }}
              style={{
                position: 'relative',
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom:
                  index === thesis.length - 1
                    ? undefined
                    : `1px solid ${colors.borderPrimary}`,
                cursor: 'pointer',
              }}
            >
              {isAdmin && deleteComponent}
              <ThesisCard key={_thesis.id} {..._thesis} />
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
              {_thesis ? 'Detail Tugas Akhir' : 'Buat Tugas Akhir'}
            </Text>
          }
        >
          <ThesisForm
            thesis={_thesis}
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
