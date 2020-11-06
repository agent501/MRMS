<template>
  <div>
    <p class="pa-2 display-3 font-weight-bold text-md-center text-sm-left">Product List</p>
    <v-layout row wrap justify-center>
      <v-col cols="12" md="4" v-for="product in products" :key="product.id">
        <v-card
          shaped
          class="mx-auto"
          width="500"
          min-height="300"
          style="padding:10px;margin:10px"
        >
          <v-img :src="product.productimage[0]" height="300"></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-actions>
            <v-btn text :to="'/products/' + product.id" class="white black--text" raised>Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      investmentperunit: '',
      earningperunit: '',
      productimage: [],
      imageurl: [],
    };
  },
  computed: {
    products() {
      return this.$store.getters.loadedProducts;
    },
  },
  created() {
    console.log(this.products);
  },
};
</script>
