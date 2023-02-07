import {
  signInWithGooglePopup,
  getUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useState } from "react";

import SignUpForm from "../../components/sign-up-form/Signup.component";



const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log({ user });
    const userDocRef = await getUserDocumentFromAuth(user);
  };

  
  return (
    <>
      <h1>Sign-in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm></SignUpForm>
    </>
  );
};

export default SignIn;
