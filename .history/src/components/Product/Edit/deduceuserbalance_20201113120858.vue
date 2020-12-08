<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="red" dark v-on="on">
          <v-icon>edit</v-icon>Deduce
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Deduce Amount</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="updatebalance"
                label="Amount"
                id="topupamount"
                v-model="topupamount"
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
import { fb } from '../../firebase/firebase.js';

export default {
  props: ['profile'],
  data() {
    return {
      editDialog: false,
      balance: this.profile.currentbalance,
      userid: this.profile.id,
      topupamount:0
    };
  },
  methods: {
    onSaveChanges() {
      console.log(Number(this.balance) - Number(this.topupamount));
      if (
        this.topupamount.trim() === '' 
      ) {
        return;
      }
      this.editDialog = false;
      let latestbalance = Number(this.balance) - Number(this.topupamount);
      const updateObj = {};
      if (this.balance) {
        updateObj.currentbalance = latestbalance ;
      }
      console.log(updateObj);
      fb
        .database()
        .ref('profiles')
        .child(this.userid)
        .update(updateObj)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        
        });
          window.location.reload()
    }
  }
};
</script>