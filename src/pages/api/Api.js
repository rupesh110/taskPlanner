
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAuC15cqX93SV6jmRjrtfevWGn4g321woY",
    authDomain: "coun-6d168.firebaseapp.com",
    databaseURL: "https://coun-6d168-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coun-6d168",
    storageBucket: "coun-6d168.appspot.com",
    messagingSenderId: "84477926922",
    appId: "1:84477926922:web:efd85514b761828f8d49f3",
    measurementId: "G-LSYEF98GDK"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollectionRef = collection(db, 'tasks');


const firebaseExports = {
    tasksCollectionRef,
    db,
    app,
  };
  
  export default firebaseExports;