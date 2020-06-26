import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
// @ts-ignore
import { GRAPHQL_ENDPOINT, WEBSOCKET_ENDPOINT, ENV } from "react-native-dotenv";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("userToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

let GRAPHQL_URL: string;
let WEBSOCKET_URL: string;

if (ENV === "development") {
  GRAPHQL_URL = GRAPHQL_ENDPOINT;
  WEBSOCKET_URL = WEBSOCKET_ENDPOINT;
} else {
  GRAPHQL_URL = "http://13.229.108.197:3002/graphql";
  WEBSOCKET_URL = "ws://13.229.108.197:3002/graphql";
}

const httplink = createHttpLink({
  uri: GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: WEBSOCKET_URL,
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
