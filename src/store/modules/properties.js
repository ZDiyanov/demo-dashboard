import { propertyService } from '@/services';
import { isObj, isArr } from '@/utils';
import { formatPropertyItem } from '@/utils/services';
import initialState from '@/store/initialState';

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
  getItems: ({ commit, state }, query) => (
    propertyService.getItems(query).then((res) => {
      const { data, meta } = res.data;

      const nextItems = {
        items: data.map((item) => formatPropertyItem(item)),
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
    propertyService.getItem(id).then((res) => {
      const { data: nextItem } = res.data;

      dispatch('setActiveItem', formatPropertyItem(nextItem));

      return nextItem;
    })
  ),
  createItem: (context, query) => (
    propertyService.createItem(query).then((res) => res.data.data)
  ),
  // updateItem: (context, query) => (
  //   clientService.updateItem(query).then((res) => res.data.data)
  // ),
  setActiveItem: ({ commit, state }, nextActiveItem) => {
    const nextState = {
      ...state,
      activeItem: nextActiveItem,
    };

    commit('SET', nextState);

    return nextActiveItem;
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
