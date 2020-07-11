import React from "react";
import {
  Avatar,
  TopNavigation,
  TopNavigationAction,
  IconProps,
  Icon,
  Text,
} from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  image: string;
  onImagePress: () => void;
};

const BackIcon = (props: IconProps) => (
  <Icon {...props} height={30} width={30} name="arrow-ios-back" />
);

const ChatHeader: React.FC<Props> = (props) => {
  const { title, image, onImagePress } = props;
  const navigation = useNavigation();
  const renderImage = () => (
    <TouchableOpacity onPress={onImagePress}>
      <Avatar source={{ uri: image }} size="medium" />
    </TouchableOpacity>
  )

  const renderBack = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <TopNavigation
      style={styles.container}
      title={() => (
        <Text category={title.length > 21 ? "h6" : "h5"} status="primary">
          {title.slice(0, 21)}{title.length > 21 ? "..." : ""}
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
