<template>
  <v-row justify="center">
    <v-dialog v-model="registerDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">
          {{useriisregistered ? 'Invest' : 'Already Invested'}}
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title v-if="useriisregistered">Unregister from meetup</v-card-title>
              <v-card-title v-else>You about to invest this product that value RM{{this.product.investmentperunit * 5}}</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
           
          <v-card-text>Once you invested, there will be no refund or return</v-card-text>
          </v-layout>
        </v-container>
    
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red text darken-1" text @click="registerDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="onSaveChanges">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['product'],
  computed:{
      useriisregistered(){
          return this.$store.getters.user.registeredProducts.findIndex(productid =>{
              return productid === this.product.id 
          }) >= 0
      }
  },
  data() {
  
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedname.trim() === '' ||
        this.editeddescription.trim() === '' ||
        this.editedearningperunit.trim() === '' ||
        this.editedinvestmentperunit.trim() === ''
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch('updateproductdata', {
        id: this.product.id,
        name: this.editedname,
        description: this.editeddescription,
        investmentperunit: this.editedinvestmentperunit,
        earningperunit: this.editedearningperunit
      });
    }
  }
};
</script>