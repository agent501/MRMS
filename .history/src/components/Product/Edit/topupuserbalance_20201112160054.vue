<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">
          <v-icon>edit</v-icon>Edit
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Edit Product</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                label="Product Name"
                id="name"
                v-model="editedname"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                label="Product Description"
                name="description"
                id="description"
                v-model="editeddescription"
                multi-line
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                label="Investmentperunit"
                name="investmentperunit"
                id="investmentperunit"
                v-model="editedinvestmentperunit"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                label="Earningperunit"
                name="earningperunit"
                id="earningperunit"
                v-model="editedearningperunit"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- <v-card-title>
          <span class="headline">Edit </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>-->
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