export default {
  groups: [
    {
      id: 0,
      slug: 'general',
      label: 'General',
      items: [
        {
          id: 0,
          slug: 'dashboard',
          label: 'Dashboard',
          icon: 'view-dashboard',
          method: null,
          disabled: true,
        },
      ],
    },
    {
      id: 1,
      slug: 'properties',
      label: 'Properties',
      items: [
        {
          id: 1,
          slug: 'catalogue',
          label: 'Catalogue',
          icon: 'home-city',
          method: null,
          disabled: false,
        },
        {
          id: 2,
          slug: 'properties',
          label: 'My Properties',
          icon: 'folder-home',
          method: null,
          disabled: true,
        },
        {
          id: 3,
          slug: 'create',
          label: 'Create New Property',
          icon: 'home-plus',
          method: null,
          disabled: false,
        },
      ],
    },
    {
      id: 2,
      slug: 'clients',
      label: 'Clients',
      items: [
        {
          id: 4,
          slug: 'list',
          label: 'Client List',
          icon: 'account-group',
          method: null,
          disabled: true,
        },
        {
          id: 5,
          slug: 'clients',
          label: 'My Clients',
          icon: 'folder-account',
          method: null,
          disabled: true,
        },
        {
          id: 6,
          slug: 'create-client',
          label: 'Create New Client',
          icon: 'account-plus',
          method: null,
          disabled: true,
        },
      ],
    },
    {
      id: 3,
      slug: 'other',
      label: 'Other',
      items: [
        {
          id: 7,
          slug: 'starred',
          label: 'Starred',
          icon: 'star',
          method: null,
          disabled: true,
        },
      ],
    },
  ],
  app: [
    {
      id: 5,
      slug: 'settings',
      label: 'Settings',
      icon: 'cog',
      method: null,
      disabled: true,
    },
    {
      id: 6,
      slug: null,
      label: 'Logout',
      icon: 'logout',
      method: 'logout',
      disabled: false,
    },
  ],
};
