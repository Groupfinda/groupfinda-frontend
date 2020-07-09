import React, { useState, useEffect } from "react";
import { Layout, Divider } from "@ui-kitten/components";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Header } from "../components/Create";
import { useLazyQuery } from "@apollo/react-hooks";
import {
  GET_MY_GROUPS,
  GetMyGroupsVariables,
  GetMyGroupsData,
} from "../graphql/queries";
import { GroupItem } from "../components/Chat";
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {};

const ChatScreen: React.FC<Props> = (props) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [groups, setGroups] = useState<GetMyGroupsData["me"]["groups"]>([]);
  const [getGroups, { loading }] = useLazyQuery<
    GetMyGroupsData,
    GetMyGroupsVariables
  >(GET_MY_GROUPS, {
    onCompleted: (data) => {
      if (data && data.me) setGroups(data.me.groups);
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
    <SafeAreaView style={styles.container}>

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

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
