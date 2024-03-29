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
 * @description Generate properly formated broker payload
 * @param item
 * @returns {object}
 */
export const formatBrokerPayload = item => {
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
 * @description Generate properly formated client payload
 * @param item
 * @returns {object}
 */
export const formatClientPayload = item => {
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

/**
 * @description Generate properly formated property payload
 * @param item
 * @returns {object}
 */
export const formatPropertyPayload = item => {
  const {
    typeId,
    constructionId, constructionYear,
    priceAmount, priceCurrencyId,
    roomsTotal, bedrooms, bathrooms,
    areaValue, areaUnitId, areaIsExact,
    amenities,
    regionId, cityId, neighbourhoodId,
    address, notes, cover,
    brokerId, clientId,
  } = item;

  return {
    type_id: typeId,
    construction_id: constructionId,
    construction_year: constructionYear,
    price: priceAmount,
    currency_id: priceCurrencyId,
    rooms_total: roomsTotal,
    bedrooms,
    bathrooms,
    area: areaValue,
    area_unit_id: areaUnitId,
    area_is_exact: areaIsExact,
    amenities,
    region_id: regionId,
    city_id: cityId,
    neighbourhood_id: neighbourhoodId,
    address,
    notes,
    cover,
    broker_id: brokerId,
    client_id: clientId,
  };
};

/**
 * @description Generate properly formated property item
 * @param item
 * @returns {object}
 */
export const formatPropertyItem = item => {
  const { id, details, price, measurements, amenities, location, meta } = item;
  const { typeId, constructionId, constructionYear, roomsTotal, bedrooms, bathrooms, cover, gallery } = details;
  const { amount: areaValue, unit: areaUnitId, isExact: areaIsExact } = measurements;
  const { amount: priceAmount, currency: priceCurrencyId } = price;
  const { regionId, cityId, neighbourhoodId } = location;
  const { brokerId, clientId, userId } = meta;

  return {
    id,
    typeId,
    constructionId,
    constructionYear,
    priceAmount,
    priceCurrencyId,
    roomsTotal,
    bedrooms,
    bathrooms,
    areaValue,
    areaUnitId,
    areaIsExact,
    amenities,
    regionId,
    cityId,
    neighbourhoodId,
    // address,
    // notes,
    cover,
    brokerId,
    clientId,
  };
};
