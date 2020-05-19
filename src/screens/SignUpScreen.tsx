import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export interface Props {}

const SignUpScreen: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Text category="h1">This should be SignUpScreen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
