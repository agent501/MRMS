<template>
  <v-row justify="center">
    <v-dialog v-model="registerDialog"  width="800px">
      <template v-slot:activator="{ on }">
        <v-btn text block class="blue white--text" raised v-on="on">
          {{useriisregistered ? 'Already Invest' : 'Invest'}}
          <!-- {{this.productid}} -->
        </v-btn>
      </template>
      <v-card>
         <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title v-if="useriisregistered">Unregister from invest</v-card-title>
              <v-card-title v-else>You about to invest this product that value RM{{5}}</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
           
          <v-card-text>Once you invested, there will be no refund or return</v-card-text>
          </v-layout>
        </v-container>
        <v-flex xs12>
            <v-card-actions>            
                  <v-btn color="green darken-1" text @click="onAgree">Confirm</v-btn>
              <v-btn color="red text darken-1" text @click="registerDialog = false">Cancel</v-btn>


        
            </v-card-actions>
        </v-flex>
        <!-- <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              
                  <v-btn color="green darken-1" text @click="onAgree">Confirm</v-btn>
              <v-btn color="red text darken-1" text @click="registerDialog = false">Cancel</v-btn>
          
            </v-card-actions>
          </v-flex>
        </v-layout> --> 
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['product1','product2'],
  computed:{
      useriisregistered(){
          return this.$store.getters.user.registeredProducts.findIndex(productid =>{
              return productid === this.product1 
          }) >=0
      }, 
     usertest() {
      return this.$store.getters.user.registeredProducts;
    },
  },
  data() {
      return{
          registerDialog:false
      }
  },
  methods: {
    onAgree() {
  
    }
  }
};
</script>