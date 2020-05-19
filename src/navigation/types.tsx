import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  LogIn: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
};

export type SignUpScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "SignUp"
>;

export type LogInScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "LogIn"
>;

export type ForgetPasswordScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "ForgetPassword"
>;
