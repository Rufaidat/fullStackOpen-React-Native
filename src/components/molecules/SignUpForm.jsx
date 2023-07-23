import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, View } from "react-native";
import Button from "../atoms/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

const SignUpForm = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Password confirmation"
          />

          <Button onPress={handleSubmit} text="Sign up" />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
