import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { LogInForm } from "../components/Auth";
import { TouchableOpacity, Image } from "react-native";
import { LogInScreenNavigationProp } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
type Props = LogInScreenNavigationProp;

const LogInScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapperStyle}>
      <Layout style={styles.wrapperStyle}>
        <KeyboardAwareScrollView>
          <Layout style={styles.containerStyle}>
            <Layout style={styles.headerStyle}>
              <Image
                style={{ width: 300, height: 100 }}
                resizeMode="contain"
                source={require("../../assets/logowithwords.png")}
              />

              <Text style={styles.textStyle} category="h6" appearance="hint">
                Log In
              </Text>
            </Layout>
            <LogInForm />

            <TouchableOpacity
              style={styles.helpStyle}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text status="info">Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </Layout>
        </KeyboardAwareScrollView>
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
