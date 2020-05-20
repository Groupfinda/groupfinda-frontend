import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageProps,
  AsyncStorage,
} from "react-native";
import {
  Layout,
  Icon,
  Input,
  Button,
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
  Spinner,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../../graphql/mutations";
import { ME } from "../../graphql/queries";
import { useError, useRefetch } from "../../hooks";

type Props = {};

type TokenType = {
  token: string;
};

type SignUpVariables = {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: Date;
};

type ReferencesType = {
  [key: string]: Input | null;
};

const SignUpForm: React.FC<Props> = () => {
  const references: ReferencesType = {};
  const genders = ["Male", "Female"];
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const refetchQuery = useRefetch([{ query: ME }]);

  const {
    Error,
    setGraphQLError,
    inputError,
    resetInputError,
    clearError,
  } = useError();

  const [createUser] = useMutation<{ createUser: TokenType }, SignUpVariables>(
    CREATE_USER,
    {
      onError: (err) => {
        setGraphQLError(err);
        setLoading(false);
      },
      onCompleted: async (data) => {
        await AsyncStorage.setItem("userToken", data.createUser.token);
        clearError();
      },
    }
  );
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const toggleHidePassword = (): void => {
    setHidePassword(!hidePassword);
  };

  const toggleHideConfirmPassowrd = (): void => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const renderPasswordIcon: RenderProp<Partial<ImageProps>> = (props) => (
    <TouchableWithoutFeedback onPress={toggleHidePassword}>
      <Icon {...props} name={hidePassword ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderConfirmPasswordIcon: RenderProp<Partial<ImageProps>> = (
    props
  ) => (
    <TouchableWithoutFeedback onPress={toggleHideConfirmPassowrd}>
      <Icon {...props} name={hideConfirmPassword ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const onSubmit = async (): Promise<void> => {
    const variables: SignUpVariables = {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      gender: genders[(gender as IndexPath).row],
      birthday,
    };
    setLoading(true);
    await createUser({ variables });
    await refetchQuery();
    setLoading(false);
  };

  return (
    <Layout style={styles.containerStyle}>
      <Error />
      <Input
        status={inputError.username ? "danger" : "basic"}
        onChange={() => resetInputError("username")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={username}
        label="Username"
        placeholder="Username"
        onChangeText={setUsername}
        onSubmitEditing={() => references.secondInput?.focus()}
        blurOnSubmit={false}
        textContentType="username"
      />
      <Input
        status={inputError.password ? "danger" : "basic"}
        onChange={() => resetInputError("password")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        label="Password"
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        accessoryRight={renderPasswordIcon}
        ref={(ref) => (references.secondInput = ref)}
        onSubmitEditing={() => references.thirdInput?.focus()}
        blurOnSubmit={false}
        textContentType="newPassword"
      />
      <Input
        status={inputError.confirmPassword ? "danger" : "basic"}
        onChange={() => resetInputError("confirmPassword")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={confirmPassword}
        label="Confirm Password"
        placeholder="Confirm password"
        onChangeText={setConfirmPassword}
        secureTextEntry={hideConfirmPassword}
        accessoryRight={renderConfirmPasswordIcon}
        ref={(ref) => (references.thirdInput = ref)}
        onSubmitEditing={() => references.fourthInput?.focus()}
        blurOnSubmit={false}
        textContentType="newPassword"
      />
      <Input
        status={inputError.firstName ? "danger" : "basic"}
        onChange={() => resetInputError("firstName")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={firstName}
        label="First name"
        placeholder="First name"
        onChangeText={setFirstName}
        ref={(ref) => (references.fourthInput = ref)}
        onSubmitEditing={() => references.fifthInput?.focus()}
        blurOnSubmit={false}
        textContentType="givenName"
      />
      <Input
        status={inputError.lastName ? "danger" : "basic"}
        onChange={() => resetInputError("lastName")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={lastName}
        label="Last name"
        placeholder="Last name"
        onChangeText={setLastName}
        ref={(ref) => (references.fifthInput = ref)}
        onSubmitEditing={() => references.sixthInput?.focus()}
        blurOnSubmit={false}
        textContentType="familyName"
      />
      <Input
        status={inputError.email ? "danger" : "basic"}
        onChange={() => resetInputError("email")}
        style={styles.inputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        label="Email"
        placeholder="Email"
        onChangeText={setEmail}
        textContentType="emailAddress"
        ref={(ref) => (references.sixthInput = ref)}
      />
      <Select
        style={styles.inputStyle}
        label="Gender"
        value={genders[(gender as IndexPath).row]}
        selectedIndex={gender}
        onSelect={setGender}
      >
        {genders.map((value: string) => (
          <SelectItem key={value} title={value} />
        ))}
      </Select>
      <Datepicker
        min={new Date(new Date().setFullYear(1920))}
        max={new Date()}
        style={styles.inputStyle}
        label="Birthday"
        date={birthday}
        onSelect={setBirthday}
      />
      <Button
        onPress={onSubmit}
        style={styles.buttonStyle}
        appearance="filled"
        status="primary"
      >
        Sign Up
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
  inputStyle: { marginVertical: 3 },
  buttonStyle: {
    marginTop: 40,
  },
  spinnerStyle: {
    marginTop: 10,
    alignSelf: "center",
  },
});

export default SignUpForm;
