export const currencies = [
  {
    id: 1,
    slug: 'currency_euro',
    symbol: '€',
    displaySymbolFirst: true,
  },
  {
    id: 2,
    slug: 'currency_dollar',
    symbol: '$',
    displaySymbolFirst: true,
  },
  {
    id: 3,
    slug: 'currency_lev',
    symbol: 'Лв.',
    displaySymbolFirst: false,
  },
];

export const currenciesMap = new Map(currencies.map(({ id, ...rest }) => [id, { ...rest }]));

export default {
  currencies,
  currenciesMap,
};
