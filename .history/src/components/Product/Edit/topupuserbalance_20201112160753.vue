<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">
          <v-icon>edit</v-icon>Top Up
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Top Up</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="updatebalance"
                label="Amount"
                id="updatebalance"
                v-model="topupbalance"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="onSaveChanges">Save</v-btn>
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
  data() {
    return {
      editDialog: false,
      editedname: this.product.name,
      editeddescription: this.product.description,
      editedearningperunit: this.product.earningperunit,
      editedinvestmentperunit: this.product.investmentperunit
    };
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