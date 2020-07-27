import * as firebase from 'firebase';

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUp({ commit }, payload) {
      // perform the mutation set loading because no matter user success sign up or not it will always display loading
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        // passing the email and password fetch from the signup page and send to the firebasenpm
        .createUserWithEmailAndPassword(payload.email, payload.password)
        //if success, get the unique id from the firebase and set it on the format that is same as state
        .then((response) => {
          // set loading in the state back to false because is already succeed
          commit('setLoading', false);

          const newUser = {
            id: response.user.uid,
            registeredProducts: [],
            fbKeys: {},
            email: payload.email,
            phonenumber: payload.phonenumber,
            icnumber: payload.icnumber,
            name: payload.name,
            ssmimg: payload.image,
          };

          firebase
            .database()
            .ref('profiles')
            .push(newUser)
            .then(() => {
              //specific product id
              key = data.key;
              commit('createProfile', { ...newUser, id: key });
              // return key
            });

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
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
