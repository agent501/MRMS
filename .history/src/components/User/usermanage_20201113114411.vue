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
          <app-topup :profile="item"></app-topup>
          <td>   
            <app-deduce :profile="item"></app-deduce>
            {{newuserid}}
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
      newuserid:'',
      dialog: false,
      dialog1: false,
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
    },
  },
  computed: {
    loadprofiles() {
      return this.$store.getters.loadedProducts;
    },
  },
  created() {
    console.log(this.loadprofiles);
  
    fb.auth().onAuthStateChanged(function(user){
     
      if(user){
         
      //  let A = [];
            fb.database()
                .ref('profiles')
                .once('value')
                .then(data => {
                  var allprofiles;
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
                  this.allprofiles= profiles; 
            })
            .catch(error => {
              console.log(error);
            });
        // A = this.profiles;
        console.log('aas')
      }
    })




    // var user = fb.auth().currentUser;
    // this.userid = user.uid;
    // console.log(user.uid);
    // // console.log(this.userdetails);
    // // console.log(this.userprofile);
    // this.email = user.email;
  
  }
};
</script>
