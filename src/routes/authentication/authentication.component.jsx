import SignUpForm from "../../components/sign-up-form/Signup.component";
import SignInForm from "../../components/sign-in-form/Signin.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default Authentication;
