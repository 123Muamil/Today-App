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
// Configure Google Sign-In
//web 384466588084-gh674aieta447ap50rat7ec6lg46hpop.apps.googleusercontent.com
//ios 384466588084-q9f2aq8qifaqo11071u71t9k4mobeifn.apps.googleusercontent.com
//android 384466588084-eu511o3kqmh5cd2ldo0ajmeb0p1gfhh2.apps.googleusercontent.com

export default app
