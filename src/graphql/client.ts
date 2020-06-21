import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
// @ts-ignore
import { GRAPHQL_ENDPOINT, WEBSOCKET_ENDPOINT } from "react-native-dotenv";
import fetch from "isomorphic-fetch";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("userToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const GRAPHQL_URL = GRAPHQL_ENDPOINT;

const httplink = createHttpLink({
  uri: GRAPHQL_URL,
  fetch,
});

const wsLink = new WebSocketLink({
  uri: WEBSOCKET_ENDPOINT,
  options: {
    reconnect: true,
    connectionParams: {
      token: AsyncStorage.getItem("userToken"),
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httplink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
