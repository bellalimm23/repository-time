import { useRouter } from 'next/router';

import EmployeeForm from './components/employee-form';
import { employees } from './components/employee-form-type';

export default function EmployeeView() {
  const { query } = useRouter();
  const id = query.id;
  const employee = employees.find(
    (employee) => employee.nomor_identitas === id,
  );
  return (
    <EmployeeForm
      employee={employee}
      onSubmit={(value) => {
        return undefined;
      }}
    />
  );
}
