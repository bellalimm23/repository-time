import classNames from 'classnames';
import React from 'react';

import { MobileContainerVariantType, commonStyles } from './styles.css';

interface Props extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  mobileContainerVariants?: MobileContainerVariantType;
}

export default function MobileContainer(props: Props) {
  const { children, mobileContainerVariants, className, ...rest } = props;
  return (
    <div
      className={classNames(
        commonStyles.mobileContainer(mobileContainerVariants),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
