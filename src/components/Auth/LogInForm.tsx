import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageProps,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import {
  Layout,
  Icon,
  Input,
  Button,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../graphql/mutations";
import { ME } from "../../graphql/queries";

import { useError, useRefetch } from "../../hooks/";

type Props = {};

type LogInVariables = {
  username: string;
  password: string;
};

type ReferencesType = {
  [key: string]: Input | null;
};

type TokenType = {
  token: string;
};

const LogInForm: React.FC<Props> = () => {
  const references: ReferencesType = {};

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useNavigation();
  const {
    Error,
    setGraphQLError,
    inputError,
    resetInputError,
    clearError,
  } = useError();
  const refetchQuery = useRefetch([{ query: ME }]);
  const [loginUser] = useMutation<{ loginUser: TokenType }, LogInVariables>(
    LOGIN_USER,
    {
      onError: (err) => {
        setGraphQLError(err);
        setLoading(false);
      },
      onCompleted: async (data) => {
        await AsyncStorage.setItem("userToken", data.loginUser.token);
        clearError();
      },
    }
  );

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

  const onSubmit = async (): Promise<void> => {
    const variables: LogInVariables = {
      username,
      password,
    };
    setLoading(true);
    await loginUser({ variables });
    await refetchQuery();
    setLoading(false);
  };
  return (
    <Layout style={styles.containerStyle}>
      <Error />
      <Input
        status={inputError.username ? "danger" : "basic"}
        onChange={() => resetInputError("username")}
        onSubmitEditing={() => references.secondInput?.focus()}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.usernameStyle}
        value={username}
        label="Username"
        placeholder="Enter username"
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={setUsername}
      />
      <Input
        ref={(ref) => {
          references.secondInput = ref;
        }}
        status={inputError.password ? "danger" : "basic"}
        onChange={() => resetInputError("password")}
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        label="Password"
        placeholder="Enter password"
        accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        accessoryRight={renderIcon}
        caption={renderForgetPassword}
        onSubmitEditing={onSubmit}
      />
      <Button
        accessoryRight={(props) => <Icon name="log-in-outline" {...props} />}
        style={styles.buttonStyle}
        appearance="filled"
        status="primary"
        onPress={onSubmit}
      >
        Log in
      </Button>
      {loading && (
        <Layout style={styles.spinnerStyle}>
          <Spinner size="medium" />
        </Layout>
      )}
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
  spinnerStyle: {
    marginTop: 10,
    alignSelf: "center",
  },
});

export default LogInForm;
