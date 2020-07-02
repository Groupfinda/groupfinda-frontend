import React from "react";

import { StyleSheet } from "react-native";
import { CardStack } from "../components/Swipe";

type Props = {};

const SwipeScreen: React.FC<Props> = (props) => {
  return <CardStack />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeScreen;
