import ThesisForm from './components/thesis-form';

export default function AdminThesisCreate() {
  return (
    <ThesisForm
      onSubmit={async (value) => {
        return undefined;
      }}
    />
  );
}
