import * as firebase from 'firebase';

export default {
  state: {
    user: null,
    profile: [],
    // loadProfiles:[]
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoadedProfile(state, payload) {
      state.profile = payload;
    },
    // setLoadProfiles(state, payload) {
    //   state.loadProfiles = payload;
    // },
    updateProfile(state, payload) {
      const profile = state.profile;

      if (payload.name) {
        profile.name = payload.name;
      }
      if (payload.email) {
        profile.email = payload.email;
      }
      if (payload.icnumber) {
        profile.icnumber = payload.icnumber;
      }
      if (payload.phonenumber) {
        profile.phonenumber = payload.phonenumber;
      }
      if (payload.ssmimage) {
        profile.ssmimage = payload.ssmimage;
      }
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
            userid: response.user.uid,
            registeredProducts: [],
            fbKeys: {},
            email: payload.email,
            phonenumber: payload.phonenumber,
            icnumber: payload.icnumber,
            name: payload.name,
            ssmimage: payload.image,
            currentbalance: 0
          };
          let key;
          firebase
            .database()
            .ref('profiles')
            .push(newUser)
            .then((data) => {
              //specific product id
              key = data.userid;
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

          firebase
            .database()
            .ref('profiles')
            .orderByChild('userid')
            .equalTo(newUser.id)
            .once('value')
            .then((data) => {
              const profile = [];
              const obj = data.val();
              for (let key in obj) {
                profile.push({
                  id: key,
                  name: obj[key].name,
                  email: obj[key].email,
                  icnumber: obj[key].icnumber,
                  phonenumber: obj[key].phonenumber,
                  userid: obj[key].userid,
                  ssmimage: obj[key].ssmimage,
                });
              }
              console.log(profile);
              commit('setLoadedProfile', profile);

              commit('setLoading', false);
            })
            .catch((error) => {
              console.log(error);
              commit('setLoading', true);
            });

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
    updatePassword(payload) {
      var user = firebase.auth().currentUser;
      var updatepassword = payload.newpassword;
      var credential = firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.currentpassword
      );

      user
        .reauthenticate(credential)
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
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfileData({ commit }, payload) {
      commit('loading', true);
      const updateObj = {};
      if (payload.name) {
        updateObj.name = payload.name;
      }
      if (payload.email) {
        updateObj.email = payload.email;
      }
      if (payload.icnumber) {
        updateObj.icnumber = payload.icnumber;
      }
      if (payload.phonenumber) {
        updateObj.phonenumber = payload.phonenumber;
      }
      if (payload.ssmimage) {
        updateObj.ssmimage = payload.ssmimage;
      }
      firebase
        .database()
        .ref('profiles')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateProfile', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    // loadProfiles({ commit }) {
    //   commit('setLoading', true);
    //   firebase
    //     .database()
    //     .ref('profiles')
    //   // .orderByChild('userid')
    //   // .equalTo(user.uid)
    //   .once('value')
    //   .then(data => {
    //     var profiles = [];
    //     let obj = data.val();
    //     for (let key in obj) {
    //       profiles.push({
    //         id: key,
    //         name: obj[key].name,
    //         email: obj[key].email,
    //         icnumber: obj[key].icnumber,
    //         phonenumber: obj[key].phonenumber,
    //         userid: obj[key].userid,
    //         ssmimage: obj[key].ssmimage
    //       });
    //     }
    //       commit('setLoadProfiles', profiles);
    //       commit('setLoading', false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       commit('setLoading', true);
    //     });
    // },
  },
  getters: {
    user(state) {
      return state.user;
    },
    // loadedProfiles(state){
    //   return state.loadProfiles;
    // }
  },
};
