export const superAdmin = {
  id: 1,
  name: 'Super Admin',
  slug: 'super_admin',
  permissions: [
    {
      subject: 'app',
      actions: ['view', 'edit', 'list'],
    },
    {
      subject: 'properties',
      actions: ['view', 'create', 'edit', 'list'],
    },
    {
      subject: 'clients',
      actions: ['view', 'create', 'edit', 'list'],
    },
    {
      subject: 'brokers',
      actions: ['view', 'create', 'edit', 'list'],
    },
  ],
};

export const admin = {
  id: 2,
  name: 'Admin',
  slug: 'admin',
  permissions: [
    {
      subject: 'catalogue',
      actions: ['view'],
    },
    {
      subject: 'dashboard',
      actions: ['view', 'edit'],
    }
  ],
};

export const editor = {
  id: 3,
  name: 'Editor',
  slug: 'editor',
  permissions: [
    {
      subject: 'dashboard',
      actions: ['view'],
    }
  ],
};

export default [superAdmin, admin, editor];
