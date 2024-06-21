import { useDeleteMutation } from 'api-hooks/common/mutation';
import notification from 'common/helpers/notification';
import { ApiListValueType } from 'common/repositories/client';
import { queryClient } from 'common/repositories/query-client';

import useDialog from './use-dialog';

export function useDelete(type: ApiListValueType, id: string) {
  const deleteMutation = useDeleteMutation(type);
  const { mutateAsync, isLoading } = deleteMutation;
  const { Dialog, open } = useDialog({
    type: 'confirmation',
    title: 'Hapus data',
    content: 'Apakah anda yakin untuk menghapus data ini?',
    cancelButtonProps: {
      children: 'Tidak',
      onClick({ onClose }) {
        onClose();
      },
    },
    confirmationButtonProps: {
      children: 'Yakin',
      variant: {
        variant: 'primaryError',
      },
      loading: isLoading,
      async onClick({ onClose }) {
        try {
          const result = await mutateAsync({ id });
          queryClient.invalidateQueries();
          notification.success({
            message: result.message,
          });
          onClose();
        } catch (e) {
          notification.error({ message: e.message });
        }
      },
    },
  });

  return {
    DeleteDialog: Dialog,
    openDeleteDialog: open,
    ...deleteMutation,
  };
}
