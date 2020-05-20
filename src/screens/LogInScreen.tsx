import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { LogInForm } from "../components/Auth";
import { TouchableOpacity, ScrollView } from "react-native";
import { LogInScreenNavigationProp } from "../navigation/types";

type Props = LogInScreenNavigationProp;

const LogInScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.wrapperStyle}>
      <ScrollView>
        <Layout style={styles.containerStyle}>
          <Layout style={styles.headerStyle}>
            <Text style={styles.textStyle} category="h1">
              Groupfinda
            </Text>
            <Text style={styles.textStyle} category="s1" appearance="hint">
              Log In
            </Text>
          </Layout>
          <LogInForm />

          <TouchableOpacity
            style={styles.helpStyle}
            onPress={() => navigation.replace("SignUp")}
          >
            <Text status="info">Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    alignItems: "center",
    paddingTop: 55,
    paddingHorizontal: 40,
  },
  headerStyle: {
    marginTop: 40,
    marginBottom: 60,
  },
  helpStyle: {
    marginTop: 60,
  },
  textStyle: {
    alignSelf: "center",
  },
});

export default LogInScreen;
