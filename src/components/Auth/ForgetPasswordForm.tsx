import React, { useState } from "react";
import { Layout, Icon, Input, Button, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {};

type ForgetPasswordVariables = {
  username: string;
  email: string;
};
const ForgetPasswordForm: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onSubmit = (): void => {
    const variables: ForgetPasswordVariables = {
      username,
      email,
    };
    console.log(variables);
  };
  return (
    <Layout style={styles.containerStyle}>
      <Input
        autoCorrect={false}
        style={styles.usernameStyle}
        value={username}
        label="Username"
        placeholder="Username"
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={setUsername}
      />
      <Input
        autoCorrect={false}
        value={email}
        label="Email"
        placeholder="Email"
        accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
        onChangeText={setEmail}
      />
      <Button style={styles.buttonStyle} appearance="filled" status="primary">
        Reset my password
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

export default ForgetPasswordForm;
