import React from "react";

import { StyleSheet } from "react-native";
import { CardStack } from "../components/Swipe";
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {};

const SwipeScreen: React.FC<Props> = (props) => {
  return <SafeAreaView style={styles.container}>
    <CardStack />
  </SafeAreaView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default SwipeScreen;
