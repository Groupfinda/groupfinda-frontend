import React from "react";
import { Layout, Icon, IconProps, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type PillProps = {
  text?: string;
  onPress?: () => void;
};

const DeleteIcon = (props: IconProps) => (
  <Icon {...props} fill="white" name="close-outline" />
);
const Pill: React.FC<PillProps> = (props) => {
  return (
    <Layout>
      <Button
        onPress={props.onPress}
        accessoryRight={DeleteIcon}
        style={styles.pill}
      >
        {props.text}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  pill: {
    borderRadius: 40,

    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 0,

    marginRight: 10,
    marginVertical: 5,
    flexDirection: "row",
  },

  icon: {
    height: 16,
    width: 16,

    alignSelf: "center",
  },
});
export default Pill;
