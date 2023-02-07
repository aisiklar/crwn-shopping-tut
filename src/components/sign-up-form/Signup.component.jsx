import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  getUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  console.log("rendered SignUpForm..");
  const [formFields, setFormFields] = useState(defaultFormFields);

  console.log("formFields: ", formFields);

  // destructure form inputs
  const { displayName, email, password, confirmPassword } = formFields;

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
    <div>
      <h1>Sign up with your email </h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          onChange={changeHandler}
          value={displayName}
          required
        ></input>

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={email}
          required
        ></input>

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={password}
          required
        ></input>

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={confirmPassword}
          required
        ></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
