import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import { FileType } from 'common/constants/file';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import structuralStyles from 'styles/layout.css';

export interface FileDescriptorProps {
  fileType: FileType;
}

export default function FileDescriptor(props: FileDescriptorProps) {
  const { fileType } = props;
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
      <Text textVariant="body1Semibold">{fileType}.pdf</Text>
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
          }}
          leftSection={<Icons.DownloadSimple />}
        >
          download
        </Button>
        <Button
          variant={{
            size: 'small',
            variant: 'secondary',
          }}
        >
          re-upload
        </Button>
      </div>
    </div>
  );
}
