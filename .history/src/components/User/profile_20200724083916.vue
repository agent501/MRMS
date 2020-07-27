<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="display-2 font-weight-light">Edit Profile</div>
        <br />
        <v-card>
          <v-tabs v-model="tab" center-active dark>
            <v-tab>Profile Setting</v-tab>
            <v-tab>Account Setting</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>a</v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { fb } from '../firebase/firebase.js';

export default {
  props: ['id'],

  data() {
    return {
      profile: [],
      userid: '',
      dialog: false,
      email: '',
      newpassword: '',
      confirmpassword: '',
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required.',
        min: newpassword => newpassword.length >= 8 || 'Min 8 characters'
      }
    };
  },
  methods: {
    updateProfile() {
      // console.log(id);
      console.log(this.profile);
      this.$store.dispatch('updateProfileData', this.profile);
      // this.$store.dispatch('updateProfileData', this.profile);
      var user = fb.auth().currentUser;

      var updatepassword = this.newpassword;
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

      this.$router.push('/');
    }
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? 'Password do not match'
        : '';
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
