import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDCMXlADJ2qfsomLqWMa4eLWqB3sYVFoSY",
  authDomain: "dappdevstickets.firebaseapp.com",
  databaseURL: "https://dappdevstickets.firebaseio.com",
  projectId: "dappdevstickets",
  storageBucket: "dappdevstickets.appspot.com",
  messagingSenderId: "997849227524"
};


export default firebase.initializeApp(config).database().ref();
