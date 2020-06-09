import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Card, EventType, CardStack, events } from "../components/Swipe";

type Props = {};

const SwipeScreen: React.FC<Props> = (props) => {
  return <CardStack {...{ events }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeScreen;
