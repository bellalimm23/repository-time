import classNames from 'classnames';
import structuralStyles, { FlexBoxType } from 'styles/layout.css';

import { commonStyles } from './styles.css';

interface ContainerProps extends React.ComponentProps<'div'> {
  flexbox?: FlexBoxType;
}

export default function Container(props: ContainerProps) {
  const { className, flexbox, ...rest } = props;

  return (
    <div
      className={classNames(
        commonStyles.rootContainer(),
        structuralStyles.flexbox(
          flexbox ?? {
            direction: 'column',
            align: 'start',
            fill: true,
          },
        ),
        className,
      )}
      {...rest}
    />
  );
}
