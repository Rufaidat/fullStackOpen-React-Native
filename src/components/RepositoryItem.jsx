import { Image, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
// import { useQuery } from "@apollo/client";
// import { GET_REPOSITORY } from "../graphql/queries";
// import { useEffect } from "react";

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
});

const roundNumbers = (num) => {
  let num2str = num.toString();
  return num2str.length >= 4 ? `${num2str[1]}.${num2str[2]}K` : num;
};

const RepositoryItem = (repository) => {
  let {
    fullName,
    desc,
    language,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    stargazersCount,
  } = repository.repository;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.img} />
          <View style={{ padding: 10 }}></View>
          <View style={{ alignItems: "flex-start" }}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={{ paddingRight: 50 }}
            >
              {fullName}
            </Text>
            <Text color="textSecondary" style={{ marginRight: 80 }}>
              {desc}
            </Text>
            <Text
              style={{
                backgroundColor: theme.colors.primary,
                color: "white",
                padding: 5,
                borderRadius: 5,
                // marginTop: -12,
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
            <Text fontWeight="bold">{roundNumbers(stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.textCenter}>
            <Text fontWeight="bold">{roundNumbers(forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.textCenter}>
            <Text fontWeight="bold">{roundNumbers(reviewCount)}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.textCenter}>
            <Text fontWeight="bold">{roundNumbers(ratingAverage)}</Text>
            <Text color="textSecondary">Ratings</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default RepositoryItem;
