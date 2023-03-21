import { required, email, minLength } from 'vuelidate/lib/validators';

export const validationSet = (set) => ({
  typeId: { required },
  firstName: set.typeId === 1
    ? { required }
    : { required: false },
  lastName: set.typeId === 1
    ? { required }
    : { required: false },
  companyName: set.typeId === 2
    ? { required }
    : { required: false },
  uicNumber: { required: false },
  companyAddress: { required: false },
  email: {
    required: false,
    email,
  },
  phonePrefix: {
    required,
    minLength: minLength(2),
  },
  phoneNumber: {
    required,
    minLength: minLength(6),
  },
  budgetAmount: {
    required: false,
  },
  budgetCurrencyId: {
    required: false,
  },
  isOwner: {
    required: false,
  },
  isBroker: {
    required: false,
  },
});

export const columnHeaders = [
  {
    type: 'name',
    text: 'Name',
    sortable: false,
    value: 'name', // check this
  },
  {
    type: 'type',
    text: 'Type',
    sortable: false,
    value: 'typeId',
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

export const types = [
  {
    id: 1,
    label: 'Person',
    slug: 'client_type_person',
  },
  {
    id: 2,
    label: 'Company',
    slug: 'client_type_company',
  },
];

export const typesMap = new Map(types.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  validationSet,
  columnHeaders,
  types,
  typesMap,
};
