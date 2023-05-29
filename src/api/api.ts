import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1VPYajPNE1OcNoQjdQAuL6-cGoFSbuBI',
  authDomain: 'leftover-fe99c.firebaseapp.com',
  databaseURL: 'https://leftover-fe99c.firebaseio.com',
  projectId: 'leftover-fe99c',
  storageBucket: 'leftover-fe99c.appspot.com',
  messagingSenderId: '1086106979278',
  appId: '1:1086106979278:web:12aae4b5615d20a0adb99f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const signup = (email: string, password: string) => {
  console.log('Signup with data', email, password);
  return createUserWithEmailAndPassword(auth, email, password);
  // .then(userCredential => {
  //   // Signed in
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch(error => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
};
