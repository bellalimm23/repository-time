import { useMediaQuery } from '@mantine/hooks';
// import { Check, Pencil, Trash, X } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import { useFormContext } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

interface FormHeaderProps {
  title: string;
  data?: any;
  onClickDelete?: () => void;
}

export default function FormHeader(props: FormHeaderProps) {
  const { title, data, onClickDelete } = props;
  const { editable, setIsEditable } = useFormState();
  const { reset } = useFormContext();
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const size = isMobile ? 'small' : 'default';
  const miw = isMobile ? undefined : 120;
  return (
    <div
      className={classNames(
        structuralStyles.flexbox({
          direction: 'row',
          justify: 'between',
        }),
        structuralStyles.fill({ width: true }),
      )}
    >
      <Text textVariant="h1">{title}</Text>
      {editable ? (
        <div
          className={classNames(
            structuralStyles.flexbox({
              direction: 'row',
              gap: 'md',
            }),
          )}
        >
          <Input type="submit" text="Simpan" leftSection={<Icons.Check />} />
          {data && (
            <Button
              variant={{
                size,
                variant: 'secondaryError',
              }}
              onClick={() => {
                reset();
                setIsEditable(false);
              }}
              leftSection={<Icons.X />}
            >
              Batal
            </Button>
          )}
        </div>
      ) : (
        <div
          className={structuralStyles.flexbox({
            direction: 'row',
            gap: 'md',
          })}
        >
          <Button
            miw={miw}
            leftSection={<Icons.Pencil />}
            onClick={() => setIsEditable(true)}
            variant={{
              size,
            }}
          >
            Edit
          </Button>
          {onClickDelete && (
            <Button
              variant={{
                size,
                variant: 'secondaryError',
              }}
              miw={miw}
              onClick={onClickDelete}
              leftSection={<Icons.Trash />}
            >
              Hapus
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
