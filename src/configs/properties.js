export const types = [
  {
    id: 1,
    slug: 'property_type_apartment',
    hasRoomDetails: true,
    hasAmendityList: true,
  },
  {
    id: 2,
    slug: 'property_type_house',
    hasRoomDetails: true,
    hasAmendityList: true,
  },
  {
    id: 3,
    slug: 'property_type_garage',
    hasRoomDetails: false,
    hasAmendityList: false,
  },
  {
    id: 4,
    slug: 'property_type_attick',
    hasRoomDetails: false,
    hasAmendityList: true,
  },
  {
    id: 5,
    slug: 'property_type_business',
    hasRoomDetails: true,
    hasAmendityList: true,
  },
  {
    id: 6,
    slug: 'property_type_land',
    hasRoomDetails: false,
    hasAmendityList: true,
  },
  {
    id: 7,
    slug: 'property_type_hotel',
    hasRoomDetails: true,
    hasAmendityList: true,
  },
  {
    id: 8,
    slug: 'property_type_guesthouse',
    hasRoomDetails: true,
    hasAmendityList: true,
  },
];

export const construction = [
  {
    id: 1,
    slug: 'construction_type_lps',
  },
  {
    id: 2,
    slug: 'construction_type_brick',
  },
  {
    id: 3,
    slug: 'construction_type_steel',
  },
  {
    id: 4,
    slug: 'construction_type_wood',
  },
  {
    id: 5,
    slug: 'construction_type_container',
  },
];

export const units = [
  {
    id: 1,
    slug: 'square_metres',
    title: 'Squere Metres',
    shortTitle: 'M2',
    symbol: 'm<sup>2</sup>',
  },
  {
    id: 2,
    slug: 'decare',
    title: 'Decare',
    shortTitle: 'DAA',
    symbol: 'daa',
  },
  {
    id: 3,
    slug: 'hectare',
    title: 'Hectare',
    shortTitle: 'HA',
    symbol: 'ha',
  },
];

export const ammendities = [
  {
    id: 1,
    slug: 'amendity_kitchen',
    icon: 'countertop-outline',
  },
  {
    id: 2,
    slug: 'amendity_internet_tv',
    icon: 'wifi',
  },
  {
    id: 3,
    slug: 'amendity_elevator',
    icon: 'elevator-passenger-outline',
  },
  {
    id: 4,
    slug: 'amendity_garage',
    icon: 'garage-variant',
  },
  {
    id: 5,
    slug: 'amendity_parking_space',
    icon: 'car-brake-parking',
  },
  {
    id: 6,
    slug: 'amendity_mortgaged',
    icon: 'home-import-outline',
  },
  {
    id: 7,
    slug: 'amendity_needs_renovation',
    icon: 'account-hard-hat-outline',
  },
  {
    id: 8,
    slug: 'amendity_working_business',
    icon: 'handshake-outline',
  },
  {
    id: 9,
    slug: 'amendity_furnished',
    icon: 'sofa-outline',
  },
  {
    id: 10,
    slug: 'amendity_possible_barter',
    icon: 'home-switch-outline',
  },
  {
    id: 11,
    slug: 'amendity_security',
    icon: 'shield-home',
  },
  {
    id: 12,
    slug: 'amendity_entrance_control',
    icon: 'cctv',
  },
  {
    id: 13,
    slug: 'amendity_residential_complex',
    icon: 'sitemap-outline',
  },
  {
    id: 14,
    slug: 'amendity_railroad_apartment',
    icon: 'map-marker-path',
  },
];

export const typesMap = new Map(types.map(({ id, ...rest }) => [id, { ...rest }]));
export const constructionMap = new Map(construction.map(({ id, ...rest }) => [id, { ...rest }]));
export const unitsMap = new Map(unit.map(({ id, ...rest }) => [id, { ...rest }]));
export const ammenditiesMap = new Map(ammendities.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  types,
  typesMap,
  construction,
  constructionMap,
  units,
  unitsMap,
  ammendities,
  ammenditiesMap,
};
