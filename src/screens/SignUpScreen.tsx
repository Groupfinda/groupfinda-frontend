import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { SignUpForm } from "../components/Auth";
import { TouchableOpacity, ScrollView } from "react-native";
import { SignUpScreenNavigationProp } from "../navigation/types";

type Props = SignUpScreenNavigationProp;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView>
      <Layout style={styles.containerStyle}>
        <Layout style={styles.headerStyle}>
          <Text style={styles.textStyle} category="h1">
            Sign Up
          </Text>
          <Text category="s1" appearance="hint">
            and start making new friends
          </Text>
        </Layout>

        <SignUpForm />

        <TouchableOpacity
          style={styles.helpStyle}
          onPress={() => navigation.replace("LogIn")}
        >
          <Text status="info">Already have an account? Log in</Text>
        </TouchableOpacity>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  headerStyle: {
    marginTop: 40,
    marginBottom: 40,
  },
  textStyle: {
    alignSelf: "center",
  },
  helpStyle: {
    marginTop: 60,
    marginBottom: 20,
  },
});

export default SignUpScreen;
