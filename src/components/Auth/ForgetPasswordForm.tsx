import React, { useState } from "react";
import { Layout, Icon, Input, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { FORGET_PASSWORD } from "../../graphql/mutations";
import { useError } from "../../hooks/useError";

type Props = {};

type ForgetPasswordVariables = {
  username: string;
  email: string;
};

type ReferencesType = {
  [key: string]: Input | null;
};

const ForgetPasswordForm: React.FC<Props> = () => {
  const references: ReferencesType = {};

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const {
    Error,
    setGraphQLError,
    inputError,
    resetInputError,
    clearError,
  } = useError();

  const [forgetPassword] = useMutation<
    { forgetPassword: boolean },
    ForgetPasswordVariables
  >(FORGET_PASSWORD, {
    onError: (err) => setGraphQLError(err),
    onCompleted: (data) => {
      console.log(data.forgetPassword);
      clearError();
    },
  });

  const onSubmit = (): void => {
    const variables: ForgetPasswordVariables = {
      username,
      email,
    };

    forgetPassword({ variables });
  };

  return (
    <Layout style={styles.containerStyle}>
      <Error />
      <Input
        status={inputError.username ? "danger" : "basic"}
        onChange={() => resetInputError("username")}
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.usernameStyle}
        value={username}
        label="Username"
        placeholder="Username"
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={setUsername}
        onSubmitEditing={() => references.secondInput?.focus()}
        blurOnSubmit={false}
        textContentType="username"
      />
      <Input
        status={inputError.email ? "danger" : "basic"}
        onChange={() => resetInputError("email")}
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        label="Email"
        placeholder="Email"
        accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
        onChangeText={setEmail}
        onSubmitEditing={onSubmit}
        ref={(ref) => (references.secondInput = ref)}
        textContentType="emailAddress"
      />
      <Button
        onPress={onSubmit}
        style={styles.buttonStyle}
        appearance="filled"
        status="primary"
      >
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
