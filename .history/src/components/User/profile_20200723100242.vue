<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-form>
          <div class="display-2 font-weight-light">Profile Setting</div>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Email Address"
                  v-model="email"
                  class="purple-input"
                  disabled
                  outlined
                />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field label="Name" v-model="profile.name" class="purple-input" outlined />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Identification Number(IC)"
                  v-model="profile.icnumber"
                  class="purple-input"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Phone Number"
                  v-model="profile.phonenumber"
                  class="purple-input"
                  outlined
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="New Password"
                  v-model="newpassword"
                  class="purple-input"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  outlined
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Confirm Password"
                  v-model="confirmpassword"
                  class="purple-input"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[comparePassword]"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show2 = !show2"
                  outlined
                />
              </v-col>

              <v-col cols="12" class>
                <img :src="profile.ssmimage" height="200" />
              </v-col>
              <!-- <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="User Name" />
              </v-col>-->

              <!-- 
                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="Postal Code" type="number" />
              </v-col>-->
              <v-row justify="center">
                <v-dialog v-model="dialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Update Successfully</v-card-title>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="green darken-1" text @click="dialog = false" to="/">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <v-col cols="12" class="text-right">
                <v-btn color="success" class="mr-0" @click="updateProfile">Update Profile</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    {{profile}}
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
      name: '',
      phonenumber: '',
      icnumber: '',
      ssmimage: '',
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
      // var user = fb.auth().currentUser;

      // var updatepassword = this.newpassword;
      // user
      //   .updatePassword(updatepassword)
      //   .then(() => {
      //     this.dialog = true;
      //     console.log('update complete');
      // if (this.dialog === false) {
      //   this.$router.push('/');
      // }
      // })
      // .catch(error => {
      //   console.log(error);
      // });

      //   this.$router.push('/');
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
