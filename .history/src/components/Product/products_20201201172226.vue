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

  <!-- filter list -->
  <!-- <v-card class="mx-auto" max-width="400">
      <v-toolbar flat color="deep-purple accent-4" dark>
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Filter results</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <h2 class="title mb-2">Choose amenities</h2>

        <v-chip-group v-model="amenities" column multiple>
          <v-chip filter outlined>Elevator</v-chip>
          <v-chip filter outlined>Washer / Dryer</v-chip>
          <v-chip filter outlined>Fireplace</v-chip>
          <v-chip filter outlined>Wheelchair access</v-chip>
          <v-chip filter outlined>Dogs ok</v-chip>
          <v-chip filter outlined>Cats ok</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-text>
        <h2 class="title mb-2">Choose neighborhoods</h2>

        <v-chip-group v-model="neighborhoods" column multiple>
          <v-chip filter outlined>Snowy Rock Place</v-chip>
          <v-chip filter outlined>Honeylane Circle</v-chip>
          <v-chip filter outlined>Donna Drive</v-chip>
          <v-chip filter outlined>Elaine Street</v-chip>
          <v-chip filter outlined>Court Street</v-chip>
          <v-chip filter outlined>Kennedy Park</v-chip>
        </v-chip-group>
      </v-card-text>
  </v-card>-->

  <!-- <v-col cols="3">
        <v-card class="pa-2" outlined tile>
          Category
          <br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.
        </v-card>
        
  </v-col>-->
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
    const a = this.$store.getters.loadUsers;
    console.log(a);
  
  },
};
</script>
