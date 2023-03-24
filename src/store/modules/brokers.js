import { brokerService } from '@/services';
import { isObj, isArr } from '@/utils';
import initialState from '@/store/initialState';

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
  itemsData: ({ items, itemsMeta }) => ({ items, itemsMeta }),
  // DEV NOTE: the slim broker list should be available from a backend endpoint
  slimItems: ({ items }) => items.map(({ id, firstName, lastName }) => (
    { id, firstName, lastName }
  )),
};

const actions = {
  getItems: ({ commit, state }, query) => (
    brokerService.getItems(query).then((res) => {
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
    brokerService.getItem(id).then((res) => {
      const { data: nextItem } = res.data;

      dispatch('setActiveItem', nextItem);

      return nextItem;
    })
  ),
  createItem: (context, query) => (
    brokerService.createItem(query).then((res) => res.data.data)
  ),
  updateItem: (context, query) => (
    brokerService.updateItem(query).then((res) => res.data.data)
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
