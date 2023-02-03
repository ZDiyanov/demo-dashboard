export const superAdmins = [
  {
    id: 1,
    firstName: 'Pitar',
    lastName: 'Radoev',
    roleId: 1,
    positionId: 1,
    email: 'pitar.radev@vivahome.bg',
    phonePrefix: 359,
    phoneNumber: 877113307,
  },
  {
    id: 2,
    firstName: 'Nikolay',
    lastName: 'Radev',
    role: 1,
    positionId: 1,
    email: 'niki.radev@vivahome.bg',
    phonePrefix: 359,
    phoneNumber: 877113307,
  },
];

export const admins = [
  {
    id: 3,
    firstName: 'Georgi',
    lastName: 'Dimitrov',
    roleId: 2,
    positionId: 2,
    email: 'georgi.dimitrov@vivahome.bg',
    phonePrefix: 359,
    phoneNumber: 877113307,
  },
];

export const editors = [
  {
    id: 4,
    firstName: 'Vanesa',
    lastName: 'Raeva',
    roleId: 3,
    positionId: 3,
    email: 'vanesa.raeva@vivahome.bg',
    phonePrefix: 359,
    phoneNumber: 877113307,
  },
];

export default [...superAdmins, ...admins, ...editors];
