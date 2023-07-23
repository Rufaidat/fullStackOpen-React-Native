import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Button from "../atoms/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

const ReviewForm = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            placeholder="Repository owner name"
            name="ownerName"
          />
          <FormikTextInput
            placeholder="Repository name"
            name="repositoryName"
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput name="text" placeholder="Review" multiline={true} />

          <Button onPress={handleSubmit} text="Create a review" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
