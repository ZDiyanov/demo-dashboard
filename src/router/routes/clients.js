export default [
  {
    path: '/clients/list',
    name: 'clientsList',
    meta: {
      slug: 'view_clients_list',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'client',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/clients/List'),
  },
  {
    path: '/clients',
    name: 'clientsIndex',
    meta: {
      slug: 'view_clients_index',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'client',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/clients/Index'),
  },
  {
    path: '/clients/archive',
    name: 'clientsArchive',
    meta: {
      slug: 'view_clients_archive',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'client',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/clients/Archive'),
  },
  {
    path: '/client/:id',
    name: 'client',
    meta: {
      slug: 'view_client',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'client',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/clients/Single'),
  },
  {
    path: '/clients/create',
    name: 'clientCreate',
    meta: {
      slug: 'view_client_create',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'client',
        actions: ['store'],
      }],
    },
    component: () => import('@/views/clients/Create'),
  },
];
