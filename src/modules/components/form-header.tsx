import { Check, Pencil, X } from '@phosphor-icons/react';
import classNames from 'classnames';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import Text from 'components/elements/text';
import { useFormContext } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

interface FormHeaderProps {
  title: string;
  data?: any;
}

export default function FormHeader(props: FormHeaderProps) {
  const { title, data } = props;
  const { editable, setIsEditable } = useFormState();
  const { reset } = useFormContext();
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
          <Input type="submit" text="Simpan" leftSection={<Check />} />
          {data && (
            <Button
              variant={{
                variant: 'secondaryError',
              }}
              onClick={() => {
                reset();
                setIsEditable(false);
              }}
              leftSection={<X />}
            >
              Batal
            </Button>
          )}
        </div>
      ) : (
        <Button leftSection={<Pencil />} onClick={() => setIsEditable(true)}>
          Edit
        </Button>
      )}
    </div>
  );
}
