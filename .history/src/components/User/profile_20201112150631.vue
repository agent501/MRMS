<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="display-2 font-weight-light">Profile</div>
        <br />
        <v-card>
          <v-tabs center-active dark>
            <v-tab>My Balance</v-tab> 
            <v-tab>My Invested Products</v-tab> 
            <v-tab>Profile Setting</v-tab>
            <v-tab>Account Setting</v-tab>
             <!-- Current Balance setting -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <v-container class="py-0">
                      <v-row>
                         <v-col cols="12" md="12">
                          <div class="display-1 font-weight-light">Current Balance</div>
                         </v-col>
                          <v-col cols="12" md="12">
                             <div class="display-3 font-weight-light">RM {{profile.currentbalance}}</div>
                          </v-col>
                      
                          <v-divider  class="mx-4"></v-divider>
                        <v-col cols="12" md="12">
                          <div class="display-1 font-weight-light">Earning Amount</div>
                         </v-col>
                          <v-col cols="12" md="12">
                             <div class="display-3 font-weight-light">RM 3000</div>
                          </v-col>
                        

                        <!-- <v-row justify="center">
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
                        </v-col> -->
                      </v-row> 
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
             <!-- Invested product setting -->
            <v-tab-item>
              <v-card flat>
                  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Product Name
          </th>
          <th class="text-left">
            Your Number Rank
          </th>
          <th class="text-left">
            Current Selling Rank
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
            </v-tab-item>
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
                        <v-col cols="12" md="12">
                          <v-text-field
                            label="Email"
                            v-model="profile.email"
                            class="purple-input"
                            outlined
                            disabled
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Current Password"
                            v-model="currentpassword"
                            class="purple-input"
                            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show3 ? 'text' : 'password'"
                            hint="At least 8 characters"
                            counter
                            @click:append="show3 = !show3"
                            outlined
                          />
                        </v-col>

                        <v-col cols="12">
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

                        <v-col cols="12">
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
      return this.$store.getters.loadedUsers;
    }
    // userprofile() 
    //   return this.$store.getters.profile;
    // }
  },
  created() {
    console.log(this.userdetails);
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
            ssmimage: obj[key].ssmimage,
            currentbalance: obj[key].currentbalance
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
