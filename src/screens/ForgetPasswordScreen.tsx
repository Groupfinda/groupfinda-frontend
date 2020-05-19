import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export interface Props {}

const ForgetPasswordScreen: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Text category="h1">This should be ForgetPasswordScreen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default ForgetPasswordScreen;
