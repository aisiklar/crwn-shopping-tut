import { createContext, useState, useEffect } from "react";
import {
  signOutUser,
  onAuthStateChangedListener,
  getUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  console.log("context provider rendered...");
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  //signOutUser();

  // run useEffect func once only when the comp. mounts
  useEffect(() => {
    console.log("in useEffect, context, mounted!");
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("user in context useEffect:", user);
      if (user) {
        getUserDocumentFromAuth(user);
      }
      // set current user, from the user we get from observer
      setCurrentUser(user);
    });

    // run the unsubscribe function when unmounts
    //return unsubscribe; //buraya bir console.log eklenebilir. Böylece unmount olduğu an tespit edilebilir... ???
    //bu uygun mu? emin değilim
    return () => {
      console.log("userprovider comp (context) unmounted");
      unsubscribe();
    };
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
