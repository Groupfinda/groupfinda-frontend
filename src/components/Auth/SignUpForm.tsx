import React, { useState } from "react";
import { TouchableWithoutFeedback, ImageProps } from "react-native";
import {
  Layout,
  Icon,
  Input,
  Button,
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { RenderProp } from "@ui-kitten/components/devsupport";

type Props = {};

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

const SignUpForm: React.FC<Props> = () => {
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

  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const genders = ["Male", "Female"];
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

  const onSubmit = (): void => {
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
    console.log(variables);
  };

  return (
    <Layout style={styles.containerStyle}>
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={username}
        label="Username"
        placeholder="Username"
        onChangeText={setUsername}
      />
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={password}
        label="Password"
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        accessoryRight={renderPasswordIcon}
      />
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={confirmPassword}
        label="Confirm Password"
        placeholder="Confirm password"
        onChangeText={setConfirmPassword}
        secureTextEntry={hideConfirmPassword}
        accessoryRight={renderConfirmPasswordIcon}
      />
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={firstName}
        label="First name"
        placeholder="First name"
        onChangeText={setFirstName}
      />
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={lastName}
        label="Last name"
        placeholder="Last name"
        onChangeText={setLastName}
      />
      <Input
        style={styles.inputStyle}
        autoCorrect={false}
        value={email}
        label="Email"
        placeholder="Email"
        onChangeText={setEmail}
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
});

export default SignUpForm;
