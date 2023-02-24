import { clientService } from '@/services';
import { isObj, isArr } from '@/utils';
import initialState from '@/store/initialState';

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
  itemsData: ({ items, itemsMeta }) => ({ items, itemsMeta }),
};

const actions = {
  getItems: ({ commit, state }, query) => (
    clientService.getItems(query).then((res) => {
      const { data, meta } = res.data;
      const nextItems = {
        items: data,
        itemsMeta: meta,
      };

      const nextState = {
        ...state,
        ...nextItems,
      };

      commit('SET', nextState);

      return nextItems;
    })
  ),
  getItem: ({ dispatch }, id) => (
    clientService.getItem(id).then((res) => {
      const { data: nextItem } = res.data;

      dispatch('setActiveItem', nextItem);

      return nextItem;
    })
  ),
  createItem: (context, query) => (
    clientService.createItem(query).then((res) => res.data.data)
  ),
  updateItem: (context, query) => (
    clientService.updateItem(query).then((res) => res.data.data)
  ),
  setActiveItem: ({ commit, state }, nextActiveItem) => {
    const nextState = {
      ...state,
      activeItem: nextActiveItem,
    };

    commit('SET', nextState);

    return nextActiveItem;
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
