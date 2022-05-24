import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDEwcHrlGzuucKXmH8siPwSJW7jgUR3Ozs",
  authDomain: "react-upload-f84bf.firebaseapp.com",
  projectId: "react-upload-f84bf",
  storageBucket: "react-upload-f84bf.appspot.com",
  messagingSenderId: "739363207009",
  appId: "1:739363207009:web:a24d0abd08f186659e7720"
};

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

export { storage }