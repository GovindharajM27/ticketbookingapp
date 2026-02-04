import { initializeApp, getApps, getApp } from "firebase/app";
// @ts-ignore
import { Auth, initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDTLLrz5KFHQ8ZuQf8mNQhbU5sLfcuX9Go",
    authDomain: "ticketbookingapp-7b574.firebaseapp.com",
    projectId: "ticketbookingapp-7b574",
    storageBucket: "ticketbookingapp-7b574.firebasestorage.app",
    messagingSenderId: "476477023364",
    appId: "1:476477023364:web:50dab7b6cd5ded033a0ed1",
    measurementId: "G-LCWQ3BDDKZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with Persistence for React Native
let auth: Auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} catch (e) {
    auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
