import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { TransparentBackHeader } from "../components/common";
import FormsHandler from "../components/Create/Forms/FormsHandler";

type Props = {};

const CreateEventScreen: React.FC<Props> = (props) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.container}>
          <TransparentBackHeader />

          <Layout style={styles.body}>
            <Text style={styles.header} status="primary" category="h3">
              Create a new event
            </Text>

            <FormsHandler />
          </Layout>
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

    marginTop: 55,

    justifyContent: "flex-start",
  },
  header: {
    alignSelf: "center",
    minHeight: 50,
    marginTop: 25,
  },
});

export default CreateEventScreen;
