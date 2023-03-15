import { useState, useContext } from "react";
import FormInput from "../form-input/Form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  getUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  console.log("rendered SignUpForm..");
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setCurrentUser } = useContext(UserContext);

  console.log("formFields: ", formFields);

  // destructure form inputs
  const { email, password } = formFields;

  const changeHandler = (event) => {
    //console.log("event: ", event);
    //console.log("target.value: ", event.target.value);
    //console.log("target.name: ", event.target.name);
    const { name, value } = event.target;
    console.log(`name: ${name}, value: ${value}`);
    setFormFields({ ...formFields, [name]: value });

    /* console.log("{...formFields, [name]: value}: ", {
      ...formFields,
      [name]: value,
    }); */
  };

  //reset form fields to theit default values (which is empty)
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted: ", event);
    console.log("signinForm- email: ", email);
    console.log("signinForm- password: ", password);

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      console.log("signinForm - user: ", user);
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("wrong password!");
          break;
        case "auth/user-not-found":
          alert("user account not found");
          break;
        default:
          console.error("error: ", error);
          break;
      }
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log({ user });
    setCurrentUser(user);
    await getUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={changeHandler}
          value={email}
          required
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={changeHandler}
          value={password}
          required
        ></FormInput>

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
