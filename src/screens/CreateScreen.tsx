import React from "react";
import { Layout, Divider } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Header, CardDisplay } from "../components/Create";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const CreateScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Divider />

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
    </SafeAreaView>
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
