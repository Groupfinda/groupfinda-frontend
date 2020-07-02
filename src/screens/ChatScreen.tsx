import React, { useState, useEffect } from "react";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Header } from "../components/Create";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  GET_MY_GROUPS,
  GetMyGroupsVariables,
  GetMyGroupsData,
} from "../graphql/queries";
import { GroupItem } from "../components/Chat";
type Props = {};

const ChatScreen: React.FC<Props> = (props) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [groups, setGroups] = useState<GetMyGroupsData["me"]["groups"]>([]);
  const [getGroups, { loading }] = useLazyQuery<
    GetMyGroupsData,
    GetMyGroupsVariables
  >(GET_MY_GROUPS, {
    onCompleted: (data) => {
      setGroups(data.me.groups);
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getGroups();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    getGroups();
    setRefreshing(false);
  };
  return (
    <Layout level="2" style={styles.container}>
      <Header />
      <Divider />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
