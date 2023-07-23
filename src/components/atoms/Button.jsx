import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../theme";
const styles = StyleSheet.create({
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

function Button({ text, onPress, bg }) {
  return (
    <Pressable
      onPress={onPress}
      style={bg ? { ...styles.button, backgroundColor: bg } : styles.button}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

export default Button;
