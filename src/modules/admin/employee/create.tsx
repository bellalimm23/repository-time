import EmployeeForm from './components/employee-form';

export default function EmployeeCreate() {
  return (
    <EmployeeForm
      onSubmit={(value) => {
        return undefined;
      }}
    />
  );
}
