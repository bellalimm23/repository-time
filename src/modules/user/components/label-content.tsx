import { useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/styles/breakpoint';
import Text from 'components/elements/text';
import React from 'react';
import structuralStyles from 'styles/layout.css';

interface LabelContentProps {
  label: React.ReactNode;
  content: React.ReactNode;
}

export default function LabelContent(props: LabelContentProps) {
  const { content, label } = props;
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);

  const textVariantLabel = isMobile ? 'body1Semibold' : 'h3';

  return (
    <div
      className={structuralStyles.flexbox({
        direction: 'column',
        gap: 'md',
        align: 'start',
      })}
    >
      <Text textVariant={textVariantLabel}>{label}</Text>
      <Text>{content}</Text>
    </div>
  );
}
