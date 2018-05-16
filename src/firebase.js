import {initializeApp} from 'firebase';


const app = initializeApp({
  apiKey: "AIzaSyB4WwScU_lBz82nPq7SdebPt5PMoRwGhfI",
  authDomain: "lifecounter-9aad3.firebaseapp.com",
  databaseURL: "https://lifecounter-9aad3.firebaseio.com",
  projectId: "lifecounter-9aad3",
  storageBucket: "lifecounter-9aad3.appspot.com",
  messagingSenderId: "421209747658"
})

export const db = app.database();
