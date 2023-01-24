// eslint-disable-next-line import/no-cycle
import router from '@/router';
// eslint-disable-next-line import/no-cycle
import store, { resetStores } from '@/store';
import initialState from '@/store/initialState';
import { isNum, isObj, isArr, isNull } from '@/utils';
import isAuthorized from '@/utils/permissions';

import mockedRoles from '@/mocks/roles';
import mockedUsers from '@/mocks/users';

/**
* @description Is valid
* @param auth
* @returns {boolean}
*/
const isValid = (auth) => isObj(auth)
  && isNull(auth.token)
  && isObj(auth.role)
  && isObj(auth.user)
  && isArr(auth.permissions)
  && isObj(auth.redirects);

/**
* @description Init state
* @param initialState
* @returns {*}
*/
const initState = (initialState) => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial auth state');
  }

  const { token, user, role, permissions, redirects } = initialState;
  return {
    token,
    user,
    role,
    permissions,
    redirects,
  };
};

/**
* @description Set ability
* @param permissions
*/
const setAbility = (permissions) => {
  router.app.$ability.update(permissions);
};

/**
* @description Revoke ability
*/
const revokeAbility = () => {
  router.app.$ability.update([]);
};

/**
* @description Getters
* @type {*}
*/
export const getters = {
  user: ({ user }) => user,
  role: ({ role }) => role,
  token: ({ token }) => token,
  permissions: ({ permissions }) => permissions,
  redirects: ({ redirects }) => redirects,
  isAuthorized: ({ permissions }) => (requestedPermissions) => (
    isAuthorized(permissions, requestedPermissions)
  ),
  isLogged: ({ user }) => isNum(user.id)
};

const actions = {
  executeLogin: ({ commit, state }, data) => {
    const token = 'caiwnec13923d1o2d123d123cma0392';
    const user = mockedUsers.find((user) => user.email === data.email);
    const { role } = user;
    const { permissions } = mockedRoles.find((mockRole) => mockRole.id === role.id);

    const nextAuth = {
      ...state,
      token,
      role,
      user,
      permissions,
    };

    setAbility(permissions);

    commit('SET', nextAuth);

    return router.replace({ name: 'dashboard' });
  },
  logout: ({ commit }) => {
    actions.resetAll({ commit });
    revokeAbility();

    return router.replace({ name: 'login' });
  },
  reset: ({ commit }) => (
    commit('SET', initialState.auth)
  ),
  resetAll: () => resetStores(store),
  set: ({ commit }, auth) => {
    commit('SET', auth);
  }
};

const mutations = {
  SET(state, auth) {
    state.token = auth.token;
    state.user = auth.user;
    state.role = auth.role;
    state.permissions = auth.permissions;
    state.redirects = auth.redirects;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
