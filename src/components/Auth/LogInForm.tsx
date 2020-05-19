import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import { Layout, Icon, Input, Button, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { useNavigation } from "@react-navigation/native";

export interface Props {}

const LogInForm: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useNavigation();

  const toggleHidePassword = (): void => {
    setHidePassword(!hidePassword);
  };

  const renderIcon: RenderProp<Partial<ImageProps>> = (props) => (
    <TouchableWithoutFeedback onPress={toggleHidePassword}>
      <Icon {...props} name={hidePassword ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderForgetPassword = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
        <Text category="c2" appearance="hint">
          Forgot password?
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Layout style={styles.containerStyle}>
      <Input
        style={styles.usernameStyle}
        value={username}
        label="Username"
        placeholder="Enter username"
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={setUsername}
      />
      <Input
        value={password}
        label="Password"
        placeholder="Enter password"
        accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        accessoryRight={renderIcon}
        caption={renderForgetPassword}
      />
      <Button
        accessoryRight={(props) => <Icon name="log-in-outline" {...props} />}
        style={styles.buttonStyle}
        appearance="filled"
        status="primary"
      >
        Log in
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: "stretch",
  },
  usernameStyle: {
    marginBottom: 5,
  },
  buttonStyle: {
    marginTop: 40,
  },
});

export default LogInForm;
