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
  const {
    firstName, lastName,
    email,
    phonePrefix, phoneNumber,
    password, roleId,
    statusId, positionId,
  } = item;

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

/**
 * @description Generate properly formated client object
 * @param item
 * @returns {object}
 */
export const formatClientItem = item => {
  const {
    typeId,
    firstName, lastName,
    email,
    isOwner, isBroker,
    budgetAmount, budgetCurrencyId,
    phonePrefix, phoneNumber,
    companyName, companyAddress,
    uicNumber,
  } = item;

  const nextClient = {
    type: typeId,
    email,
    is_owner: isOwner ? 1 : 0,
    is_broker: isBroker ? 1 : 0,
    budget: budgetAmount,
    budget_currency_id: budgetCurrencyId,
    phone_prefix: phonePrefix,
    phone: phoneNumber,
  };

  if (typeId === 1) {
    nextClient.firstname = firstName;
    nextClient.lastname = lastName;
  }

  if (typeId === 2) {
    nextClient.company_name = companyName;
    nextClient.company_address = companyAddress;
    nextClient.uic = uicNumber;
  }

  return nextClient;
};
