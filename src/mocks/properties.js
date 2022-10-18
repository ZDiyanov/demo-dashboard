export default [
  {
    id: 1,
    price: {
      amount: 78000,
      currency: 1,
    },
    measurements: {
      amount: 95,
      unit: 1,
      isExact: true,
    },
    location: {
      regionId: 4, // region
      cityId: 1, // city id
      neighbourhoodId: 3, // neighbourhood id
    },
    details: {
      typeId: 1,
      rooms: 3,
      baths: 2,
      cover: 'https://cdn.lorem.space/images/house/.cache/400x280/pexels-igor-starkov-1693946.jpg',
    },
    meta: {
      // always available
      brokerId: 1, // associated broker
      clientId: 3, // client profile id
      phone: '',
    },
  },
  {
    id: 2,
    price: {
      amount: 53500,
      currency: 1,
    },
    measurements: {
      amount: 80,
      unit: 1,
      isExact: true,
    },
    location: {
      regionId: 3, // region
      cityId: 1, // city id
      neighbourhoodId: 3, // neighbourhood id
    },
    details: {
      typeId: 2,
      rooms: 4,
      baths: 3,
      cover: 'https://cdn.lorem.space/images/house/.cache/400x280/pexels-pixabay-259588.jpg',
    },
    meta: {
      // always available
      brokerId: 1, // associated broker
      clientId: 2, // client profile id
      phone: '',
    },
  },
  {
    id: 3,
    price: {
      amount: 64000,
      currency: 1,
    },
    measurements: {
      amount: 67,
      unit: 1,
      isExact: true,
    },
    details: {
      typeId: 1,
      rooms: 2,
      baths: 2,
      cover: 'https://cdn.lorem.space/images/house/.cache/400x280/pexels-expect-best-323775.jpg',
    },
  },
];
