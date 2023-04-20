import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { exp } from 'react-native/Libraries/Animated/Easing';

const firebaseConfig = {
  apiKey: "AIzaSyCGoJEoHXHDDaFVWF3GUdZeNwC4YFLh0uo",
  authDomain: "geo-tagged-ccff5.firebaseapp.com",
  databaseURL: "https://geo-tagged-ccff5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "geo-tagged-ccff5",
  storageBucket: "geo-tagged-ccff5.appspot.com",
  messagingSenderId: "940426891183",
  appId: "1:940426891183:web:2400736ae61ce70aa6a95a",
  measurementId: "G-EPVYZJSDJ4"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};