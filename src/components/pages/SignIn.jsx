import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "../molecules/FormikTextInput";
import * as yup from "yup";
import useSignIn from "../../hooks/useSigIn";
import { useNavigate } from "react-router-native";
import Button from "../atoms/Button";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

export const SignInForm = ({ onSubmit, initialValues, validationSchema }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secret={true}
          />
          <Button onPress={handleSubmit} text="Sign in" />
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      data && navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInForm
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    />
  );
};

export default SignIn;
