import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("userToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const GRAPHQL_URL = `http://192.168.1.207:3002/graphql`;

const link = new HttpLink({
  uri: GRAPHQL_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default client;
