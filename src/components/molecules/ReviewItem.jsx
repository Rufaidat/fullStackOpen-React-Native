import { StyleSheet, View } from "react-native";
import Text from "../atoms/Text";
import format from "date-fns/format";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 10,
  },
  rating: {
    borderRadius: 50,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderStyle: "solid",
    height: 70,
    width: 70,
  },
  textCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ReviewItem = ({ review }) => {
  let { rating, createdAt, text } = review.node;
  return (
    <View style={styles.container}>
      <View style={{ ...styles.rating, ...styles.textCenter }}>
        <Text style={{ color: theme.colors.primary }}>{rating}</Text>
      </View>
      <View style={{ padding: 10 }}></View>
      <View>
        <Text fontWeight="bold" fontSize="subheading">
          {review.node.user
            ? review.node.user.username
            : review.node.repository.fullName}
        </Text>
        <Text color="textSecondary">
          {format(new Date(createdAt), "d.MM.yy")}
        </Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
