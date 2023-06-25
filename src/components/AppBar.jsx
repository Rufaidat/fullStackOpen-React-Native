import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import AuthStorage from "../utils/authStorage";
import Text from "./Text";

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
  console.log(data);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {data?.me !== null && <AppBarTab text="SignOut" path="/signin" />}
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
      </ScrollView>
    </View>
  );
};

export default AppBar;
