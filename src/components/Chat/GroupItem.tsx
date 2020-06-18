import React from "react";
import { Text, Card, Avatar, Icon } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { GetMyGroupsData } from "../../graphql/queries";
import { useNavigation } from "@react-navigation/native";

type Props = {
  group: GetMyGroupsData["me"]["groups"][0];
};

const GroupItem: React.FC<Props> = (props) => {
  const { group } = props;
  const navigation = useNavigation();
  return (
    <Card
      onPress={() =>
        navigation.navigate("MessageRoom", {
          group: group,
        })
      }
      style={styles.container}
    >
      <View style={styles.layout}>
        <Avatar source={{ uri: group.event.images[0] }} size="large" />
        <Text status="primary" category="h5">
          {group.event.title}
        </Text>
        <Icon height={30} width={30} fill="black" name="arrow-ios-forward" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    margin: 5,
    justifyContent: "center",
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default GroupItem;
