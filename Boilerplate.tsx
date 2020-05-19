import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {};

const BoilerPlate: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Text category="h1">This should be BoilerPlate</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default BoilerPlate;
