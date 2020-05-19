import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { ForgetPasswordForm } from "../components/Auth";
import { TouchableOpacity } from "react-native";
import { ForgetPasswordScreenNavigationProp } from "../navigation/types";

type Props = ForgetPasswordScreenNavigationProp;

const ForgetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.containerStyle}>
      <Layout style={styles.headerStyle}>
        <Text style={styles.textStyle} category="h3">
          Forgot your password?
        </Text>
        <Text category="s1" appearance="hint">
          Tell us your username and email and we will reset it for you.
        </Text>
      </Layout>
      <ForgetPasswordForm />
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  headerStyle: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 60,
  },

  textStyle: {
    alignSelf: "center",
  },
});

export default ForgetPasswordScreen;
