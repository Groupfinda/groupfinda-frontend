import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { LogInForm } from "../components/Auth";
import { TouchableOpacity } from "react-native";
import { LogInScreenNavigationProp } from "../navigation/types";

type Props = LogInScreenNavigationProp;

const LogInScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.containerStyle}>
      <Text style={styles.headerStyle} category="h1">
        Log in
      </Text>
      <LogInForm />

      <TouchableOpacity
        style={styles.helpStyle}
        onPress={() => navigation.replace("SignUp")}
      >
        <Text status="info">Don't have an account? Sign up</Text>
      </TouchableOpacity>
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
    marginTop: 40,
    marginBottom: 60,
  },
  helpStyle: {
    marginTop: 60,
  },
});

export default LogInScreen;
