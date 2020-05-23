import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, Image } from "react-native";

type Props = {};

const LoadingScreen: React.FC<Props> = () => {
  return (
    <Layout style={styles.container}>
      <Image source={require("../../assets/icon.png")} />
      <Text category="h1">Groupfinda</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
