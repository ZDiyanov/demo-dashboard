import { brokerService } from '@/services';
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
  itemsData: ({ items, itemsMeta }) => ({ items, itemsMeta }),
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
  getItem: ({ commit, state }, id) => {
    const nextState = {
      ...state,
      activeItem: mockedBrokers.filter((item) => item.id === id)[0],
    };

    commit('SET', nextState);
  },
  createItem: (context, query) => (
    brokerService.createItem(query).then((res) => res.data.data)
  ),
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
