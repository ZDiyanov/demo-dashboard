export const currencies = [
  {
    id: 1,
    slug: 'currency_euro',
    title: 'Euro',
    shortTitle: 'EU',
    symbol: '€',
    displaySymbolFirst: true,
  },
  {
    id: 2,
    slug: 'currency_dollar',
    title: 'Dollar',
    shortTitle: 'USD',
    symbol: '$',
    displaySymbolFirst: true,
  },
  {
    id: 3,
    slug: 'currency_lev',
    title: 'Lev',
    shortTitle: 'LV',
    symbol: 'Лв.',
    displaySymbolFirst: false,
  },
];

export const currenciesMap = new Map(currencies.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  1: {
    id: 1,
    slug: 'euro',
    title: 'Auro',
    shortTitle: 'EU',
    symbol: '€',
    displaySymbolFirst: true,
  },
  2: {
    id: 2,
    slug: 'dollar',
    title: 'Dollar',
    shortTitle: 'USD',
    symbol: '$',
    displaySymbolFirst: true,
  },
  3: {
    id: 3,
    slug: 'lev',
    title: 'Lev',
    shortTitle: 'LV',
    symbol: 'Лв.',
    displaySymbolFirst: false,
  },
};
