export const manager = {
  id: 1,
  label: 'Manager',
  slug: 'employee_type_manager',
};

export const employee = {
  id: 2,
  label: 'Employee',
  slug: 'employee_type_employee',
};

export const contractor = {
  id: 3,
  label: 'Contractor',
  slug: 'employee_type_contractor',
};

export const employeeTypesList = [manager, employee, contractor];
export const employeeTypesMap = new Map(employeeTypesList.map(({ id, ...rest }) => [id, { ...rest }]));

export default employeeTypesList;
