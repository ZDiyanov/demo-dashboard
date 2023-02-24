import { isObj, isArr } from '@/utils';
import initialState from '@/store/initialState';

import mockedProperties from '@/mocks/properties';

/**
* @description Is valid
* @param properties
* @returns {boolean}
*/
const isValid = (properties) => isObj(properties)
  && isObj(properties.activeItem)
  && isArr(properties.items)
  && isObj(properties.itemsMeta);

/**
* @description Init state
* @param initialState
* @returns {*}
*/
const initState = (initialState) => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial properties state');
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
      items: mockedProperties,
    };

    commit('SET', nextState);
  },
  getItem: ({ commit, state }, id) => {
    const nextState = {
      ...state,
      activeItem: mockedProperties.filter((item) => item.id === id)[0],
    };

    commit('SET', nextState);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.properties)
  ),
};

const mutations = {
  SET(state, properties) {
    state.activeItem = properties.activeItem;
    state.items = properties.items;
    state.itemsMeta = properties.itemsMeta;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
