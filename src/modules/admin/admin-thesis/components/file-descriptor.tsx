import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import { FileType } from 'common/constants/file';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import structuralStyles from 'styles/layout.css';

export interface FileDescriptorProps {
  fileType: FileType;
  permission?: 'admin' | 'user';
}

export default function FileDescriptor(props: FileDescriptorProps) {
  const { fileType, permission = 'admin' } = props;
  return (
    <div
      className={classNames(
        structuralStyles.flexbox({
          direction: 'row',
          justify: 'between',
        }),
        structuralStyles.fill({
          width: true,
        }),
      )}
    >
      <div
        className={structuralStyles.flexbox({
          direction: 'row',
          gap: 'md',
        })}
      >
        <Icons.File size={16} />
        <Text textVariant="body1Regular">{fileType}.pdf</Text>
      </div>
      <Separator gap={24} />
      <div
        className={classNames(
          structuralStyles.flexbox({
            direction: 'row',
            gap: 'lg',
          }),
        )}
      >
        <Button
          variant={{
            size: 'small',
            variant: 'tertiary',
          }}
          leftSection={<Icons.DownloadSimple />}
        >
          download
        </Button>
        {permission === 'admin' && (
          <Button
            variant={{
              size: 'small',
              variant: 'secondary',
            }}
          >
            re-upload
          </Button>
        )}
      </div>
    </div>
  );
}
