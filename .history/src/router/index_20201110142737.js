import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/Home.vue';
import products from '../components/Product/products.vue';
import product from '../components/Product/product.vue';
import createproduct from '../components/Product/createproduct.vue';
import signin from '../components/User/signin.vue';
import signup from '../components/User/signup.vue';
import profile from '../components/User/profile.vue';
import usermanage from '../components/User/usermanage.vue';
import AuthGuard from '../router/auth-guard.js';


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: home },
    { path: '/products', name: 'products', component: products },
    {
      path: '/createproduct',
      name: 'createproduct',
      component: createproduct,
      beforeEnter: AuthGuard,
    },
    { path: '/signin', name: 'signin', component: signin },
    { path: '/signup', name: 'signup', component: signup },
    { path: '/usermanage', name: 'usermanage', component: usermanage },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/products/:id',
      name: 'product',
      props: true,
      component: product,
    },
  ],
});
