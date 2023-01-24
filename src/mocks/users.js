import { superAdmin, admin, editor } from '@/mocks/roles';

const { permissions: permissionsSA, ...metaSA } = superAdmin;
const { permissions: permissionsA, ...metaA } = admin;
const { permissions: permissionsE, ...metaE } = editor;

export const superAdmins = [
  {
    id: 1,
    name: {
      first: 'Pitar',
      middle: null,
      last: 'Radoev',
    },
    role: metaSA,
    position: 'Owner',
    email: 'pitar.radev@vivahome.bg',
    phone: {
      prefix: '+359',
      value: 877113307,
    },
  }, {
    id: 2,
    name: {
      first: 'Nikolay',
      middle: null,
      last: 'Radev',
    },
    role: metaSA,
    position: 'Owner',
    email: 'niki.radev@vivahome.bg',
    phone: {
      prefix: '+359',
      value: 877113307,
    },
  },
];

export const admins = [
  {
    id: 3,
    name: {
      first: 'Georgi',
      middle: null,
      last: 'Dimitrov',
    },
    role: metaA,
    position: 1,
    email: 'georgi.dimitrov@vivahome.bg',
    phone: {
      prefix: 359,
      value: 877113307,
    },
  },
];

export const editors = [
  {
    id: 4,
    name: {
      first: 'Vanesa',
      middle: null,
      last: 'Raeva',
    },
    role: metaE,
    position: 'Broker',
    email: 'vanesa.raeva@vivahome.bg',
    phone: {
      prefix: '+359',
      value: 877113307,
    },
  },
];

export default [...superAdmins, ...admins, ...editors];
