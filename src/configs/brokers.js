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

export default { validationSet, columnHeaders };
