import colors from 'common/styles/colors';
import * as React from 'react';

interface Props {
  orientation: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  margin?: number;
  style?: React.CSSProperties;
}

export default function Divider(props: Props) {
  const {
    orientation,
    thickness = 1,
    color: backgroundColor = colors.coreDark,
    margin = 0,
  } = props;

  const style = React.useMemo(() => {
    const marginTop = Math.floor(margin / 2);
    const marginBottom = margin - marginTop;
    switch (orientation) {
      case 'vertical':
        return {
          width: thickness,
          height: '100%',
          marginLeft: marginTop,
          marginRight: marginBottom,
        };

      default:
        return {
          width: '100%',
          height: thickness,
          marginTop,
          marginBottom,
        };
    }
  }, [margin, orientation, thickness]);

  return (
    <div
      style={{
        content: '""',
        borderRadius: 999999,
        backgroundColor,
        ...style,
        ...props.style,
      }}
    />
  );
}
