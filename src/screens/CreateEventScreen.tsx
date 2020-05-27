import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
import { TransparentBackHeader } from "../components/common";
import FormsHandler from "../components/Create/Forms/FormsHandler";

type Props = {};

const CreateEventScreen: React.FC<Props> = (props) => {
  return (
    <Layout style={styles.container}>
      <TransparentBackHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Layout style={styles.body}>
          <Text style={styles.header} status="primary" category="h3">
            Create a new event
          </Text>

          <FormsHandler />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    borderColor: "red",
    marginTop: 55,
    borderWidth: 5,
    justifyContent: "flex-start",
  },
  header: {
    alignSelf: "center",
    minHeight: 50,
  },
});

export default CreateEventScreen;
