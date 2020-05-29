<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <p class="display-1 text-capitalize">create a new product</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateProduct">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Product Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                v-model="description"
                :error-messages="descriptionErrors"
                label="Product Description"
                multi-line
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="investmentperunit"
                :error-messages="investmentunitErrors"
                label="Investment per Unit(RM)"
                required
                @input="$v.investmentperunit.$touch()"
                @blur="$v.investmentperunit.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                v-model="earningperunit"
                :error-messages="earningunitErrors"
                label="Earning per Unit(RM)"
                required
                @input="$v.earningperunit.$touch()"
                @blur="$v.earningperunit.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn rounded color="red" class="ma-2 white--text" @click="onPickFile">
                Upload Image
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
              <input type="file" style="display:none" ref="fileInput" @change="uploadImage" />
              <!-- <v-file-input
                small-chips
                prepend-icon="insert_photo"
                multiple
                counter
                label="Upload your image"
                :error-messages="productimageErrors"
                @change="uploadImage"
                accept="image/*"
              ></v-file-input>-->
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 v-for="(image,i) in productimage" :key="i">
              <img :src="image" height="150" />
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="mr-4" color="primary" @click="submit" type="submit">submit</v-btn>
              <v-btn color="blue-grey" @click="clear">clear</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { fb } from '../firebase/firebase.js';

export default {
  components: {},
  mixins: [validationMixin],

  validations: {
    name: { required },
    description: { required },
    investmentperunit: { required },
    earningperunit: { required },
    productimage: { required, minLength: minLength(4) }
  },

  data() {
    return {
      name: '',
      description: '',
      investmentperunit: '',
      earningperunit: '',
      productimage: [],
      imageurl: [],
      productprogressbar: [
        { title: '1st', progress: 0, color: 'orange' },
        { title: '2nd', progress: 0, color: 'orange' },
        { title: '3rd', progress: 0, color: 'orange' },
        { title: '4th', progress: 0, color: 'orange' },
        { title: '5th', progress: 0, color: 'orange' },
        { title: '6th', progress: 0, color: 'orange' },
        { title: '7th', progress: 0, color: 'orange' },
        { title: '8th', progress: 0, color: 'orange' },
        { title: '9th', progress: 0, color: 'orange' },
        { title: '10th', progress: 0, color: 'orange' },
        { title: '11th', progress: 0, color: 'orange' },
        { title: '12th', progress: 0, color: 'orange' },
        { title: '13th', progress: 0, color: 'orange' },
        { title: '14th', progress: 0, color: 'orange' },
        { title: '15th', progress: 0, color: 'orange' }
      ]
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push('Description is required');
      return errors;
    },
    investmentunitErrors() {
      const errors = [];
      if (!this.$v.investmentperunit.$dirty) return errors;
      !this.$v.investmentperunit.required &&
        errors.push('Investment Unit is required');
      return errors;
    },
    earningunitErrors() {
      const errors = [];
      if (!this.$v.earningperunit.$dirty) return errors;
      !this.$v.earningperunit.required &&
        errors.push('Earning Unit is required');
      return errors;
    },
    productimageErrors() {
      const errors = [];
      if (!this.$v.productimage.$dirty) return errors;
      !this.$v.productimage.required && errors.push('Images are required');
      return errors;
    },
    products() {
      return this.$store.getters.loadedProducts;
    },
    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.description = '';
      this.investmentperunit = '';
      this.earningperunit = '';
      this.productimage = '';
    },
    onCreateProduct() {
      const productData = {
        name: this.name,
        description: this.description,
        investmentperunit: this.investmentperunit,
        earningperunit: this.earningperunit,
        productimage: this.productimage,
        productprogressbar: this.productprogressbar
      };
      this.$store.dispatch('createProduct', productData);
      console.log(productData);
      this.$router.push('/products');
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadImage(e) {
      var self = this;
      let file = e.target.files[0];
      console.log(file);

      // self.productimage.push(file);
      // console.log(self.productimage);
      var storageRef = fb.storage().ref('products/' + this.user.id + file.name);

      storageRef.put(file).then(function() {
        storageRef.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);

          self.productimage.push(downloadURL);
        });
      });
      // console.log(self.productimage);
      // console.log(address);
      // console.log(this.productimage);
      // var reader = new FileReader();
      // reader.onloadend = function(evt) {
      //   var blob = new Blob([evt.target.result], { type: 'image/*' });

      //   var storageRef = fb.storage().ref('products' + files.name);
      //   console.warn(files); // Watch Screenshot
      //   storageRef.put(blob);
      // };

      // reader.onerror = function(e) {
      //   console.log('Failed file read: ' + e.toString());
      // };
      // reader.readAsArrayBuffer(files);

      // var storageRef = fb.storage().ref('products/' + files[0].name);

      // storageRef.put(files);
      // + this.products[0].creatorId
      // console.log(this.products);
      // console.log(this.products[0].creatorId);
      // for (let i = 0; i++; i < files.length) {
      // let filename = e[0].name;

      // console.log(filename.lastIndex0f('.'));
      // if (filename.lastIndex0f('.') <= 0) {
      //   return alert('Please add a valid file!');
      // }
      // const fileReader = new FileReader();
      // fileReader.addEventListener('load', () => {
      //   this.imageUrl = fileReader.result;
      // });
      // fileReader.readAsDataURL(file);
      // this.productimage = file;

      // console.log(files);
      // console.log(files.length);
      // console.log(files[0].name);
      // console.log(this.productimage);
    }
  }
};
</script>
