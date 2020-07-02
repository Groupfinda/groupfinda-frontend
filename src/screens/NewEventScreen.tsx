import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { NewEventNavigationProp } from "../navigation/types";
import { useQuery } from "@apollo/react-hooks";
import { NEW_EVENT, NewEventData, NewEventVariables } from "../graphql/queries";
import { Loading, TransparentBackHeader } from "../components/common";

const NewEventScreen: React.FC<NewEventNavigationProp> = ({ route }) => {
  const { id } = route.params;
  const { data, loading } = useQuery<NewEventData, NewEventVariables>(
    NEW_EVENT,
    { variables: { eventId: id } }
  );
  if (loading) {
    return <Loading visible={loading} />;
  }

  return (
    <Layout style={styles.container}>
      <TransparentBackHeader />
      {!data && (
        <Layout style={styles.body}>
          <Text>An error has occured</Text>{" "}
        </Layout>
      )}
      {data && (
        <Layout style={styles.body}>
          <Text category="h1" style={styles.header}>
            Congratulations!
          </Text>
          <Text style={styles.text} category="h4">
            Your event is successfully created!
          </Text>
          <Text category="s1">
            Others can find your event directly with the code
          </Text>
          <Text category="h1" status="primary">
            {data?.getEvent.eventCode}
          </Text>
        </Layout>
      )}
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
    marginTop: 120,
    alignItems: "center",
  },
  header: {
    margin: 30,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    margin: 15,
  },
});

export default NewEventScreen;
