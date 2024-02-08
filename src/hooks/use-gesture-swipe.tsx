import React from 'react';

// https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react

export type SwipeDirectionType = 'horizontal' | 'vertical';

interface Props {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeTop?: () => void;
  onSwipeBottom?: () => void;
  swipeDirection?: SwipeDirectionType;
}

export default function useGestureSwipe(props: Props) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeBottom,
    onSwipeTop,
    swipeDirection = 'horizontal',
  } = props;

  const touchStart = React.useRef(null);
  const touchEnd = React.useRef(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;
  const isHorizontal = swipeDirection === 'horizontal';

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      touchEnd.current = null; // otherwise the swipe is fired even with usual touch events
      touchStart.current = isHorizontal
        ? e.targetTouches[0].clientX
        : e.targetTouches[0].clientY;
    },
    [isHorizontal],
  );

  const onTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) =>
      (touchEnd.current = e.targetTouches[0].clientX),
    [],
  );

  const onTouchEnd = React.useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe) {
      onSwipeLeft?.();
      onSwipeBottom?.();
    }

    if (isLeftSwipe) {
      onSwipeRight?.();
      onSwipeTop?.();
    }
  }, [
    onSwipeBottom,
    onSwipeLeft,
    onSwipeRight,
    onSwipeTop,
    touchEnd,
    touchStart,
  ]);

  return {
    onTouchEnd,
    onTouchMove,
    onTouchStart,
  };
}
