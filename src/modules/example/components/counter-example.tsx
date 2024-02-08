import { Flex } from '@mantine/core';
import Counter from 'components/elements/counter';
import Text from 'components/elements/text';

export default function CounterExample() {
  return (
    <Flex direction="column" gap={8} my={24}>
      <Text textVariant="h1">Counter Section</Text>
      <Counter />
    </Flex>
  );
}
