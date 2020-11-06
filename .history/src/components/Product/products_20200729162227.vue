<template>
  <div class="mx-10" style="max-width:1800px">
    <v-breadcrumbs :items="items" large>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="d-flex flex-wrap">
      <v-col v-for="product in products" :key="product.id" style="max-width:250px">
        <v-card shaped class="mx-auto" width="250" style>
          <v-img :src="product.productimage[0]" height="200"></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-actions>
            <v-btn text :to="'/products/' + product.id" class="white black--text" raised>Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </div>
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
