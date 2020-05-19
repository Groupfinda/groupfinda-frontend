import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { LogInForm } from "../components/Auth";
import { TouchableOpacity } from "react-native";
import { SignUpScreenNavigationProp } from "../navigation/types";

type Props = SignUpScreenNavigationProp;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <Layout style={styles.containerStyle}>
        <Text style={styles.headerStyle} category="h1">
          Sign Up
        </Text>
        <LogInForm />

        <TouchableOpacity
          style={styles.helpStyle}
          onPress={() => navigation.replace("LogIn")}
        >
          <Text status="info">Already have an account? Log in</Text>
        </TouchableOpacity>
      </Layout>
    </>
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

export default SignUpScreen;
