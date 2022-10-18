export const superAdmin = {
  id: 1,
  name: 'Super Admin',
  slug: 'super_admin',
  permissions: [
    {
      subject: 'dashboard',
      actions: ['view', 'edit'],
    },
    {
      subject: 'catalogue',
      actions: ['view', 'edit'],
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
