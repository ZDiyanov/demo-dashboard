export default [
  {
    path: '/properties/catalogue',
    name: 'propertiesCatalogue',
    meta: {
      slug: 'view_properties_catalogue',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'property',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/properties/Catalogue'),
  },
  {
    path: '/properties',
    name: 'propertiesIndex',
    meta: {
      slug: 'view_properties_index',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'property',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/properties/Index'),
  },
  {
    path: '/properties/archive',
    name: 'propertiesArchive',
    meta: {
      slug: 'view_properties_archive',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'property',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/properties/Archive'),
  },
  {
    path: '/property/:id',
    name: 'property',
    meta: {
      slug: 'view_property',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'property',
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
      slug: 'view_property_create',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'property',
        actions: ['store'],
      }],
    },
    component: () => import('@/views/properties/Create'),
  },
];
