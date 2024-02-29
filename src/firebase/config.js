//// burada google firebase ile etkileşime buradan girilecek.

import { initializeApp } from "firebase/app";

//giriş kontrol ve yetkilendirme
import {getAuth} from "firebase/auth"

//verilerin kayıt yeri
import {getFirestore} from "firebase/firestore"

//resimlerin kayıt yeri
import {getStorage} from "firebase/storage"


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-734a1.firebaseapp.com",
  projectId: "eshop-734a1",
  storageBucket: "eshop-734a1.appspot.com",
  messagingSenderId: "914089578955",
  appId: "1:914089578955:web:e8d35e46580a333f48a64e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app