import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyBH-PKF_74PxWhrnuPQ0fEfaTeFU-CLi3A",
//     authDomain: "today-87402.firebaseapp.com",
//     projectId: "today-87402",
//     storageBucket: "today-87402.appspot.com",
//     messagingSenderId: "387288605049",
//     appId: "1:387288605049:web:ec88825986136e9359cfa8"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDRszBepCtwCccWYAwqHWY0nOuzIK-ZOUU",
  authDomain: "fir-a2c44.firebaseapp.com",
  projectId: "fir-a2c44",
  storageBucket: "fir-a2c44.appspot.com",
  messagingSenderId: "96467534666",
  appId: "1:96467534666:web:29a62729f6dfe3cec837b3",
  measurementId: "G-KDR94TWV33"
};
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app
