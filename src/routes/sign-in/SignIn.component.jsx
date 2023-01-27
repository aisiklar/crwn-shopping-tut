import {
  signInWithGooglePopup,
  getUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await getUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>Sign-in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </>
  );
};

export default SignIn;
