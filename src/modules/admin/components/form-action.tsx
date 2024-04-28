import { SimpleGrid } from '@mantine/core';
import { FloppyDisk, Pencil, X } from '@phosphor-icons/react';
import { NavigationRoute } from 'common/routes/routes';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import { useRouter } from 'next/router';
import React from 'react';

interface FormActionProps {}

export default function FormAction(props: FormActionProps) {
  const { editable, setIsEditable } = useFormState();
  const { pathname } = useRouter();

  const isEdit = React.useMemo(() => {
    switch (pathname as NavigationRoute) {
      case NavigationRoute.StudentView:
      case NavigationRoute.ThesisView:
      case NavigationRoute.AdminEmployeeView:
      case NavigationRoute.AdminStudentView:
      case NavigationRoute.AdminStudyProgramView:
      case NavigationRoute.AdminThesisView:
        return true;
      default:
        return false;
    }
  }, [pathname]);

  const buttonEdit = isEdit && !editable && (
    <Button
      rightSection={<Pencil size={16} />}
      variant={{ variant: 'secondary' }}
      onClick={() => setIsEditable(true)}
    >
      Edit
    </Button>
  );

  const buttonCreate = editable && (
    <Input
      rightSection={<FloppyDisk size={16} />}
      type="submit"
      variant={{
        variant: 'primary',
      }}
    />
  );

  const buttonCancel = editable && isEdit && (
    <Button
      rightSection={<X size={16} />}
      onClick={() => setIsEditable(false)}
      error
      variant={{
        variant: 'secondaryError',
      }}
    >
      Batal
    </Button>
  );

  const items = [buttonEdit, buttonCreate, buttonCancel].filter(Boolean);

  return (
    <SimpleGrid cols={items.length}>
      {buttonEdit}
      {buttonCancel}
      {buttonCreate}
    </SimpleGrid>
  );
}
