import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { TransparentBackHeader } from "../components/common";

type Props = {};

const JoinEventScreen: React.FC<Props> = (props) => {
  return (
    <Layout>
      <TransparentBackHeader />
      <Text category="h1">This should be JoinEventScreen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default JoinEventScreen;
