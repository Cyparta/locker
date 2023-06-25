import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC4yZXQc3HMoweFfOBmXnn7nHMNaHUJKWk",
  authDomain: "papineau-locker.firebaseapp.com",
  projectId: "papineau-locker",
  storageBucket: "papineau-locker.appspot.com",
  messagingSenderId: "126585052571",
  appId: "1:126585052571:web:7736ac699d3e858eb2153e",
  measurementId: "G-TTZGBE9VXV"
};

initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const get_token = (setTokenFound,) => {
  
  return getToken(messaging, {vapidKey: 'BA9WFICP3waGgMbZnsCyElE-1o47t6X_dx3Wr4gngGRJ88L0d0ZXHLsCuceW2yymELd95at4mi_1hG1PmS0jCTs'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound({status:true,token:currentToken});
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}
export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }})}