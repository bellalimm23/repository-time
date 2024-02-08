import Text from 'components/elements/text';
import { useRouter } from 'next/router';

export default function UserView() {
  const { query } = useRouter();
  return (
    <>
      <Text textVariant="h1" textColor="mainWhite">
        Lihat User {JSON.stringify(query)}`
      </Text>
    </>
  );
}
