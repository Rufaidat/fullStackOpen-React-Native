import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    margin: 5,
    borderColor: theme.colors.mainBackground,
    borderRadius: 5,
  },
  error: {
    borderColor: theme.colors.red,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.input, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
