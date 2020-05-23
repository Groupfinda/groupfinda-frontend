import React from "react";
import { Spinner, Modal as Test } from "@ui-kitten/components";
import { StyleSheet, View, Modal } from "react-native";

type Props = {
  visible: boolean;
  status?:
    | "basic"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "control";
  size?: "tiny" | "small" | "medium" | "large" | "giant";
};

const Loading: React.FC<Props> = (props) => {
  const { visible, status, size } = props;

  /*
  return (
    <View style={styles.container}>
      <Test backdropStyle={styles.backdrop} visible={true}>
        <Spinner status={status || "primary"} size={size || "medium"} />
      </Test>
    </View>
  );
  */
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.backdrop}>
        <Spinner status={status || "primary"} size={size || "medium"} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
