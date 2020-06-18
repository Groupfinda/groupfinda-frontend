import React from "react";
import {
  Avatar,
  TopNavigation,
  TopNavigationAction,
  IconProps,
  Icon,
  Text,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  image: string;
};

const BackIcon = (props: IconProps) => (
  <Icon {...props} height={30} width={30} name="arrow-ios-back" />
);

const ChatHeader: React.FC<Props> = (props) => {
  const { title, image } = props;
  const navigation = useNavigation();
  const renderImage = () => <Avatar source={{ uri: image }} size="medium" />;

  const renderBack = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <TopNavigation
      style={styles.container}
      title={() => (
        <Text category="h5" status="primary">
          {title}
        </Text>
      )}
      accessoryLeft={renderBack}
      accessoryRight={renderImage}
      alignment="center"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ChatHeader;
