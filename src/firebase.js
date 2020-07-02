import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyC25JC9eky5z9dK63b9lnVQyzBymylprZA',
  authDomain: 'racingpigeonschat.firebaseapp.com',
  databaseURL: 'https://racingpigeonschat.firebaseio.com',
  projectId: 'racingpigeonschat',
  storageBucket: 'racingpigeonschat.appspot.com',
  messagingSenderId: '301136693964',
  appId: '1:301136693964:web:cfda559c330e6c72ad5069',
  measurementId: 'G-9HRYM6HDJF',
};
firebase.initializeApp(firebaseConfig);

export default firebase;
