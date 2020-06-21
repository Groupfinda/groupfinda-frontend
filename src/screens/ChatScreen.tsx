import React from "react";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { StyleSheet, ScrollView, View, Image, StatusBar } from "react-native";
import Constants from "expo-constants";
import { Header } from "../components/Create";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_MY_GROUPS,
  GetMyGroupsVariables,
  GetMyGroupsData,
} from "../graphql/queries";
import { GroupItem } from "../components/Chat";
type Props = {};

const ChatScreen: React.FC<Props> = (props) => {
  const { data, loading, error } = useQuery<
    GetMyGroupsData,
    GetMyGroupsVariables
  >(GET_MY_GROUPS);
  const groups = data?.me.groups;

  return (
    <Layout level="2" style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <Divider />
      <ScrollView>
        {loading && <Text>Loading...</Text>}
        {!loading &&
          groups?.map((group) => <GroupItem key={group.id} group={group} />)}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
