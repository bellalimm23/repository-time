import { style } from '@vanilla-extract/css';

const ImageStyles = {
  background: style({
    position: 'absolute',
    width: '100%',
    height: '100%',
  }),
  backgroundContainer: style({
    position: 'relative',
    overflow: 'hidden',
  }),
};

export default ImageStyles;
