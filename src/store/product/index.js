import * as firebase from 'firebase';

export default {
  state: {
    loadedProducts: [],
  },
  mutations: {
    createProduct(state, payload) {
      state.loadedProducts.push(payload);
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
    deleteProduct(state, payload) {
      const registeredProducts = state.loadedProducts;
      registeredProducts.splice(
        registeredProducts.findIndex((product) => product.id === payload),
        1
      );
      // Reflect.deleteProperty(state.user.fbKeys,payload)
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
    },
    deleteProduct({ commit }, payload) {
      const productId = payload;
      console.log(productId);
      firebase
        .database()
        .ref('products')
        .child(productId)
        .remove()
        .then(function() {
          // File deleted successfully

          console.log('success');
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
        });
      commit('deleteProduct', payload);
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
  },
  modules: {},
};
