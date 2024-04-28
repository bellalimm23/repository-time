import { Loader, Text } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import { UseQueryResult } from '@tanstack/react-query';
import notification from 'common/helpers/notification';
import colors from 'common/styles/colors';
import React from 'react';

function Container({ children }: { children: any }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}

interface LoaderViewProps<T> {
  query: UseQueryResult<T, Error>;
  children: (data: T) => any;
}

export default function LoaderView<T>(props: LoaderViewProps<T>) {
  const { query, children } = props;
  const { error, data, isFetching } = query;

  React.useEffect(() => {
    const message = error?.message;
    message &&
      notification.error({
        message,
      });
  }, [error?.message]);

  if (isFetching) {
    return (
      <Container>
        <Loader size={48} mb={24} />
        <Text ta="center" fw={600} fz={24}>
          Loading
        </Text>
      </Container>
    );
  }

  if (error?.message)
    return (
      <Container>
        <X size={48} color={colors.sentimentNegative} />
        <Text fw={600} fz={24}>
          Error
        </Text>
        <Text ta="center" fw={400} fz={16}>
          {error.message}
        </Text>
      </Container>
    );

  if (data === undefined) return data;

  return children(data);
}
