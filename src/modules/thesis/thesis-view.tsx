import Text from 'components/elements/text';
import { useRouter } from 'next/router';

export default function ThesisView() {
  const { query } = useRouter();
  return (
    <>
      <Text textVariant="h1" textColor="mainWhite">
        Lihat Thesis {JSON.stringify(query)}`
      </Text>
    </>
  );
}
