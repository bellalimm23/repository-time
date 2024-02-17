import { Badge, DefaultMantineColor } from '@mantine/core';
import { ThesisStatusType } from 'common/constants/tesis';

interface ThesisStatusPillProps {
  status: ThesisStatusType;
}

export function getThesisStatusStyle(status: ThesisStatusType) {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'approved':
      return 'blue';
    case 'uploading':
      return 'orange';
    case 'uploaded':
      return 'teal';
    case 'finished':
      return 'green';
    case 'takedown':
    case 'canceled':
      return 'red';
    default:
      return 'gray';
  }
}
export function useGetThesisStatusStyle(
  status: ThesisStatusType,
): DefaultMantineColor {
  return getThesisStatusStyle(status);
}
export function ThesisStatusPill(props: ThesisStatusPillProps) {
  const color = useGetThesisStatusStyle(props.status);
  return <Badge color={color}>{props.status}</Badge>;
}
