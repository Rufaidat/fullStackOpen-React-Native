import { Text, Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSigIn";
import { useNavigate } from "react-router-native";

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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    color: "white",
  },
});

const SigInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secret={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SigInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
