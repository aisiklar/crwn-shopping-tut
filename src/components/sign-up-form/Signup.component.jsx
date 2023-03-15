import { useState, useContext } from "react";
import FormInput from "../form-input/Form-input.component";
import "./signup-form.styles.scss";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  getUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  console.log("rendered SignUpForm..");
  const [formFields, setFormFields] = useState(defaultFormFields);

  //console.log("formFields: ", formFields);

  // destructure form inputs
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);

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
    console.log("displayName: ", displayName);
    if (password !== confirmPassword) {
      alert("passwords do not match!");
      return;
    }

    try {
      console.log("email and password: ", email, ", ", password);
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("user from createAuthUserWithEmailAndPassword: ", user);
      //setCurrentUser(user);
      const userDocRef = await getUserDocumentFromAuth(user, { displayName });
      console.log("userDocRef: ", userDocRef);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("this email is already taken!");
      }
      console.error("error: ", error);
    }

    resetFormFields();
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={changeHandler}
          value={displayName}
          required
        ></FormInput>

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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={confirmPassword}
          required
        ></FormInput>
        <Button buttonType="google" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
