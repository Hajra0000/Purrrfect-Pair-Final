import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'; // Import storage related functions
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3g-XnhpDc_EVsVG-POI0y7UJnpzhSG0k",
  authDomain: "purrrfect-pair.firebaseapp.com",
  projectId: "purrrfect-pair",
  storageBucket: "purrrfect-pair.appspot.com",
  messagingSenderId: "427753116346",
  appId: "1:427753116346:web:41a75049c9b8b476282883",
  measurementId: "G-3X6P0MDZ8S"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

const storage = getStorage(app); // Initialize Firebase Storage


const uploadImage = async (data, isImage) => {
  try {
    console.log("Data to upload:", data); // Log the data before uploading
    if (isImage) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      await uploadString(storageRef, blob, 'data_url');
    } else {
      const storageRef = ref(storage, `documents/${Date.now()}.pdf`); // Adjust the path for documents
      await uploadString(storageRef, uri, 'data_url');
    }

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export { app, db, auth, uploadImage};