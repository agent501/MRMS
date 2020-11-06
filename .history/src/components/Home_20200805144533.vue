<template>
  <div class="mx-10" style="max-width:1800px">
    <v-layout>
      <v-flex xs12 class="text-xs-center" v-if="!loading">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-carousel
      cycle
      class="mt-4"
      height="400"
      hide-delimiters
      show-arrows-on-hover
      width="100%"
      style="cursor:pointer"
    >
      <v-carousel-item
        v-for="product in products"
        :key="product.id"
        @click="onLoadProduct(product.id)"
      >
        <div class="text-right">
          <span class="title">{{ product.name }}</span>
        </div>
        <img :src="product.featureimage" style="height: 100%; width: 100%; object-fit: contain" />
      </v-carousel-item>
    </v-carousel>

    <div>
      <div class="mt-10 text-center" style="font-size:25px">Category</div>

      <v-card class="d-flex flex-wrap mx-auto text-center" width="1200" flat tile>
        <v-card
          v-for="n in 12"
          :key="n"
          class="pa-2"
          width="120"
          height="145"
          outlined
          tile
          @click="onLoadProduct(product.id)"
        >
          <v-img height="100" width="100" src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
          <p class="mt-1">Flex item</p>
        </v-card>
        {{visiblePages}}
      </v-card>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="page" :length="pageLength"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageLength: 4,
    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  }),
  computed: {
    products() {
      return this.$store.getters.featuredProducts;
    },
    loading() {
      return this.$store.getters.loading;
    },
    visiblePages() {
      return this.pages.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  methods: {
    onLoadProduct(id) {
      this.$router.push('/products/' + id);
    },
  },
};
</script>

<style scoped>
.title {
  background-color: rgba(235, 235, 235, 0.897);
  color: black;

  padding: 10px 30px;
}
</style>
