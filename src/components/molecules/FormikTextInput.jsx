import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "../atoms/TextInput";
import Text from "../atoms/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 2,
    color: theme.colors.red,
    fontSize: 14,
  },
});

const FormikTextInput = ({ name, secret, multiline, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={secret}
        multiline={multiline}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
