import { StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../../theme";
import { Link } from "react-router-native";
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 8,
  },
});
const AppBarTab = ({ text, path }) => {
  return (
    <Link to={path}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
