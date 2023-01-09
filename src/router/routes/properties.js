export default [
  {
    path: '/properties/catalogue',
    name: 'propertiesCatalogue',
    meta: {
      label: 'Catalogue',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'properties',
        actions: ['list'],
      }],
    },
    component: () => import('@/views/properties/Catalogue'),
  },
  {
    path: '/properties',
    name: 'propertiesIndex',
    meta: {
      label: 'My Properties',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'properties',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/properties/Index'),
  },
  {
    path: '/property/:id',
    name: 'property',
    meta: {
      label: 'Property',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'properties',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/properties/Single'),
    props: true,
  },
  {
    path: '/property/create',
    name: 'propertyCreate',
    meta: {
      label: 'Create New Property',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'properties',
        actions: ['create'],
      }],
    },
    component: () => import('@/views/properties/Create'),
  },
];
