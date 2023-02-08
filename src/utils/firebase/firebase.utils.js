import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSxVgq_XSBP4yMowvLngCRgXT6c7dYvTs",
  authDomain: "crwn-clothing-db-4a176.firebaseapp.com",
  projectId: "crwn-clothing-db-4a176",
  storageBucket: "crwn-clothing-db-4a176.appspot.com",
  messagingSenderId: "53044956673",
  appId: "1:53044956673:web:6072169c780fa9107aba00",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

console.log("auth: ", auth);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const getUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  if (userAuth) console.log("userAuth: ", userAuth);

  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef: ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot: ", userSnapshot);
  console.log("userSnapshot.exists(): ", userSnapshot.exists());

  // if the user does NOT exit:
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error in creating the user. ", error.message);
    }
  }

  // return userdoc
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
