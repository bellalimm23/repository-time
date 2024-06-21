import { Trash } from '@phosphor-icons/react';
import { DeleteableType } from 'api-hooks/common/model';
import ActionButton from 'components/action-button';
import { useDelete } from 'hooks/use-delete';
import React from 'react';

interface DeleteButtonProps {
  type: 'button' | 'icon';
  deleteable: DeleteableType;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const { deleteable } = props;

  const icon = <Trash size={16} />;
  const mutation = useDelete(deleteable);
  const { DeleteDialog, openDeleteDialog } = mutation;

  if (props.type === 'button') {
    return (
      <>
        <ActionButton
          variant={{
            variant: 'primaryError',
          }}
          type={props.type}
          onClick={(e) => {
            e.stopPropagation();
            openDeleteDialog();
          }}
          rightSection={icon}
          loading={mutation?.isLoading}
          error
        >
          Hapus
        </ActionButton>
        {DeleteDialog}
      </>
    );
  } else {
    return (
      <>
        <ActionButton
          type={props.type}
          onClick={(e) => {
            e.stopPropagation();
            openDeleteDialog();
          }}
          children={icon}
          loading={mutation?.isLoading}
          color="red"
          variant="outline"
        />
        {DeleteDialog}
      </>
    );
  }
}
