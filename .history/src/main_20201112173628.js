import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import alert from './components/Shared/Alert.vue';
import vuetify from './plugins/vuetify';
import { fb } from './components/firebase/firebase.js';
import * as firebase from 'firebase';
import editproductdiaglog from './components/Product/Edit/editproductdialog.vue';
import editprogressbar from './components/Product/Edit/editprogressbar.vue';
import topupuserbalance from './components/Product/Edit/topupuserbalance.vue';
import deduceuserbalance from './components/Product/Edit/deduceuserbalance.vue';

Vue.component('app-alert', alert);
Vue.component('app-edit-product', editproductdiaglog);
Vue.component('app-edit-progress', editprogressbar);
Vue.component('app-topup', topupuserbalance);
Vue.component('app-deduce',deduceuserbalance);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    fb;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autosignin', user);
      }
    });
    this.$store.dispatch('loadProducts');
  },
}).$mount('#app');
