import { useRouter } from 'next/router';

import ThesisForm from './components/thesis-form';
import { thesis } from './components/thesis-form-type';

export default function AdminThesisView() {
  const { query } = useRouter();
  const id = query.id as string;
  const _thesis = thesis.find((t) => t.id === id);

  return (
    <ThesisForm
      thesis={_thesis}
      onSubmit={async (value) => {
        return undefined;
      }}
    />
  );
}
