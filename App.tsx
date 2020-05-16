import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./src/graphql/client";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.container}>
          <Text category="h1">This should be displayed</Text>
        </Layout>
      </ApplicationProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
