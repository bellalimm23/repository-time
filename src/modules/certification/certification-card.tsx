import { Anchor, Badge, Flex } from '@mantine/core';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';

import { CertificationModel } from './certification-form-type';

export function CertificationCard(props: CertificationModel) {
  const dateLabel = [
    formatDate(props.waktu_terbit),
    props.waktu_kadaluarsa ? formatDate(props.waktu_kadaluarsa) : 'Sekarang',
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

  const skills = props.skills.split('|').map((skill) => {
    return <Badge>{skill}</Badge>;
  });

  return (
    <Flex direction="column" w="100%" gap={4}>
      <Text textVariant="body1Semibold">{props.nama_sertifikasi}</Text>
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {[props.nama_institusi, dateLabel].join(', ')}
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
