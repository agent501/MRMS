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

    <v-item-group mandatory>
      <v-sheet class="overflow-y-auto" max-height="600" tile>
        <v-item
          v-for="[
          c,
          text,
          size,
          weight,
          spacing,
          margin
        ] in classes"
          :key="c"
        >
          <template v-slot="{ active, toggle }">
            <v-sheet
              :color="active ? 'grey lighten-4' : undefined"
              class="px-4 pt-4 pb-3"
              tile
              style="cursor: pointer;"
              @click="toggle"
            >
              <div
                :class="[`text-${c}`, active && `mb-${margin}`]"
                class="transition-swing"
                v-text="text"
              ></div>

              <v-expand-transition>
                <v-responsive v-if="active" max-width="350">
                  <div class="d-flex justify-space-between caption">
                    <div>
                      <div class="grey--text mb-2">Font</div>

                      <div class="font-weight-medium">Roboto</div>
                    </div>

                    <div>
                      <div class="grey--text mb-2">Weight</div>

                      <div class="font-weight-medium" v-text="weight"></div>
                    </div>

                    <div>
                      <div class="grey--text mb-2">Size</div>

                      <div class="font-weight-medium" v-text="size"></div>
                    </div>

                    <div>
                      <div class="grey--text text-darken-1 mb-2">Letter spacing</div>

                      <div class="font-weight-medium" v-text="spacing"></div>
                    </div>
                  </div>
                </v-responsive>
              </v-expand-transition>
            </v-sheet>
          </template>
        </v-item>
      </v-sheet>
    </v-item-group>
  </div>
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
