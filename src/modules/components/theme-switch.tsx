import Switch, { SwitchProps } from 'components/elements/switch';
import useTheme from 'hooks/use-theme';

interface ThemeSwitchProps extends SwitchProps {}

export default function ThemeSwitch(props: ThemeSwitchProps) {
  const { onToggle, theme } = useTheme();
  const {
    size = 'md',
    onChange,
    noMargin,
    checked = theme === 'light',
    ...rest
  } = props;

  return (
    <Switch
      size={size}
      checked={checked}
      onChange={(e) => {
        onToggle();
        onChange(e);
      }}
      noMargin={noMargin}
      {...rest}
    />
  );
}
