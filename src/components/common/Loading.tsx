import React from "react";
import { Modal, Spinner } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

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
  return (
    <View style={styles.container}>
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <Spinner status={status || "primary"} size={size || "medium"} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default Loading;
