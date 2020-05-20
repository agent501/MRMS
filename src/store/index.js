import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    authError: null,
    loadedProducts: [],
  },
  mutations: {
    createProduct(state, payload) {
      state.loadedProducts.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    // change the status of loading in state
    setLoading(state, payload) {
      state.loading = payload;
    },
    // change the of status error in state
    setError(state, payload) {
      state.authError = payload;
    },
    // change the status of error back to null
    clearError(state) {
      state.authError = null;
    },
    setLoadedProducts(state, payload) {
      state.loadedProducts = payload;
    },
    updateProduct(state, payload) {
      const product = state.loadedProducts.find((product) => {
        return product.id === payload.id;
      });
      if (payload.name) {
        product.name = payload.name;
      }
      if (payload.description) {
        product.description = payload.description;
      }
      if (payload.earningperunit) {
        product.earningperunit = payload.earningperunit;
      }
      if (payload.investmentperunit) {
        product.investmentperunit = payload.investmentperunit;
      }
    },
    updateProgress(state, payload) {
      const product = state.loadedProducts.find((product) => {
        return product.id === payload.id;
      });
      if (payload.productprogressbar) {
        product.productprogressbar = payload.productprogressbar;
      }
    },
  },
  actions: {
    loadProducts({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('products')
        .once('value')
        .then((data) => {
          const products = [];
          const obj = data.val();
          for (let key in obj) {
            products.push({
              id: key,
              name: obj[key].name,
              description: obj[key].description,
              investmentperunit: obj[key].investmentperunit,
              earningperunit: obj[key].earningperunit,
              creatorId: obj[key].creatorId,
              productimage: obj[key].productimage,
              productprogressbar: obj[key].productprogressbar,
              featureimage: obj[key].productimage[0],
            });
          }
          commit('setLoadedProducts', products);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', true);
        });
    },
    createProduct({ commit, getters }, payload) {
      const product = {
        name: payload.name,
        description: payload.description,
        investmentperunit: payload.investmentperunit,
        earningperunit: payload.earningperunit,
        productimage: payload.productimage,
        productprogressbar: payload.productprogressbar,
        creatorId: getters.user.id,
      };
      let key;
      // let imageurl
      firebase
        .database()
        .ref('products')
        .push(product)
        .then((data) => {
          //specific product id
          key = data.key;
          commit('createProduct', { ...product, id: key });
          // return key
        });
      // .then(key => {
      //   for(let i = 0; i++;i< payload.productimage.length){
      //     const filename = payload.productimage[i].name;
      //     const ext = filename.slice(filename.lastIndexOf('.'))
      //      firebase.storage
      //      .ref('products/' + key + '.' + ext)
      //     .put(payload.productimage[i]);
      //   }

      // }).then(fileData =>{
      //   imageurl
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      // let key;
      // let imageurl;
      // firebase
      //   .database()
      //   .ref('products')
      //   .push(product)
      //   .then((data) => {
      //     key = data.key;
      //     console.log(data);
      //     //   reach out to firebase and store it

      //     return key;
      //   })
      //   .then((key) => {
      //     let filename;
      //     let ext;
      //     // for (let i = 0; i++; i < payload.productimage.length) {
      //     filename = payload.productimage.name;
      //     ext = filename.slice(filename.lastIndexOf('.'));
      //     firebase.storage
      //       .ref('products/' + key + '.' + ext)
      //       .put(payload.productimage);
      //     // }
      //   })
      //   .then((fileData) => {
      //     imageurl = fileData.metadata.downloadURLs[0];
      //     return firebase
      //       .database()
      //       .ref('products')
      //       .child(key)
      //       .update({ imageurl: imageurl });
      //   })
      //   .then(() => {

      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    updateproductdata({ commit }, payload) {
      commit('loading', true);
      const updateObj = {};
      if (payload.name) {
        updateObj.name = payload.name;
      }
      if (payload.desscription) {
        updateObj.name = payload.desscription;
      }
      if (payload.earningperunit) {
        updateObj.earningperunit = payload.earningperunit;
      }
      if (payload.investmentperunit) {
        updateObj.investmentperunit = payload.investmentperunit;
      }
      firebase
        .database()
        .ref('products')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateProduct', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    updateprogressdata({ commit }, payload) {
      commit('loading', true);
      const updateObj = {};
      if (payload.productprogressbar) {
        updateObj.productprogressbar = payload.productprogressbar;
      }

      firebase
        .database()
        .ref('products')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateProgress', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    signUp({ commit }, payload) {
      // perform the mutation set loading because no matter user success sign up or not it will always display loading
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        // passing the email and password fetch from the signup page and send to the firebase
        .createUserWithEmailAndPassword(payload.email, payload.password)
        //if success, get the unique id from the firebase and set it on the format that is same as state
        .then((response) => {
          // set loading in the state back to false because is already succeed
          commit('setLoading', false);

          const newUser = {
            id: response.user.uid,
            registeredProducts: [],
            fbKeys: {},
          };
          commit('setUser', newUser);
        })
        // if got error
        .catch((error) => {
          // set loading in the state back to false because there's a error occur
          commit('setLoading', false);
          // perform the mutation of setError to display the error
          commit('setError', error);
          console.log(error);
        });
    },
    logIn({ commit }, payload) {
      // perform the mutation set loading because no matter user success sign in or not it will always display loading
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        // sending the user email and password to the firebase for matchmaking in order to login
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          // set loading in the state back to false because is already succeed
          commit('setLoading', false);

          const newUser = {
            id: response.user.uid,
            registeredProducts: [],
            fbKeys: {},
          };
          commit('setUser', newUser);
        }) // if got error
        .catch((error) => {
          // set loading in the state back to false because there's a error occur
          commit('setLoading', false);
          // perform the mutation of setError to display the error
          commit('setError', error);
          console.log(error);
        });
    },
    autosignin({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredProducts: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loadedProducts(state) {
      return state.loadedProducts.sort((productA, productB) => {
        return productA.date > productB.date;
      });
    },
    featuredProducts(state, getters) {
      return getters.loadedProducts.slice(0, 5);
    },
    loadedProduct(state) {
      return (productId) => {
        return state.loadedProducts.find((product) => {
          return product.id === productId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
  modules: {},
});
