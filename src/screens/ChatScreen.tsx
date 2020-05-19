import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {};

const ChatScreen: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Text category="h1">This should be ChatScreen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default ChatScreen;
