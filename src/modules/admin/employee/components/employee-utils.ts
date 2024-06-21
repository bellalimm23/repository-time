import { EmployeeModel } from './employee-form-type';

export function employeeNameGenerator(employee: EmployeeModel) {
  return [employee.nama_depan, employee.nama_tengah, employee.nama_belakang]
    .filter(Boolean)
    .join(' ');
}
