import React from "react";
import client from "./src/graphql/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { myTheme } from "./custom-theme";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Navigator from "./src/navigation/navigator";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

export const withApp = (Component: React.ElementType) => {
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
        <SafeAreaProvider>
          <StatusBar barStyle='dark-content' />
          <Component />
        </SafeAreaProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default () => withApp(Navigator);
