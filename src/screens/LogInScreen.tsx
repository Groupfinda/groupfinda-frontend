import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export interface Props {}

const LogInScreen: React.FC<Props> = (props) => {
  return (
    <Layout style={styles.containerStyle}>
      <Text style={styles.headerStyle} status="primary-100" category="h1">
        Log in
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
  },
  headerStyle: {
    marginTop: 40,
  },
});

export default LogInScreen;
