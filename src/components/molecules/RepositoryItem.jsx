import { Image, View, StyleSheet, Pressable } from "react-native";
import Text from "../atoms/Text";
import theme from "../../theme";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  img: {
    borderRadius: 5,
    height: 80,
    width: 80,
  },
  flex: {
    flexDirection: "row",
  },
  textCenter: { display: "flex", alignItems: "center" },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    color: "white",
  },
});

const roundNumbers = (num) => {
  let num2str = num.toString();
  return num2str.length >= 4 ? `${num2str[0]}.${num2str[1]}K` : num;
};

const RepositoryItem = ({ repository, toGithub }) => {
  const navigate = useNavigate();

  let {
    id,
    url,
    fullName,
    description,
    language,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    stargazersCount,
  } = repository;

  return (
    <Pressable
      onPress={() => !toGithub && navigate(`/repository/${id}`)}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.container} testID="repositoryItem">
        <View style={styles.flex}>
          <Image
            source={{ uri: ownerAvatarUrl }}
            style={styles.img}
            testID="repositoryImg"
          />
          <View style={{ paddingLeft: 10 }}></View>
          <View style={{ alignItems: "flex-start" }}>
            <Text
              testID="repositoryName"
              fontWeight="bold"
              fontSize="subheading"
              style={{ flexShrink: 1, paddingRight: 80 }}
            >
              {fullName}
            </Text>
            <Text
              testID="repositoryDesc"
              color="textSecondary"
              style={{ marginRight: 80 }}
            >
              {description}
            </Text>
            <Text
              testID="repositoryLanguage"
              style={{
                backgroundColor: theme.colors.primary,
                color: "white",
                padding: 5,
                borderRadius: 5,
                marginTop: 5,
              }}
            >
              {language}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 20,
          }}
        >
          <View style={styles.textCenter}>
            <Text fontWeight="bold" testID="repositoryStars">
              {roundNumbers(stargazersCount)}
            </Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.textCenter}>
            <Text fontWeight="bold" testID="repositoryForks">
              {roundNumbers(forksCount)}
            </Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.textCenter} testID="repositoryReviews">
            <Text fontWeight="bold">{roundNumbers(reviewCount)}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.textCenter} testID="repositoryRatings">
            <Text fontWeight="bold">{roundNumbers(ratingAverage)}</Text>
            <Text color="textSecondary">Ratings</Text>
          </View>
        </View>
      </View>
      {toGithub === true && (
        <Pressable onPress={() => Linking.openURL(url)} style={styles.button}>
          <Text style={styles.buttonText}>Open in Github</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default RepositoryItem;
