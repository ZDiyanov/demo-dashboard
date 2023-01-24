import { isObj, isArr } from '@/utils';
import initialState from '@/store/initialState';

import mockedBrokers from '@/mocks/users';

/**
* @description Is valid
* @param brokers
* @returns {boolean}
*/
const isValid = (brokers) => isObj(brokers)
  && isObj(brokers.activeItem)
  && isArr(brokers.items)
  && isObj(brokers.itemsMeta);

/**
* @description Init state
* @param initialState
* @returns {*}
*/
const initState = (initialState) => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial brokers state');
  }

  const { activeItem, items, itemsMeta } = initialState;
  return {
    activeItem,
    items,
    itemsMeta,
  };
};

/**
* @description Getters
* @type {*}
*/
export const getters = {
  activeItem: ({ activeItem }) => activeItem,
  items: ({ items }) => items,
  itemsMeta: ({ itemsMeta }) => itemsMeta,
};

const actions = {
  getItems: ({ commit, state }) => {
    const nextState = {
      ...state,
      items: mockedBrokers,
    };

    commit('SET', nextState);
  },
  getItem: ({ commit, state }, id) => {
    const nextState = {
      ...state,
      activeItem: mockedBrokers.filter((item) => item.id === id)[0],
    };

    commit('SET', nextState);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.brokers)
  ),
};

const mutations = {
  SET(state, brokers) {
    state.activeItem = brokers.activeItem;
    state.items = brokers.items;
    state.itemsMeta = brokers.itemsMeta;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
