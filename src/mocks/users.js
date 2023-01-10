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
      initials: 'PR',
    },
    role: metaSA,
    position: 'Owner',
    email: 'pitar.radev@vivahome.bg',
  }, {
    id: 2,
    name: {
      first: 'Nikolay',
      middle: null,
      last: 'Radev',
      initials: 'NR',
    },
    role: metaSA,
    position: 'Owner',
    email: 'niki.radev@vivahome.bg',
  },
];

export const admins = [
  {
    id: 3,
    name: {
      first: 'Georgi',
      middle: null,
      last: 'Dimitrov',
      initials: 'GD',
    },
    role: metaA,
    position: 'Manager',
    email: 'georgi.dimitrov@vivahome.bg',
  },
];

export const editors = [
  {
    id: 4,
    name: {
      first: 'Vanesa',
      middle: null,
      last: 'Raeva',
      initials: 'VR',
    },
    role: metaE,
    position: 'Broker',
    email: 'vanesa.raeva@vivahome.bg',
  },
];

export default [...superAdmins, ...admins, ...editors];
