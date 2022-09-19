import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_BACKEND_APIKEY,
    authDomain: process.env.REACT_APP_BACKEND_AUTHDOMAIN,
    projectId: process.env.REACT_APP_BACKEND_PROJECTID,
    storageBucket: process.env.REACT_APP_BACKEND_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_BACKEND_MESSAGINGSENDER,
    appId: process.env.REACT_APP_BACKEND_APPID,
    measurementId: process.env.REACT_APP_BACKEND_MEASUREMENTID
  };
  const app = initializeApp(firebaseConfig);  
  export  const db = getFirestore(app)
