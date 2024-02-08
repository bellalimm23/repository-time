import { ActionIcon } from '@mantine/core';
import { Minus, Plus } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import useCounter from 'hooks/use-counter';
import usePressHoldAction from 'hooks/use-press-hold-action';
import React from 'react';

import Text, { TextProps } from '../text';

export type CounterOptions = {
  min: number;
  max: number;
  onChange: (value: number) => void;
  value: number;
  initialValue: number;
  iconSize: number;
  labelProps: TextProps;
};

interface Props extends Partial<CounterOptions> {}

export default function Counter(props: Props) {
  const {
    initialValue,
    max,
    min,
    onChange,
    value,
    iconSize = 16,
    labelProps,
  } = props;

  const { handler, step, isMax, isMin } = useCounter({
    initialValue,
    onChange,
    value,
    options: {
      max,
      min,
    },
  });

  const [startIncrementAction, stopIncrementAction] = usePressHoldAction(
    handler.increment,
  );
  const [startDecreamentAction, stopDecreamentAction] = usePressHoldAction(
    handler.decrement,
  );

  return (
    <div style={styles.rootContainer}>
      <Text ta="center" textVariant="body2Regular" {...labelProps}>
        {step}
      </Text>
      <div style={styles.actionContainer}>
        <ActionIcon
          variant="transparent"
          onClick={handler.decrement}
          onMouseDown={startDecreamentAction}
          onMouseUp={stopDecreamentAction}
          onMouseLeave={stopDecreamentAction}
          onTouchStart={startDecreamentAction}
          onTouchEnd={stopDecreamentAction}
        >
          <Minus
            weight="bold"
            size={iconSize}
            color={isMin ? colors.foregroundTertiary : colors.foregroundPrimary}
          />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          onClick={handler.increment}
          onMouseDown={startIncrementAction}
          onMouseUp={stopIncrementAction}
          onMouseLeave={stopIncrementAction}
          onTouchStart={startIncrementAction}
          onTouchEnd={stopIncrementAction}
        >
          <Plus
            weight="bold"
            size={iconSize}
            color={isMax ? colors.foregroundTertiary : colors.foregroundPrimary}
          />
        </ActionIcon>
      </div>
    </div>
  );
}

const styles: { [x: string]: React.CSSProperties } = {
  rootContainer: {
    padding: 8,
    border: '2px solid rgba(129, 131, 147, 0.25)',
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '115px',
    position: 'relative',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
  },
};
