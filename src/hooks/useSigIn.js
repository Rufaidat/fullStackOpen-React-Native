import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";

import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    await authStorage.setAccessToken(data);
    apolloClient.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
