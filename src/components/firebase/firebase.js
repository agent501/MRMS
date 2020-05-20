import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyBJdvJyA-ac-dO3JYy-4WKY7wIkma-Y1fI',
  authDomain: 'mrms-2ae69.firebaseapp.com',
  databaseURL: 'https://mrms-2ae69.firebaseio.com',
  projectId: 'mrms-2ae69',
  storageBucket: 'mrms-2ae69.appspot.com',
  messagingSenderId: '287673096935',
  appId: '1:287673096935:web:7f7f75dea0b5657353e042',
  measurementId: 'G-EKPLN37GXX',
};

export const fb = firebase.initializeApp(firebaseConfig);
