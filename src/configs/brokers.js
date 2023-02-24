import { required, email, minLength } from 'vuelidate/lib/validators';

export const validationSet = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phonePrefix: {
    required,
    minLength: minLength(2),
  },
  phoneNumber: {
    required,
    minLength: minLength(6),
  },
  roleId: { required },
  positionId: { required },
  statusId: { required },
  password: {
    required,
    minLength: minLength(3),
  },
};

export const columnHeaders = [
  {
    type: 'name',
    text: 'Name',
    sortable: false,
    value: 'firstname', // check this
  },
  {
    type: 'position',
    text: 'Position',
    sortable: false,
    value: 'position', // check this
  },
  {
    type: 'email',
    text: 'Email',
    sortable: false,
    value: 'email',
  },
  {
    type: 'phone',
    text: 'Phone',
    sortable: false,
    value: 'phone', // check this
  },
  {
    type: 'actions',
    text: null,
    sortable: false,
    value: null,
  },
];

export const roles = [
  {
    id: 1,
    label: 'Super Admin',
    slug: 'user_role_list_super_admin',
  },
  {
    id: 2,
    label: 'Admin',
    slug: 'user_role_list_admin',
  },
  {
    id: 3,
    label: 'Editor',
    slug: 'user_role_list_editor',
  },
];

export const statuses = [
  {
    id: 1,
    label: 'Active',
    slug: 'account_status_active',
  },
  {
    id: 2,
    label: 'Suspended',
    slug: 'account_status_suspended',
  },
  {
    id: 3,
    label: 'Archived',
    slug: 'account_status_archived',
  },
];

export const types = [
  {
    id: 1,
    label: 'Manager',
    slug: 'employee_type_manager',
  },
  {
    id: 2,
    label: 'Employee',
    slug: 'employee_type_employee',
  },
  {
    id: 3,
    label: 'Contractor',
    slug: 'employee_type_contractor',
  },
];

export const statusesMap = new Map(statuses.map(({ id, ...rest }) => [id, { ...rest }]));
export const typesMap = new Map(types.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  validationSet,
  columnHeaders,
  roles,
  statuses,
  statusesMap,
  types,
  typesMap,
};
