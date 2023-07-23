import * as yup from "yup";
import SignUpForm from "../molecules/SignUpForm";
import { useNavigate } from "react-router-native";
import useSignUp from "../../hooks/useSignUp";
import useSignIn from "../../hooks/useSigIn";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username length must be between 5 and 30")
    .max(30, "username length must be between 5 and 30"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "password length must be between 5 and 30")
    .max(30, "password length must be between 5 and 30"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // eslint-disable-next-line no-unused-vars
      const signup = await signUp({ username, password });
      const { data } = await signIn({
        username,
        password,
      });
      data && navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignUp;
