import React from "react";
import { Avatar, TopNavigation } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {};

export const Header: React.FC<Props> = () => {
  const renderLogo = () => (
    <Avatar source={require("../../../assets/logov2.png")} />
  );
  return (
    <TopNavigation
      style={styles.container}
      title={renderLogo}
      alignment="center"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
