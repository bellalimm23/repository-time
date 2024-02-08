import { Card, Center } from '@mantine/core';
import classNames from 'classnames';
import { Brand } from 'common/constants/brand';
import Text from 'components/elements/text';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import structuralStyles from 'styles/layout.css';

export default function Footer() {
  return (
    <Card
      className={classNames(
        structuralStyles.fill({
          width: true,
        }),
      )}
      withBorder
      shadow="xl"
      radius={0}
    >
      <Center>
        <BrandIconDirectHome />
      </Center>
      <Text textVariant="body1Semibold" ta="center">
        &copy; copyright 2023 {Brand.name}
      </Text>
    </Card>
  );
}
