import { PopoverProps, Popover as RawPopover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props extends Omit<PopoverProps, 'children'> {
  target: React.ReactNode;
  dropdown: React.ReactNode;
  // bgDropdown?: MantineStyleSystemProps['bg'];
}

export default function Popover(props: Props) {
  const { target, dropdown, ...rest } = props;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <RawPopover {...rest} opened={opened}>
      <RawPopover.Target>
        <button onMouseEnter={open} onMouseLeave={close}>
          {target}
        </button>
        {/* <Button
          variant="tertiary"
          noPadding
          compact
          size="small"
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {target}
        </Button> */}
      </RawPopover.Target>
      <RawPopover.Dropdown>{dropdown}</RawPopover.Dropdown>
    </RawPopover>
  );
}
