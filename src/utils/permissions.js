import { isObj } from './index';

/**
 * @desc Is authorized
 * @param permissions
 * @param requestedPermissions
 * @returns {boolean}
 */
export default function isAuthorized(permissions, requestedPermissions) {
  let isAuthorized = true;

  requestedPermissions.forEach(({ subject, actions }) => {
    if (!isAuthorized) {
      return false;
    }

    const targetGroup = permissions.find((p) => p.subject === subject);

    if (!isObj(targetGroup)) {
      isAuthorized = false;
      return false;
    }

    actions.forEach((action) => {
      if (!isAuthorized) {
        return false;
      }

      isAuthorized = targetGroup.actions.indexOf(action) > -1;
    });
  });

  return isAuthorized;
}
