import Vue from 'vue';
import Vuex from 'vuex';

import product from './product';
import user from './user';
import shared from './shared';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    product: product,
    user: user,
    shared: shared,
  },
});
