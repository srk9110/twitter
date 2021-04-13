import firebase from "firebase/app"; 
//8.0 버전 이상에선 import * as 를 사용하지 않는다 -> 컴파일 에러
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

//firebase에 관련된 모든 것을 export하지 않고 authService만 export하기!
export const authService = firebase.auth();

//firebase database
export const dbService = firebase.firestore();

//firebase firestore
export const storageService = firebase.storage();