import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export interface Props {}

const SwipeScreen: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Text category="h1">This should be SwipeScreen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default SwipeScreen;
