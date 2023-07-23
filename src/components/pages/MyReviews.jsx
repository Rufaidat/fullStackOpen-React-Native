import { useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "../molecules/ReviewItem";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../../hooks/useDelete";

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "white",
  },
});

function MyReviews() {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
  });
  const reviews = data ? data.me.reviews.edges : [];
  const [deleteReview] = useDeleteReview();

  const handleDelete = (id) => {
    console.log(id);
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview(id);
            refetch();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
          <View>
            <ReviewItem key={index} review={item} />
            <View style={styles.flex}>
              <Button
                text="View repository"
                onPress={() =>
                  navigate(`/repository/${item.node.repository.id}`)
                }
              />
              <Button
                text="Delete review"
                bg="red"
                onPress={() => handleDelete(item.node.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default MyReviews;
