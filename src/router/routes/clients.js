export default [
  {
    path: '/clients/list',
    name: 'clientsList',
    meta: {
      label: 'Client List',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'clients',
        actions: ['list'],
      }],
    },
    component: () => import('@/views/clients/List'),
  },
  {
    path: '/clients',
    name: 'clientsIndex',
    meta: {
      label: 'My Clients',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'clients',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/clients/Index'),
  },
  {
    path: '/client/:id',
    name: 'client',
    meta: {
      label: 'Client',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'clients',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/clients/Single'),
  },
  {
    path: '/client/create',
    name: 'clientCreate',
    meta: {
      label: 'Create New Client',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'clients',
        actions: ['create'],
      }],
    },
    component: () => import('@/views/clients/Create'),
  },
];
