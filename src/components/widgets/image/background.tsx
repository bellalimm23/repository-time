import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';

import ImageStyles from './styles.css';

interface BackgroundImageProps extends ImageProps {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  imageFit?: React.CSSProperties['objectFit'];
  imagePosition?: React.CSSProperties['objectPosition'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
  zIndex?: React.CSSProperties['zIndex'];
}

export default function BackgroundImage(props: BackgroundImageProps) {
  const {
    className,
    style,
    top,
    left,
    right,
    bottom,
    imageFit = 'contain',
    imagePosition,
    backgroundColor,
    zIndex,
    ...restProps
  } = props;
  return (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <Image
      className={classNames(ImageStyles.background, className)}
      style={{
        objectFit: imageFit,
        objectPosition: imagePosition,
        backgroundColor,
        zIndex,
        top: top === undefined && bottom === undefined ? '0%' : top,
        left: left === undefined && right === undefined ? '0%' : left,
        bottom,
        right,
        ...style,
      }}
      role="presentation"
      loading="lazy"
      fill
      {...restProps}
    />
  );
}
