import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./src/graphql/client";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Navigator from "./src/navigation/navigator";
import { myTheme } from "./custom-theme";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
        <Navigator />
      </ApplicationProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
