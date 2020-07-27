<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm4>
        <h1 class="primary--text">SIGN UP FOR FREE</h1>
      </v-flex>
    </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <!-- email -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      outlined
                      :rules="[
                        () => email.length > 0 || 'Please insert your email',
                      ]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!-- name -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="name"
                      type="name"
                      required
                      outlined
                      :rules="[
                        () => name.length > 0 || 'Please insert your name',
                      ]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!--IC-->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="identifynumber"
                      label="Identity Number(IC) Example:91234045413"
                      id="identifynumber"
                      v-model="icnumber"
                      type="number"
                      required
                      outlined
                      :rules="[
                        () => icnumber.length > 0 || 'Please insert your IC number',
                        () => icnumber.length === 12 || 'Please insert your IC format correctly'
                      ]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!--phone number-->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="phonenumber"
                      label="Phone Number (01912345678)"
                      id="phonenumber"
                      v-model="phonenumber"
                      type="number"
                      required
                      outlined
                      :rules="[
                        () => phonenumber.length > 0 || 'Please insert your phone number',
                      ]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!-- password -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      outlined
                      required
                      @click:append="show1 = !show1"
                      :rules="[
                        () =>
                          password.length > 0 || 'Please insert your password',
                          password.length >= 8 || 'Please insert minimun 8 characters',
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <!-- confirm password -->
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      outlined
                      required
                      :rules="[confirmPassword.length > 0 || 'Please insert your password', password === confirmPassword || 'Password not match']"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-flex xs12 sm6>
                  <v-btn rounded color="red" class="ma-2 white--text" @click="onPickFile">
                    Upload SSM Certificate (jpeg)
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                  <input type="file" style="display:none" ref="fileInput" @change="uploadImage" />
                </v-flex>
                <v-flex xs12 sm6>
                  <img :src="imageurl" height="200" />
                </v-flex>
                <v-layout row>
                  <!-- subbmit button -->
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                      color="success"
                      @click="loader = 'loading'"
                    >
                      Sign Up
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
<script>
// import { fb } from '../firebase/firebase.js';
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      icnumber: '',
      phonenumber: '',
      imageurl: '',
      image: '',
      show1: false,
      show2: false
    };
  },
  methods: {
    onSignup() {
      // send the sign up data to the action inside store.js
      if (!this.image) {
        return;
      }

      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password,
        name: this.name,
        icnumber: this.icnumber,
        phonenumber: this.phonenumber,
        image: this.image
      });
    },
    onDismissed() {
      this.$store.dispatch('clearError');
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadImage(e) {
      // var self = this;
      // let file = e.target.files;

      // if (file[0].name.lastIndexOf('.') <= 0) {
      //   return alert('Please add a valid file!');
      // }

      // const fileReader = new FileReader();
      // fileReader.addEventListener('load', () => {
      //   this.imageurl = fileReader.result;
      // });
      // fileReader.readAsDataURL(file[0]);
      // this.image = file[0];
      // // console.log(this.image);
      // var storageRef = fb.storage().ref('profiles/' + file.name);

      // storageRef.put(file).then(function() {
      //   storageRef.getDownloadURL().then(function(downloadURL) {
      //     console.log('File available at', downloadURL);

      //     self.productimage.push(downloadURL);
      //   });
      // });
      let file = e.target.files[0];
      console.log(e.target.files[0]);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.ssmimg = downloadURL;
            console.log('file available at', downloadURL);
          });
        }
      );
    }
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? 'Password do not match'
        : '';
    },
    user() {
      // send the user data to the getter in store.js
      // being the bridge that connect the user status whether got change or not inside store.js State
      return this.$store.getters.user;
    },
    error() {
      // being the bridge that connect the authError status whether got change or not inside store.js State
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    // watch the user whenever the getter get a new state
    user(value) {
      if (value !== null && value !== undefined) {
        // redirect to the homepage once register is done
        console.log(value);
        this.$router.push({ path: '/' });
      }
    }
  }
};
</script>
 
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>