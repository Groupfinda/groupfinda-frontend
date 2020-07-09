import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { ForgetPasswordForm } from "../components/Auth";
import { ScrollView } from "react-native";
import { TransparentBackHeader } from "../components/common";
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {};

const ForgetPasswordScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.wrapperStyle}>
      <Layout style={styles.wrapperStyle}>
        <TransparentBackHeader />
        <ScrollView>
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
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
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
