import classNames from 'classnames';

import { FixedContainerVariantType, commonStyles } from './styles.css';

interface Props extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  fixedContainerVariants?: FixedContainerVariantType;
}

/** Mostly use fixed bottom container */
export default function FixedContainer(props: Props) {
  const { children, fixedContainerVariants, className, ...rest } = props;
  return (
    <div
      className={classNames(
        commonStyles.fixedContainer(fixedContainerVariants),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
