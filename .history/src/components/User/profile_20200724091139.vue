<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="display-2 font-weight-light">Edit Profile</div>
        <br />
        <v-card>
          <v-tabs center-active dark>
            <v-tab>Profile Setting</v-tab>
            <v-tab>Account Setting</v-tab>
            <!-- profile setting -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-text-field
                            label="Name"
                            v-model="profile.name"
                            class="purple-input"
                            outlined
                          />
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

                        <v-col cols="12" class="text-sm-center">
                          <p>SSM Certificate</p>

                          <img :src="profile.ssmimage" height="300" />
                        </v-col>

                        <v-row justify="center">
                          <v-dialog v-model="dialog" max-width="290">
                            <v-card>
                              <v-card-title class="headline">Update Successfully</v-card-title>

                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="green darken-1"
                                  text
                                  @click="dialog = false"
                                  to="/"
                                >Close</v-btn>
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
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- account setting -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-container class="py-0">
                      <v-row>
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

                        <v-row justify="center">
                          <v-dialog v-model="dialog" max-width="290">
                            <v-card>
                              <v-card-title class="headline">Update Successfully</v-card-title>

                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="green darken-1"
                                  text
                                  @click="dialog = false"
                                  to="/"
                                >Close</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>

                        <v-col cols="12" class="text-right">
                          <v-btn
                            color="success"
                            class="mr-0"
                            @click="updatePassword"
                          >Update Password</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
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
    updatePassword() {
      // var user = fb.auth().currentUser;
      // var updatepassword = this.newpassword;
      // var credential = EmailAuthProvider.credential(user.email);
      // user
      //   .reauthenticateWithCredential(credential)
      //   .then(() => {
      //     user
      //       .updatePassword(updatepassword)
      //       .then(() => {
      //         this.dialog = true;
      //         console.log('update complete');
      //         if (this.dialog === false) {
      //           this.$router.push('/');
      //         }
      //       })
      //       .catch(error => {
      //         console.log(error);
      //       });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
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
