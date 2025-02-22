import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
import { TransparentBackHeader } from "../components/common";
import FormsHandler from "../components/Create/Forms/FormsHandler";
import { CreateEventScreenNavigationProp } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_EDIT_EVENT,
  GetEditEventData,
  GetEditEventVariables,
} from "../graphql/queries";
type Props = CreateEventScreenNavigationProp;

const CreateEventScreen: React.FC<Props> = ({ navigation, route }) => {
  const id = route.params?.id;
  const { data, loading, error } = useQuery<
    GetEditEventData,
    GetEditEventVariables
  >(GET_EDIT_EVENT, { variables: { eventId: id as string } });

  if (loading) {
    return <></>;
  }
  if (error) {
    navigation.goBack();
    alert("Error loading");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.container}>
            <TransparentBackHeader />

            <Layout style={styles.body}>
              <Text style={styles.header} status="primary" category="h3">
                Create a new event
              </Text>
              <Layout>
                <FormsHandler event={data?.getEvent} />
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
    </SafeAreaView>
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
  forms: {
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default CreateEventScreen;
