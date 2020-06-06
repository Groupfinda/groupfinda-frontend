import React from "react";
import {
  Icon,
  TopNavigationAction,
  IconProps,
  TopNavigation,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

type BackActionType = {
  onPress: () => void;
};
const BackAction: React.FC<BackActionType> = ({ onPress }) => {
  return <TopNavigationAction onPress={onPress} icon={BackIcon} />;
};

export default () => {
  const navigation = useNavigation();

  return (
    <TopNavigation
      style={styles.headerStyle}
      accessoryLeft={() => <BackAction onPress={() => navigation.goBack()} />}
    />
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 20,

    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 1,
  },
});
/*
const TopNavigationStyling = () => (
  <TopNavigation
    title={(evaProps) => <Text {...evaProps}>Title</Text>}
    subtitle={(evaProps) => <Text {...evaProps}>Subtitle</Text>}
  />
);
*/
