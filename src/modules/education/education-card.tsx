import { Anchor, Badge, Flex } from '@mantine/core';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';

import { EducationModel } from './education-form-type';

export function EducationCard(props: EducationModel) {
  const dateLabel = [
    formatDate(props.waktu_mulai),
    props.waktu_mulai ? formatDate(props.waktu_selesai) : 'Sekarang',
  ].join(' - ');

  const files = props.items.map((item) => {
    const file = item.file_url.split('/');
    return (
      <Anchor
        fz={11}
        c="blue"
        href={item.file_url}
        target="_blank"
        key={item.file_url}
      >
        {file[file.length - 1]}
      </Anchor>
    );
  });

  const label = [props.gelar, props.bidang_studi].filter(Boolean).join(', ');
  const labelComponent = label && (
    <Text textColor="foregroundSecondary" textVariant="body2Regular">
      {label}
    </Text>
  );

  const skills = props.skills.split('|').map((skill) => {
    return <Badge>{skill}</Badge>;
  });

  return (
    <Flex direction="column" w="100%" gap={4}>
      <Text textVariant="body1Semibold">{props.nama_institusi}</Text>
      {labelComponent}
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {dateLabel}
      </Text>
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {props.deskripsi}
      </Text>
      <Flex direction="row" wrap="wrap" gap={4}>
        {skills}
      </Flex>
      <Flex direction="column" gap={4} w="fit-content">
        {files}
      </Flex>
    </Flex>
  );
}
