<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped dense>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-item-icon>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold display-1">
        <router-link to="/" tag="span" style="cursor:pointer">JguarHo</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <!-- Page Content -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- <v-footer>
      <span>JguarHo &copy; Copyright Reserved</span>
    </v-footer>-->
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false
    // items: [
    //   { icon: 'lock_open', text: 'Sign In', link: '/signin' },
    //   { icon: 'home', text: 'Home', link: '/' },
    //   { icon: 'list', text: 'All Products', link: '/products' },
    //   { icon: 'help_outline', text: 'About Us', link: '' }
    // ]
  }),
  computed: {
    menuItems() {
      let items = [
        { icon: 'lock_open', text: 'Sign In', link: '/signin' },
        { icon: 'home', text: 'Home', link: '/' },
        { icon: 'list', text: 'All Products', link: '/products' },
        { icon: 'help_outline', text: 'About Us', link: '' }
      ];
      if (this.userIsAuthenticated) {
        items = [
          { icon: 'home', text: 'Home', link: '/' },
          { icon: 'room', text: 'Create Product', link: '/createproduct' },
          { icon: 'list', text: 'All Products', link: '/products' },
          { icon: 'help_outline', text: 'About Us', link: '' }
        ];
      }
      return items;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>
