import React from 'react';

import ErrorView, { ErrorViewComponentProps } from './error-view-component';
import LoadingViewComponent, {
  LoadingViewComponentProps,
} from './loading-view-component';

export interface WrapperProps {
  isLoading?: boolean;
  error?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  component: React.ReactNode;
  errorVertical?: boolean;
  onRetry?: () => void;
  emptyText?: string;
  showEmptyText?: boolean;
  showEmptyComponent?: boolean;

  loadingViewComponentProps?: LoadingViewComponentProps;
  errorViewComponentProps?: ErrorViewComponentProps;
}

export default function FetchWrapperComponent(props: WrapperProps) {
  const {
    isLoading = false,
    error,
    onRetry,
    loadingComponent,
    component,
    errorComponent,
    errorVertical = false,
    loadingViewComponentProps,
    errorViewComponentProps,
  } = props;

  if (isLoading) {
    return <>{loadingComponent}</> || null;
  } else if (error) {
    if (errorComponent) {
      return (
        <>
          {errorComponent ?? (
            <LoadingViewComponent {...loadingViewComponentProps} />
          )}
        </>
      );
    }

    return (
      <ErrorView
        vertical={errorVertical}
        refetch={onRetry}
        {...errorViewComponentProps}
      />
    );
  }

  return <>{component}</>;
}
