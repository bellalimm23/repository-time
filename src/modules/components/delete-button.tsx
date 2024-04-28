import { Trash } from '@phosphor-icons/react';
import { UseMutationResult } from '@tanstack/react-query';
import ActionButton from 'components/action-button';
import React from 'react';

interface DeleteButtonProps {
  type: 'button' | 'icon';
  mutation?: UseMutationResult;
  onClick: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const { mutation, onClick } = props;

  const icon = <Trash size={16} />;

  if (props.type === 'button') {
    return (
      <ActionButton
        type={props.type}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        rightSection={icon}
        loading={mutation?.isLoading}
        error
      >
        Hapus
      </ActionButton>
    );
  } else {
    return (
      <ActionButton
        type={props.type}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        children={icon}
        loading={mutation?.isLoading}
        color="red"
        variant="outline"
      />
    );
  }
}
