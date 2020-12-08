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
          <th class="text-left">  
             Current Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.yourrank }}</td>
          <td>{{ item.currentselling }}</td>
          <td><v-chip
      class="ma-2"
      :color="item.color"
      text-color="white"
    >
      {{ item.investstatus }}
    </v-chip></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
              </v-card>
          
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
      desserts: [
          {
            name: 'Frozen Yogurt',
            investstatus: 'Stand By',
             color:'blue',
             currentselling:1,
             yourrank:10
          },
          {
            name: 'Ice cream sandwich',
            investstatus: 'Complete',
            color:'green',
             currentselling:12,
             yourrank:10
          },
          {
            name: 'Eclair',
            investstatus: 'Complete',
            color:'green'
            ,
             currentselling:12,
             yourrank:10
          },
          {
            name: 'Cupcake',
            investstatus: 'Complete',
            color:'green',
             currentselling:12,
             yourrank:10
          },
          {
            name: 'Gingerbread',
            investstatus: 'Complete',
            color:'green',
             currentselling:12,
             yourrank:10
          },
          {
            name: 'Jelly bean',
            investstatus: 'In Progress',
            color:'red',
             currentselling:3,
             yourrank:5
          },
          {
            name: 'Lollipop',
            investstatus: 'Stand By',
            color:'blue',
             currentselling:1,
             yourrank:10
          },
          {
            name: 'Honeycomb',
            investstatus: 'In Progress',
            color:'red'
            ,
             currentselling:12,
             yourrank:15
          },
          {
            name: 'Donut',
            investstatus: 'In Progress',
            color:'red',
             currentselling:12,
             yourrank:10
          },
          {
            name: 'KitKat',
            investstatus: 'In Progress',
            color:'red',
             currentselling:12,
             yourrank:10
          },
        ],
      profile: [],
      userid: '',
      dialog: false,
      email: '',
      newpassword: '',
      confirmpassword: '',
      currentpassword: '',
      show1: false,
      show2: false,
      show3: false,
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
    comparePassword() {
      return this.newpassword !== this.confirmpassword
        ? 'Password do not match'
        : null;
    },
    userdetails() {
      return this.$store.getters.user;
    }
    // userprofile() {
    //   return this.$store.getters.profile;
    // }
  },
  created() {
    var user = fb.auth().currentUser;
    this.userid = user.uid;
    console.log(user.uid);
    // console.log(this.userdetails);
    // console.log(this.userprofile);
    this.email = user.email;
    fb.database()
      .ref('profiles')
      .orderByChild('userid')
      .equalTo(user.uid)
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
            ssmimage: obj[key].ssmimage
          });
        }
        console.log(profiles);
        this.profile = profiles.find(({ userid }) => userid === user.uid);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
