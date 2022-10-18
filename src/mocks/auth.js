import { superAdmin, admin, editor } from '@/mocks/roles';
import { superAdmins, admins, editors } from '@/mocks/users';

const types = {
  superAdmin: {
    permissions: superAdmin.permissions,
    users: [...superAdmins],
  },
  admin: {
    permissions: admin.permissions,
    users: [...admins],
  },
  editor: {
    permissions: editor.permissions,
    users: [...editors],
  },
};

export default types;
