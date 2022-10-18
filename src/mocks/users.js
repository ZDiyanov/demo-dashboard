import { superAdmin, admin, editor } from '@/mocks/roles';

const { permissions: permissionsSA, ...metaSA } = superAdmin;
const { permissions: permissionsA, ...metaA } = admin;
const { permissions: permissionsE, ...metaE } = editor;

export const superAdmins = [
  {
    id: 1,
    firstname: 'Pitar',
    lastname: 'Radoev',
    initials: 'PR',
    role: metaSA,
    position: 'Owner',
    email: 'pitar.radev@vivahome.bg',
  }, {
    id: 2,
    firstname: 'Nikolay',
    lastname: 'Radev',
    initials: 'NR',
    role: metaSA,
    position: 'Owner',
    email: 'niki.radev@vivahome.bg',
  },
];

export const admins = [
  {
    id: 3,
    firstname: 'Georgi',
    lastname: 'Dimitrov',
    initials: 'GD',
    role: metaA,
    position: 'Manager',
    email: 'georgi.dimitrov@vivahome.bg',
  },
];

export const editors = [
  {
    id: 4,
    firstname: 'Vanesa',
    lastname: 'Raeva',
    role: metaE,
    position: 'Broker',
    email: 'vanesa.raeva@vivahome.bg',
  },
];

export default [...superAdmins, ...admins, ...editors];
