import React from "react";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";
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
      <Header />
      <Divider />
      <ScrollView>
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
