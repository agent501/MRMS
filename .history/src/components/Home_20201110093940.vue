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

    <!-- Category -->
    <!-- <div>
      <v-card class="d-flex flex-column mx-auto mt-10" width="1200" flat tile>
        <div class="ml-3 mt-1" style="font-size:25px">Category</div>
        <v-card class="d-flex flex-wrap text-center mt-2" flat tile>
          <v-hover v-slot:default="{ hover }" v-for="(n,index) in visiblePages" :key="index">
            <v-card
              :elevation="hover ? 12 : 2"
              class="pa-2"
              width="120"
              height="160"
              outlined
              tile
              @click="onLoadProduct(product.id)"
            >
              <v-img height="100" width="100" :src="n.image"></v-img>
              <p class="mx-auto">{{n.title}}</p>
            </v-card>
          </v-hover>
        </v-card>
      </v-card>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="page" :length="Math.ceil(pages.length/perPage)"></v-pagination>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    perPage: 20,
    pages: [
      {
        title: 'First test card',
        image:
          'https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Second test card',
        image:
          'https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Third test card',
        image:
          'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/03/1458289957powerful-images3.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fourth test card',
        image:
          'https://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
      {
        title: 'Fifth test card',
        image:
          'http://mojly.com/wp-content/uploads/2017/12/love-image-lovely-images-photo-gallery-629721354.jpg',
        content: 'First card text content goes here',
      },
    ],
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
