<template>
  <!-- product image -->
  <v-container>
    <v-carousel hide-delimiters continuous>
      <v-carousel-item v-for="(item,i) in product.productimage" :key="i">
        <img :src="item" style="height: 100%; width: 100%; object-fit: contain" />
      </v-carousel-item>
    </v-carousel>

    <v-row no-gutters>
      <!-- product info -->
      
      <v-col cols="12" md="6">
         
        <v-card class="text-capitalize" outlined>
          <v-card-title class="text-uppercase font-weight-bold display-1">
            Product details
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-product :product="product.id"></app-edit-product>
              <v-btn text @click.stop="dialog = true" class="red white--text" raised>
                <v-icon>delete_forever</v-icon>Delete
              </v-btn>
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete it?</v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      raised
                      @click="deleteProduct(product.id)"
                      type="submit"
                    >Yes</v-btn>

                    <v-btn color="red darken-1" raised @click="dialog = false">No</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-card-title>
          <v-col>
            <!-- register product -->
            <app-register-product :product1="product.id"></app-register-product>
            
            
          </v-col>
          <v-list-item>
            <v-list-item-content>Product name</v-list-item-content>
            <v-list-item-content class="subtitle-1 font-weight-thin">: {{ product.name }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Product Description</v-list-item-content>
            <v-list-item-content class="subtitle-1 font-weight-thin">: {{ product.description }}</v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>investment per unit</v-list-item-content>
            <v-list-item-content
              class="subtitle-1 font-weight-thin"
            >: RM{{ product.investmentperunit }}</v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>earning per unit</v-list-item-content>
            <v-list-item-content
              class="subtitle-1 font-weight-thin"
            >: RM{{ product.earningperunit }}</v-list-item-content>
          </v-list-item>
        </v-card>
        
      </v-col>
      <!-- product investment progress -->
      <v-col cols="12" md="6">
        <v-card class="pa-8">
         
          <template v-if="userIsCreator">
            <app-edit-progress :product="product"></app-edit-progress>
          </template>
          
          <v-card-title row wrap class="text-center title">Current Status</v-card-title>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <v-spacer></v-spacer>
          <br />
          <span v-for="(progress,i) in product.productprogressbar" :key="i">
            <v-col cols="12" md="8">{{progress.title}} Batch</v-col>
            <v-col>
              <v-progress-linear
                :buffer-value="progress.progress"
                :value="progress.progress"
                stream
                height="25"
                :color="progress.color"
              >
                <strong>{{ Math.ceil(progress.progress) }}%</strong>
              </v-progress-linear>
            </v-col>
          </span>
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      reactive: 'true',
      name: '',
      dialog: false,
      // totalinvestunit: this.product.investmentperunit * 5,
      investdialog: false,
    };
  },
  methods: {
    deleteProduct(id) {
      this.dialog = false;
      // console.log(id);

      this.$store.dispatch('deleteProduct', id);
      //  fb.database()
      // .ref('products')
      // .child(id)
      // .remove()
      // .then(function() {
      //   // File deleted successfully
      //   // commit('deleteProduct', payload);
      //   console.log('success');
      // })
      // .catch(function(error) {
      //   // Uh-oh, an error occur
      //   console.log(error);
      // });

      this.$router.push('/products');
    },
    investProduct(id,investprice){
      this.$store.dispatch('investProduct',{id,investprice})
    }
  },
  computed: {
    product() {
      return this.$store.getters.loadedProduct(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.product.creatorId;
    }
  }
};
</script>
