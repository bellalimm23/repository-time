import { Anchor, Flex } from '@mantine/core';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';
import { ThesisModel } from 'modules/admin/thesis/components/thesis-form-type';

export function ThesisCard(props: ThesisModel) {
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

  const dateComponent = props.waktu_terbit && (
    <Text textColor="foregroundSecondary" textVariant="body2Regular">
      {formatDate(props.waktu_terbit)}
    </Text>
  );

  return (
    <Flex direction="column" w="100%" gap={4}>
      <Text textVariant="body1Semibold">{props.judul_tugas_akhir}</Text>
      {dateComponent}
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {props.abstrak}
      </Text>
      <Flex direction="column" gap={4} w="fit-content">
        {files}
      </Flex>
    </Flex>
  );
}
