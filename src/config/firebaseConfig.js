import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyCJTZ7pWB3ml6Tjvk-TT6TWAYOBGcofCa4",
  authDomain: "my-finance-app-2.firebaseapp.com",
  databaseURL: "https://my-finance-app-2.firebaseio.com",
  projectId: "my-finance-app-2",
  storageBucket: "my-finance-app-2.appspot.com",
  messagingSenderId: "776133911394",
  appId: "1:776133911394:web:84247f22b63cee9376823b",
  measurementId: "G-8BK6ZJ029E"
};

export const initFirebase = () => {
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics()
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };

  const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth,
  });
  
  return { createComponentWithAuth: createComponentWithAuth, firebaseAppAuth: firebaseAppAuth }

}

