import { isObj, isArr } from '@/utils';
import initialState from '@/store/initialState';

import mockedClients from '@/mocks/clients';

/**
* @description Is valid
* @param clients
* @returns {boolean}
*/
const isValid = (clients) => isObj(clients)
  && isObj(clients.activeItem)
  && isArr(clients.items)
  && isObj(clients.itemsMeta);

/**
* @description Init state
* @param initialState
* @returns {*}
*/
const initState = (initialState) => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial clients state');
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
      items: mockedClients,
    };

    commit('SET', nextState);
  },
  getItem: ({ commit, state }, id) => {
    const nextState = {
      ...state,
      activeItem: mockedClients.filter((item) => item.id === id)[0],
    };

    commit('SET', nextState);
  },
  resetActiveItem: ({ commit, state }) => {
    const nextState = {
      ...state,
      activeItem: initialState.clients.activeItem,
    };

    commit('SET', nextState);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.clients)
  ),
};

const mutations = {
  SET(state, clients) {
    state.activeItem = clients.activeItem;
    state.items = clients.items;
    state.itemsMeta = clients.itemsMeta;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
