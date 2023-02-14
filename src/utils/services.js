const { location } = window;

/**
 * @description Services url
 * @type {string}
 */
export const servicesUrl = `${location.protocol}//${process.env.VUE_APP_API}/api`;

/**
 * @description Max items per page
 * @type {string}
 */
export const maxItemsPerPage = process.env.VUE_APP_API_MAX_ITEMS_PER_PAGE;

/**
 * @description Generate properly formated broker object
 * @param item
 * @returns {object}
 */
export const formatBrokerItem = item => {
  const { firstName, lastName, email, phonePrefix, phoneNumber, password, roleId, statusId, positionId } = item;

  return {
    firstname: firstName,
    lastname: lastName,
    email,
    phone_prefix: phonePrefix,
    phone: phoneNumber,
    password,
    role: roleId === 1 ? 'super_admin' : roleId === 2 ? 'admin' : 'editor',
    status: statusId,
    position_id: positionId,
  };
};
