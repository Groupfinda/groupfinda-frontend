import React from "react";
import { Layout, Text, Divider, Icon } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Header, CardDisplay } from "../components/Create";

type Props = {};

const CreateScreen: React.FC<Props> = (props) => {
  return (
    <Layout style={styles.container}>
      <Header />
      <Divider />
      <Icon name="people" />
      <Layout style={styles.viewStyle} level="4">
        <CardDisplay title="Join an event" icon="people" />
        <CardDisplay title="Create an event" icon="plus-square" />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  viewStyle: {
    flex: 1,
    padding: 5,
  },
});

export default CreateScreen;
