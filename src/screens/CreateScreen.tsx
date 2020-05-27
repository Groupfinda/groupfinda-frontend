import React from "react";
import { Layout, Divider, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Header, CardDisplay } from "../components/Create";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const CreateScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <Header />
      <Divider />
      <Icon name="people" />
      <Layout style={styles.viewStyle} level="4">
        <CardDisplay
          onPress={() => navigation.navigate("JoinEvent")}
          title="Join Event"
          icon="people"
        />
        <CardDisplay
          onPress={() => navigation.navigate("CreateEvent")}
          title="Create Event"
          icon="plus-square"
        />
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
