import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "../atoms/AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";
import AuthStorage from "../../utils/authStorage";
import Text from "../atoms/Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();
  const navigate = useNavigate();
  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {data?.me && <AppBarTab text="Create a review" path="/create-review" />}
        {data?.me && <AppBarTab text="My reviews" path="/my-reviews" />}
        {data?.me === null ? (
          <AppBarTab text="SignIn" path="/signin" />
        ) : (
          <Pressable onPress={handleSignOut}>
            <Text
              style={{
                color: "white",
                fontWeight: theme.fontWeights.bold,
                paddingHorizontal: 8,
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        )}
        {data?.me === null && <AppBarTab text="Sign Up" path="/signup" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
