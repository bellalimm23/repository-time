import { useMediaQuery } from '@mantine/hooks';
import { Pen, X } from '@phosphor-icons/react';
import classNames from 'classnames';
import breakpoints from 'common/styles/breakpoint';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import { useFormState } from 'components/elements/form/context';
import { useFormContext } from 'react-hook-form';
import structuralStyles from 'styles/layout.css';

export default function ButtonForm() {
  const { reset } = useFormContext();
  const { editable, setIsEditable } = useFormState();
  const className = structuralStyles.fill({ flex: true });

  const isMobile = useMediaQuery(breakpoints.screenMaxSm);

  const direction = 'row';
  const size = isMobile ? 'small' : 'default';
  const fullWidth = isMobile;

  if (editable) {
    return (
      <div
        className={classNames(
          structuralStyles.flexbox({ direction, gap: 'md' }),
          structuralStyles.fill({
            width: true,
          }),
        )}
      >
        <Button
          fullWidth={fullWidth}
          className={className}
          variant={{
            size,
            variant: 'secondaryError',
          }}
          onClick={() => {
            setIsEditable(false);
            reset();
          }}
          leftSection={<X />}
        >
          Batal
        </Button>
        <Input
          fullWidth={fullWidth}
          variant={{
            size,
          }}
          className={className}
          type="submit"
          text="Simpan"
        />
      </div>
    );
  } else {
    return (
      <Button
        fullWidth
        onClick={() => setIsEditable(true)}
        leftSection={<Pen />}
      >
        Edit
      </Button>
    );
  }
}
