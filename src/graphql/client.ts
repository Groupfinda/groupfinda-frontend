import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";

const GRAPHQL_URL = `http://192.168.99.100:3001/`;

const link = new HttpLink({
  uri: GRAPHQL_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
