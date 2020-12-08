<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" app clipped dense permanent>
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon medium>home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-item-icon>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated || adminIsAuthenticated" @click="onLogout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="mini=!mini"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold display-1">
        <router-link to="/" tag="span" style="cursor:pointer">紫海投资网</router-link>
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
    mini: true,
    drawer: true
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
        { icon: 'person_add', text: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', text: 'Sign In', link: '/signin' },

        {
          icon: 'format_list_bulleted',
          text: '全部产品',
          link: '/products'
        }
        // { icon: 'person', text: 'About Us', link: '' }
      ];
      if (this.adminIsAuthenticated) {
        items = [
          {
            icon: 'monetization_on',
            text: 'Manage User',
            link: '/usermanage'
          },
          {
            icon: 'create_new_folder',
            text: 'Create Product',
            link: '/createproduct'
          },
          {
            icon: 'format_list_bulleted',
            text: 'All Products',
            link: '/products'
          },
          {
            icon: 'person',
            text: 'Profile',
            link: '/profile/' + this.adminIsAuthenticated.id
          }
        ];
      } else if (this.userIsAuthenticated) {
        items = [
          {
            icon: 'format_list_bulleted',
            text: 'All Products',
            link: '/products'
          },
          {
            icon: 'person',
            text: 'Profile',
            link: '/profile/' + this.userIsAuthenticated.id
          }
        ];
      }
      return items;
    },
    adminIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined &&
        this.$store.getters.user.id === 'ktQMfIIbLQRTlySJDVzU9JbCF293' &&
        this.$store.getters.user
      );
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined &&
        this.$store.getters.user
      );
    }
  },
  created() {
    // this.$vuetify.theme.dark = true;
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
