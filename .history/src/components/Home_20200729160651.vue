<template>
  <v-container>
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
      height="600"
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
  </v-container>
</template>

<script>
export default {
  // data: () => ({
  //   images: [
  //     {
  //       src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  //       title: 'image1asdasdasdsadasdasdsadasdasd',
  //       id: 'asdad123'
  //     },
  //     {
  //       src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  //       title: 'image2',
  //       id: 'asdasd1223'
  //     },
  //     {
  //       src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  //       title: 'image3',
  //       id: 'asdad13223'
  //     },
  //     {
  //       src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  //       title: 'image4',
  //       id: 'asdaasd1123'
  //     }
  //   ]
  // }),
  computed: {
    products() {
      return this.$store.getters.featuredProducts;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadProduct(id) {
      this.$router.push('/products/' + id);
    }
  }
};
</script>

<style scoped>
.title {
  background-color: rgba(235, 235, 235, 0.897);
  color: black;

  padding: 10px 30px;
}
</style>
