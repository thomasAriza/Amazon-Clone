import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBcDP89ldP8SGZwS-lM1ND3LkSuOZPgmBs",
    authDomain: "fir-99215.firebaseapp.com",
    projectId: "fir-99215",
    storageBucket: "fir-99215.appspot.com",
    messagingSenderId: "628738492301",
    appId: "1:628738492301:web:cfa96fa9b6888f7b911fc4",
    measurementId: "G-R9GL6BVDRN"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export { db, auth, storage };