// import { required, email, minLength } from 'vuelidate/lib/validators';

export const validationSet = (set) => ({});

export const types = [
  {
    id: 1,
    slug: 'property_type_apartment',
    hasRoomDetails: true,
    hasAmenityList: true,
  },
  {
    id: 2,
    slug: 'property_type_house',
    hasRoomDetails: true,
    hasAmenityList: true,
  },
  {
    id: 3,
    slug: 'property_type_garage',
    hasRoomDetails: false,
    hasAmenityList: false,
  },
  {
    id: 4,
    slug: 'property_type_attick',
    hasRoomDetails: false,
    hasAmenityList: true,
  },
  {
    id: 5,
    slug: 'property_type_business',
    hasRoomDetails: true,
    hasAmenityList: true,
  },
  {
    id: 6,
    slug: 'property_type_land',
    hasRoomDetails: false,
    hasAmenityList: true,
  },
  {
    id: 7,
    slug: 'property_type_hotel',
    hasRoomDetails: true,
    hasAmenityList: true,
  },
  {
    id: 8,
    slug: 'property_type_guesthouse',
    hasRoomDetails: true,
    hasAmenityList: true,
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

export const amenities = [
  {
    id: 1,
    slug: 'amenity_kitchen',
    icon: 'countertop-outline',
  },
  {
    id: 2,
    slug: 'amenity_internet_tv',
    icon: 'wifi',
  },
  {
    id: 3,
    slug: 'amenity_elevator',
    icon: 'elevator-passenger-outline',
  },
  {
    id: 4,
    slug: 'amenity_garage',
    icon: 'garage-variant',
  },
  {
    id: 5,
    slug: 'amenity_parking_space',
    icon: 'car-brake-parking',
  },
  {
    id: 6,
    slug: 'amenity_mortgaged',
    icon: 'home-import-outline',
  },
  {
    id: 7,
    slug: 'amenity_needs_renovation',
    icon: 'account-hard-hat-outline',
  },
  {
    id: 8,
    slug: 'amenity_working_business',
    icon: 'handshake-outline',
  },
  {
    id: 9,
    slug: 'amenity_furnished',
    icon: 'sofa-outline',
  },
  {
    id: 10,
    slug: 'amenity_possible_barter',
    icon: 'home-switch-outline',
  },
  {
    id: 11,
    slug: 'amenity_security',
    icon: 'shield-home',
  },
  {
    id: 12,
    slug: 'amenity_entrance_control',
    icon: 'cctv',
  },
  {
    id: 13,
    slug: 'amenity_residential_complex',
    icon: 'sitemap-outline',
  },
  {
    id: 14,
    slug: 'amenity_railroad_apartment',
    icon: 'map-marker-path',
  },
];

export const typesMap = new Map(types.map(({ id, ...rest }) => [id, { ...rest }]));
export const constructionMap = new Map(construction.map(({ id, ...rest }) => [id, { ...rest }]));
export const unitsMap = new Map(units.map(({ id, ...rest }) => [id, { ...rest }]));
export const amenitiesMap = new Map(amenities.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  types,
  typesMap,
  construction,
  constructionMap,
  units,
  unitsMap,
  amenities,
  amenitiesMap,
};
