<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn fab color="success" dark v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Edit Progress</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap v-for="(progress,i) in productprogressbar" :key="i">
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                :label="progress.title"
                id="name"
                v-model="progress.progress"
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
      productprogressbar: [
        {
          title: '1st',
          progress: this.product.productprogressbar[0].progress,
          color: 'orange'
        },
        {
          title: '2nd',
          progress: this.product.productprogressbar[1].progress,
          color: 'orange'
        },
        {
          title: '3rd',
          progress: this.product.productprogressbar[2].progress,
          color: 'orange'
        },
        {
          title: '4th',
          progress: this.product.productprogressbar[3].progress,
          color: 'orange'
        },
        {
          title: '5th',
          progress: this.product.productprogressbar[4].progress,
          color: 'orange'
        },
        {
          title: '6th',
          progress: this.product.productprogressbar[5].progress,
          color: 'orange'
        },
        {
          title: '7th',
          progress: this.product.productprogressbar[6].progress,
          color: 'orange'
        },
        {
          title: '8th',
          progress: this.product.productprogressbar[7].progress,
          color: 'orange'
        },
        {
          title: '9th',
          progress: this.product.productprogressbar[8].progress,
          color: 'orange'
        },
        {
          title: '10th',
          progress: this.product.productprogressbar[9].progress,
          color: 'orange'
        },
        {
          title: '11th',
          progress: this.product.productprogressbar[10].progress,
          color: 'orange'
        },
        {
          title: '12th',
          progress: this.product.productprogressbar[11].progress,
          color: 'orange'
        },
        {
          title: '13th',
          progress: this.product.productprogressbar[12].progress,
          color: 'orange'
        },
        {
          title: '14th',
          progress: this.product.productprogressbar[13].progress,
          color: 'orange'
        },
        {
          title: '15th',
          progress: this.product.productprogressbar[14].progress,
          color: 'orange'
        }
      ]
    };
  },
  methods: {
    onSaveChanges() {
      this.editDialog = false;
      this.$store.dispatch('updateprogressdata', {
        id: this.product.id,
        productprogressbar: this.productprogressbar
      });
    }
  }
};
</script>