import { Card } from '@mantine/core';
import { PageNotFoundSVG } from 'assets/svg';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';

export default function Custom404() {
  return (
    <Card withBorder radius="xl" shadow="xl">
      <PageNotFoundSVG width={300} height={300} />
      <Separator gap={24} />
      <Text textVariant="h1" ta="center">
        Page Not Found
      </Text>
    </Card>
  );
}
