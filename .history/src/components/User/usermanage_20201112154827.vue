<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="display-2 font-weight-light">User Manage and Balance Top Up</div>
        <br />
        <v-card>
        
              <v-card flat>
                  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            User ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Current Balance
          </th>
        
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in profiles"
          :key="item.name"
        >
          <td>{{ item.icnumber }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.currentbalance }}</td>
          <td> 
            <v-btn text @click.stop="dialog1 = true" class="green white--text" raised>
                Top up
              </v-btn>
              <v-dialog v-model="dialog1" max-width="290">
                <v-card>
                  <v-card-title class="headline">Insert top up amount</v-card-title>
                 <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                label="Amount"
                name="updatebalancetopup"
                id="updatebalancetopup"
                v-model="updatebalancetopup"
                required
              ></v-text-field>
            </v-flex>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      raised
                      @click="updatebalancetopup(item.id)"
                      type="submit"
                    >Confirm</v-btn>

                    <v-btn color="red darken-1" raised @click="dialog = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          <td>   
            <v-btn text @click.stop="dialog = true" class="red white--text" raised>
                Deduct
              </v-btn>
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete it?</v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      raised
                      @click="deleteProduct(product.id)"
                      type="submit"
                    >Yes</v-btn>

                    <v-btn color="red darken-1" raised @click="dialog = false">No</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
              </v-card>
                <div class="text-center">
    <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
  </div>
        </v-card>
      </v-col>
    </v-row> 
  </v-container>
</template>


<script>
import { fb } from '../firebase/firebase.js';
import * as firebase from 'firebase';

export default {
  props: ['id'],

  data() {
    return {
      page: 1,
      profiles: [],
      userid: '',
      dialog: false,
      dialog1: false,
      email: '',
      newpassword: '',
      updatebalancetopup: '',
      confirmpassword: '',
      currentpassword: '',
      rules: {
        required: value => !!value || 'Required.',
        min: newpassword => newpassword.length >= 8 || 'Min 8 characters'
      }
    };
  },
  methods: {
    updatePassword() {
      var user = fb.auth().currentUser;
      var updatepassword = this.newpassword;
      var credential = firebase.auth.EmailAuthProvider.credential(
        this.email,
        this.currentpassword
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user
            .updatePassword(updatepassword)
            .then(() => {
              this.dialog = true;
              console.log('update complete');
              if (this.dialog === false) {
                this.$router.push('/');
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateProfile() {
      // console.log(id);
      console.log(this.profile);
      if (this.$store.dispatch('updateProfileData', this.profile)) {
        this.dialog = true;
        console.log('update complete');
        if (this.dialog === false) {
          this.$router.push('/');
        }
      }
      // this.$store.dispatch('updateProfileData', this.profile);

      this.$router.push('/');
    }
  },
  computed: {
    loadprofiles() {
      return this.$store.getters.loadedProducts;
    },
  },
  created() {
    console.log(this.loadprofiles);
    var user = fb.auth().currentUser;
    this.userid = user.uid;
    console.log(user.uid);
    // console.log(this.userdetails);
    // console.log(this.userprofile);
    this.email = user.email;
    fb.database()
      .ref('profiles')
      // .orderByChild('userid')
      // .equalTo(user.uid)
      .once('value')
      .then(data => {
        var profiles = [];
        let obj = data.val();
        for (let key in obj) {
          profiles.push({
            id: key,
            name: obj[key].name,
            email: obj[key].email,
            icnumber: obj[key].icnumber,
            phonenumber: obj[key].phonenumber,
            userid: obj[key].userid,
            ssmimage: obj[key].ssmimage,
            currentbalance: obj[key].currentbalance
          });
        }
        console.log(profiles);
        this.profiles = profiles;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
