import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet, AsyncStorage } from "react-native";
import { useApolloClient } from "@apollo/react-hooks";

type Props = {};

const SwipeScreen: React.FC<Props> = (props) => {
  const client = useApolloClient();
  return (
    <Layout>
      <Text category="h1">This should be SwipeScreen</Text>
      <Button
        onPress={async () => {
          await AsyncStorage.removeItem("userToken");
          client.resetStore();
        }}
      >
        Log out
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default SwipeScreen;
